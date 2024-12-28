package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Watchlist;

@Service
public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchList(User user);
    Watchlist findById(Long id) throws Exception;
    Stock addItemToWatchList(Stock stock,User user) throws Exception;
    void deleteItemfromWatchlist(String symbol,User user) throws Exception;
}
