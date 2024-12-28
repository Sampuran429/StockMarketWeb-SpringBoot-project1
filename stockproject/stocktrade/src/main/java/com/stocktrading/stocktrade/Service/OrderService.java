package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.OrderItem;
import com.stocktrading.stocktrade.Model.OrderType;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;

@Service
public interface OrderService {
    Order  createOrder(User user,OrderItem orderItem,OrderType orderType);
    
    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUsers(Long userId,OrderType orderType,String assetSymbol);

    Order processOrder(Stock stock,double quantity,OrderType orderType,User user) throws Exception;

}
