package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.StockList;

public interface StockListRepo  extends JpaRepository<StockList,Long>{
    
}
