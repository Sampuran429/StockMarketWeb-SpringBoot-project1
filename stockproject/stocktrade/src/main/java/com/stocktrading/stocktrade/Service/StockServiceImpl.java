package com.stocktrading.stocktrade.Service;



import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Repo.StockRepo;


@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepo stockRepo;
    private Apikeyconst apikeyconst=new Apikeyconst();
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public Stock getStockDetails(String symbol) {
        Stock stock;
    
        // Check if stockId is provided and if the stock with this id exists
        if (symbol!= null) {
            Optional<Stock> existingStock = stockRepo.findById(symbol);
            
            if (existingStock.isPresent()) {
                // Stock with the provided ID exists, update the existing record
                stock = existingStock.get();
            } else {
                // Stock with provided ID does not exist, create new
                stock = new Stock();
            }
        } else {
            // If stockId is not provided, create a new stock object
            stock = new Stock();
        }
    
        // Set the symbol on the stock object
        stock.setSymbol(symbol);  // Add the symbol to the Stock object
        
        // API URL for stock details
        String url = apikeyconst.BASE_URL + "quote?symbol=" + symbol + "&token=" + apikeyconst.API_KEY;
        RestTemplate restTemplate = new RestTemplate();
    
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    
            // Parse the JSON response and populate the Stock object
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            stock.setCurrent_price(jsonNode.get("c").asDouble());
            stock.setPrice_change(jsonNode.get("d").asDouble());
            stock.setPercent_change(jsonNode.get("dp").asDouble());
            stock.setHigh_price(jsonNode.get("h").asDouble());
            stock.setLow_price(jsonNode.get("l").asDouble());
            stock.setOpen_price(jsonNode.get("o").asDouble());
            stock.setPrevious_close(jsonNode.get("pc").asDouble());
            stock.setTimestamp(jsonNode.get("t").asLong());
    
            // Save or update the stock in the database
            Stock savedStock = stockRepo.save(stock);
            
            // Return the saved (or updated) Stock object
            return savedStock;
    
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    
        return null;
    }
    
    
    
    @Override
    public Stock findById(String symbol) {
        Optional<Stock> optionalstock=stockRepo.findById(symbol);
        if(optionalstock.isEmpty())
            try {
                throw new Exception("Stock not found\n");
            } catch (Exception e) {
                e.printStackTrace();
            }{
                return optionalstock.get();
            }
        
    }
}