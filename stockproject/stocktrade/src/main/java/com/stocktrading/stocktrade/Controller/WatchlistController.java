package com.stocktrading.stocktrade.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Watchlist;
import com.stocktrading.stocktrade.Service.StockService;
import com.stocktrading.stocktrade.Service.UserService;
import com.stocktrading.stocktrade.Service.WatchlistService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;
    @Autowired
    private UserService userService;
    @Autowired
    private StockService stockService;

    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
        return ResponseEntity.ok(watchlist);
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long watchlistId) throws Exception {
        Watchlist watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);
    }

    @PatchMapping("/add/stock/{stockId}")
    public ResponseEntity<Stock> addItemToWatchList(@RequestHeader("Authorization") String jwt, @PathVariable String stockId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Stock stock = stockService.findById(stockId);
        Stock addedStock = watchlistService.addItemToWatchList(stock, user);
        return ResponseEntity.ok(addedStock);
    }

    @PatchMapping("/remove/stock/{stockId}")
    public ResponseEntity<String> deleteItemFromWatchlist(@RequestHeader("Authorization") String jwt, @PathVariable String stockId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        watchlistService.deleteItemfromWatchlist(stockId, user);
        return ResponseEntity.ok("Stock deleted from watchlist");
    }
}
