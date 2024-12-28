package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.RecommendedStocks;

@Service
public interface RecommendedStocksService {
    List<RecommendedStocks> getrecommendedtrends(String symbol);
}
