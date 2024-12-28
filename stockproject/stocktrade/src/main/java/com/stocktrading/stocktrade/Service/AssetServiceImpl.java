package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Asset;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.AssetRepo;

@Service
public class AssetServiceImpl  implements AssetService{
    @Autowired
    private AssetRepo assetRepo;

    @Override
    public Asset createAsset(User user, Stock stock, double quantity) {
       Asset asset = new Asset();
       asset.setUser(user);
       asset.setStock(stock);
       asset.setQuantity(quantity);
       asset.setBuyprice(quantity);
       return assetRepo.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetID) throws Exception {
       return assetRepo.findById(assetID).orElseThrow(()-> new Exception("Asset Not found"));
    }

    @Override
    public Asset getAssetByUserIdandId(Long userId, Long assetId) {
       return null;
    }

    @Override
    public List<Asset> getUserAssets(Long userId) {
        return assetRepo.findByUserId(userId);
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) throws Exception {
       Asset oldAsset=getAssetById(assetId);
       oldAsset.setQuantity(quantity+oldAsset.getQuantity());
       return assetRepo.save(oldAsset);
    }

    @Override
    public Asset findAssetByUserIdandStockSymbol(Long userId, String  symbol) {
       return assetRepo.findByUserIdAndStockSymbol(userId, symbol);

    }

    @Override
    public void deleteAsset(Long assetId) {
       assetRepo.deleteById(assetId);
    }
    
}
