package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.MarketStatus;

public interface MarketStatusRepo  extends JpaRepository<MarketStatus,Long>{
}
