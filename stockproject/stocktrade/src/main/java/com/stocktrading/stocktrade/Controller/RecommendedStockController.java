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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.stocktrading.stocktrade.Model.RecommendedStocks;
import com.stocktrading.stocktrade.Service.RecommendedStocksService;

@RestController
@CrossOrigin("*")
@RequestMapping("/recommended")
public class RecommendedStockController {
    @Autowired
    private RecommendedStocksService recommendedStocksService;
     @GetMapping
    public ResponseEntity<List<RecommendedStocks>> getstockList(@RequestParam("symbol") String symbol)throws JsonMappingException,JsonProcessingException{
        List<RecommendedStocks> stock = recommendedStocksService.getrecommendedtrends(symbol);
        return new ResponseEntity<>(stock,HttpStatus.ACCEPTED);
    }
}
