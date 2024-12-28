package com.stocktrading.stocktrade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Repo.StockRepo;
import com.stocktrading.stocktrade.Service.StockService;

@RestController
@CrossOrigin("*")
@RequestMapping("/stocks")
public class StockController {
    @Autowired
    private StockService stockService;
   

    @Autowired
    private ObjectMapper objectMapper;
    @GetMapping("/details")
    public ResponseEntity<Stock> getStockDetails(@RequestParam("symbol") String symbol 
                                                ) {
        Stock stock = stockService.getStockDetails(symbol);
        return new ResponseEntity<>(stock, HttpStatus.OK);
    }
    @GetMapping("/findstock/{stockId}")
    public ResponseEntity<Stock> getStockById ( @PathVariable("stockId") String stockId) {
        Stock stock=stockService.findById(stockId);
        return new ResponseEntity<>(stock,HttpStatus.OK);
    }
}
