package com.stocktrading.stocktrade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.stocktrading.stocktrade.Model.MarketNews;
import com.stocktrading.stocktrade.Service.MarketNewsService;

@RestController
@CrossOrigin("*")
@RequestMapping("/marketnews")
public class MarketNewsController {
    @Autowired
    private MarketNewsService marketNewsService;
    @GetMapping()
    public ResponseEntity<List<MarketNews>> getnews(){
        List<MarketNews> newslist=marketNewsService.getAllMarketNews();
        return new ResponseEntity<>(newslist,HttpStatus.ACCEPTED);
    }
}
