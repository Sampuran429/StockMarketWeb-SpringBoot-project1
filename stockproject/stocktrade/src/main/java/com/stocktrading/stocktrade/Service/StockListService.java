package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.StockList;
@Service
public interface StockListService {
    List<StockList> getallstocklists();
}
