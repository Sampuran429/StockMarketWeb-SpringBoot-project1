package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Asset;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;

@Service
public interface AssetService  {
    Asset createAsset(User user,Stock stock,double quantity);
    Asset getAssetById(Long assetID) throws Exception;
    Asset getAssetByUserIdandId(Long userId,Long assetId);
    List<Asset> getUserAssets(Long userId);
    Asset updateAsset(Long assetId,double quantity) throws Exception;
    Asset findAssetByUserIdandStockSymbol(Long userId,String symbol);
    void deleteAsset(Long assetId);
}
