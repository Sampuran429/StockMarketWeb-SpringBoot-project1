package com.stocktrading.stocktrade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.Asset;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Service.AssetService;
import com.stocktrading.stocktrade.Service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/asset")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception{
        Asset asset = assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping("/stock/{stockId}/user")
    public ResponseEntity<Asset> getAssetByUserIdandStockId(@PathVariable String symbol,@RequestHeader("Authorization") String jwt) throws Exception{
        User user= userService.findUserByJwt(jwt);
        Asset asset = assetService.findAssetByUserIdandStockSymbol(user.getId(),symbol);
        return ResponseEntity.ok().body(asset);
    }
    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetForUser(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        List<Asset> assets=assetService.getUserAssets(user.getId());
        return ResponseEntity.ok().body(assets);
    }

}
