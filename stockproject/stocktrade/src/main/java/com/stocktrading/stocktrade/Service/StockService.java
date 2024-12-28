package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.Stock;

@Service
public interface StockService {
    Stock  getStockDetails(String symbol);
    // List<Stock> getrecommendedtrends(String symbol);
    Stock findById(String symbol);
}
