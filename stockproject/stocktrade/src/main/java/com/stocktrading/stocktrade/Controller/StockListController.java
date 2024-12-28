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

import com.stocktrading.stocktrade.Model.StockList;
import com.stocktrading.stocktrade.Service.StockListService;

@RestController
@CrossOrigin("*")
@RequestMapping("/stocklist")
public class StockListController {
    @Autowired
    private StockListService stockListService;
    @GetMapping()
    public ResponseEntity<List<StockList>> getstocklist() throws JsonMappingException,JsonProcessingException{
        List<StockList> stocklist1=stockListService.getallstocklists();
        return new ResponseEntity<>(stocklist1,HttpStatus.ACCEPTED);
    }
}
