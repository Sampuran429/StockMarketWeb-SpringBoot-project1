package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem,Long>{
    
}
