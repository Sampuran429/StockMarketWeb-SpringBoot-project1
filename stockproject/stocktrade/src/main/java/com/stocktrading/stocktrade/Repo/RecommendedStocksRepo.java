package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.RecommendedStocks;

public interface RecommendedStocksRepo extends JpaRepository<RecommendedStocks,Long> {
}
