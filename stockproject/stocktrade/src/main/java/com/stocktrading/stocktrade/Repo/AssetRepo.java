package com.stocktrading.stocktrade.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Asset;

public interface AssetRepo  extends JpaRepository<Asset,Long>{
    List<Asset> findByUserId(Long userId);
    Asset findByUserIdAndStockSymbol(Long userId,String symbol);
}
