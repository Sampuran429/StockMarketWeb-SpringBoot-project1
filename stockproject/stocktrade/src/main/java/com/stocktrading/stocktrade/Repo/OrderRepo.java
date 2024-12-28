package com.stocktrading.stocktrade.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Order;

public interface OrderRepo  extends JpaRepository<Order,Long>{
    List<Order> findByUserId(Long userId);
}
