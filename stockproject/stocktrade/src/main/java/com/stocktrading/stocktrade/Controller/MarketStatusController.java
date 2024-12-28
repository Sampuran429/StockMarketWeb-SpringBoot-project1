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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Service.MarketStatusService;

@RestController
@CrossOrigin("*")
@RequestMapping("/marketstatus")
public class MarketStatusController {
    @Autowired
    private MarketStatusService marketStatusService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<JsonNode>  getMarketStatus() throws JsonMappingException,JsonProcessingException {
        String marketstatus=marketStatusService.getmarket_status();
        JsonNode jsonNode=objectMapper.readTree(marketstatus);
        return  ResponseEntity.ok(jsonNode);
    }
   
}
