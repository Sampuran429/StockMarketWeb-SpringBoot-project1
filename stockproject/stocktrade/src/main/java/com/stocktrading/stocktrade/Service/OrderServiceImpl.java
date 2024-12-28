package com.stocktrading.stocktrade.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stocktrading.stocktrade.Model.Asset;
import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.OrderItem;
import com.stocktrading.stocktrade.Model.OrderStatus;
import com.stocktrading.stocktrade.Model.OrderType;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.OrderItemRepo;
import com.stocktrading.stocktrade.Repo.OrderRepo;

@Service
public class OrderServiceImpl  implements OrderService{

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private AssetService assetService;

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        System.out.println("-----------s1------------");
        double price=orderItem.getStock().getCurrent_price()*orderItem.getQuantity();
        System.out.println("----------"+(orderItem.getStock().getCurrent_price())+"----------");
        System.out.println("-----------s2------------");
        Order  order=new Order();
        System.out.println("-----------s3------------");
        order.setUser(user);
        System.out.println("-----------s4------------");
        order.setOrderitem(orderItem);
        System.out.println("-----------s5------------");
        order.setOrdertype(orderType);
        System.out.println("-----------s6------------");
        order.setPrice(BigDecimal.valueOf(price));
        System.out.println("-----------s7------------");
        order.setTimestamp(LocalDateTime.now());
        System.out.println("-----------s8------------");
        order.setOrderStatus(OrderStatus.Pending);
        System.out.println("-----------s9------------");
        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {
        return orderRepo.findById(orderId).orElseThrow(()->new Exception("Order not found\n"));
    }

    @Override
    public List<Order> getAllOrdersOfUsers(Long userId, OrderType orderType, String assetSymbol) {
        return orderRepo.findByUserId(userId);
    }

    private OrderItem createOrderItem(Stock stock,double quantity,double buyprice,double sellprice){
        OrderItem orderItem=new OrderItem();
        orderItem.setStock(stock);
        orderItem.setQuantity(quantity);
        orderItem.setBuyprice(buyprice);
        orderItem.setSellprice(sellprice);
        return orderItemRepo.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Stock stock,double quantity,User user) throws Exception{
        System.out.println("-----------sb1------------");
        if(quantity<0){
            System.out.println("-----------sb2------------");
            throw new Exception("Quantity cannot be negative");
        }
        System.out.println("-----------sb3------------");
        double buyprice=stock.getCurrent_price();
        System.out.println(buyprice);
        System.out.println("-----------sb4------------");
        OrderItem orderItem=createOrderItem(stock,quantity,buyprice,0);
        System.out.println("-----------sb5------------");
        Order order=createOrder(user,orderItem,OrderType.Buy);
        System.out.println(order.getOrderitem().getStock().getSymbol());
        System.out.println("-----------sb6------------");
        orderItem.setOrder(order);
        System.out.println("-----------sb7------------");

        walletService.payOrderPayment(order, user);
        System.out.println("-----------sb8------------");
        order.setOrderStatus(OrderStatus.Success);
        System.out.println("-----------sb9------------");
        order.setOrdertype(OrderType.Buy);
        System.out.println("-----------sb10------------");
        Order savedorder=orderRepo.save(order);
        System.out.println("-----------sb11------------");
          Asset oldasset=assetService.findAssetByUserIdandStockSymbol(order.getUser().getId(),order.getOrderitem().getStock().getSymbol());
          System.out.println("--------------"+order.getUser().getId()+"---------"+order.getOrderitem().getStock().getSymbol());
          System.out.println("-----------sb12------------");
          System.out.println(order.getOrderitem().getStock().getSymbol());
          if(oldasset==null){
            System.out.println("-----------sb13------------");
            assetService.createAsset(user, orderItem.getStock(),orderItem.getQuantity());
          }else{
            System.out.println("-----------sb14------------");
            assetService.updateAsset(oldasset.getId(),quantity);
          }
          System.out.println("-----------sb15------------");
          return savedorder;

    }

    @Transactional
    public Order sellAsset(Stock stock,double quantity,User user) throws Exception{
        if(quantity<0){
            throw new Exception("Quantity cannot be negative");
        }
        double sellprice=stock.getCurrent_price();
        Asset assetTosell=assetService.findAssetByUserIdandStockSymbol(user.getId(), stock.getSymbol());
        double buyprice=assetTosell.getBuyprice();
        
        if(assetTosell!=null){
        OrderItem orderItem=createOrderItem(stock,quantity,0,sellprice);
       
         orderItem=createOrderItem(stock,quantity,buyprice,sellprice);
        Order order=createOrder(user,orderItem,OrderType.Sell);
        orderItem.setOrder(order);

        if(assetTosell.getQuantity()>=quantity){
            order.setOrderStatus(OrderStatus.Success);
            order.setOrdertype(OrderType.Sell);
            Order savedorder=orderRepo.save(order);

            walletService.payOrderPayment(order, user);

            Asset updatedAsset=assetService.updateAsset(assetTosell.getId(), -quantity);

            if(updatedAsset.getQuantity()*stock.getCurrent_price()<=1){
                assetService.deleteAsset(updatedAsset.getId());
            }
            return savedorder;
        }
        throw new Exception("Insufficient Quantity to Sell");
        }
        throw new Exception("Asset Not Found\n");
    }


    @Override
    @Transactional
    public Order processOrder(Stock stock, double quantity, OrderType orderType, User user) throws Exception {
       if(orderType.equals(OrderType.Buy)){
        return buyAsset(stock, quantity, user);
       }else if(orderType.equals(OrderType.Sell)){
        return sellAsset(stock, quantity, user);
       }else{
        throw new Exception("Invalid Order Type");
       }
    }
    
}
