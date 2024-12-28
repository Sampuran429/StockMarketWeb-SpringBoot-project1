package com.stocktrading.stocktrade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.OrderType;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Request.CreateOrderRequest;
import com.stocktrading.stocktrade.Service.OrderService;
import com.stocktrading.stocktrade.Service.StockService;
import com.stocktrading.stocktrade.Service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private StockService stockService;

     @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt,@RequestBody CreateOrderRequest req) throws Exception{
        User user=userService.findUserByJwt(jwt);
        
        Stock stock=stockService.findById(req.getStockId());

        Order order=orderService.processOrder(stock,req.getQuantity() , req.getOrderType(),user);
        return ResponseEntity.ok(order);
    }
     @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwtToken,@PathVariable Long orderId) throws Exception{
        User user=userService.findUserByJwt(jwtToken);

        Order order=orderService.getOrderById(orderId);
        if(order.getUser().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }else{
            throw new Exception("Invalid User");
        }
    }

     @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(@RequestHeader("Authorization") String jwt,@RequestParam(required = false) OrderType order_type,@RequestParam(required = false) String asset_symbol) throws Exception{
        Long userId=userService.findUserByJwt(jwt).getId();
        List<Order> userOrders=orderService.getAllOrdersOfUsers(userId, order_type, asset_symbol);
        return ResponseEntity.ok(userOrders);
    }



}
