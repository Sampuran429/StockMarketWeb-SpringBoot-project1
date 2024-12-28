package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.MarketNews;

@Service
public interface MarketNewsService {
    List<MarketNews> getAllMarketNews();
}
