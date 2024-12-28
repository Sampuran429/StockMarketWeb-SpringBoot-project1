package com.stocktrading.stocktrade.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Watchlist;
import com.stocktrading.stocktrade.Repo.WatchlistRepo;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private WatchlistRepo watchlistRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private StockService stockService;

    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        Watchlist watchlist = watchlistRepo.findByUserId(userId);
        if (watchlist == null) {
            throw new Exception("Watchlist not found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchList(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        return watchlistRepo.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) throws Exception {
        Optional<Watchlist> watchlistOptional = watchlistRepo.findById(id);
        if (watchlistOptional.isEmpty()) {
            throw new Exception("watchlist not found\n");
        }
        return watchlistOptional.get();
    }

    @Override
    public Stock addItemToWatchList(Stock stock, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());
        if (watchlist.getStocks().contains(stock)) {
            watchlist.getStocks().remove(stock);  // Remove if already exists
        } else {
            watchlist.getStocks().add(stock);  // Add if it doesn't exist
        }
        watchlistRepo.save(watchlist);  // Save changes after modification
        return stock;
    }

    @Override
    public void deleteItemfromWatchlist(String symbol, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId());
        Stock stock = stockService.findById(symbol);
        if (watchlist.getStocks().contains(stock)) {
            watchlist.getStocks().remove(stock);
            watchlistRepo.save(watchlist);  // Save changes after removing
        } else {
            throw new Exception("Stock not found");
        }
    }
}
