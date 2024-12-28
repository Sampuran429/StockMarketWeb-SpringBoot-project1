package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Watchlist;

public interface WatchlistRepo  extends JpaRepository<Watchlist,Long>{
    Watchlist findByUserId(Long userId);
}
