package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.MarketNews;

public interface MarketNewsRepo extends JpaRepository<MarketNews,Long> {
}
