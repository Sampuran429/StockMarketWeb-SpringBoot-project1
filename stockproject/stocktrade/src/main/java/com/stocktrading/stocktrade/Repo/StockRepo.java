package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Stock;
import java.util.List;
import java.util.Optional;


public interface StockRepo extends JpaRepository<Stock,String> {
    Optional<Stock> findById(String symbol);
}
