package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.RecommendedStocks;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Repo.RecommendedStocksRepo;

@Service
public class RecommendedStockServiceImpl  implements RecommendedStocksService{
    

    @Autowired
    private RecommendedStocksRepo recommendedStocksRepo;
    private Apikeyconst apikeyconst=new Apikeyconst();
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public List<RecommendedStocks> getrecommendedtrends(String symbol) {
         
        String url=apikeyconst.BASE_URL+"stock/recommendation?symbol="+symbol+"&token="+apikeyconst.API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            // Log the response for debugging
            String responseBody = response.getBody();
            System.out.println("Response Body: " + responseBody);
            
            List<RecommendedStocks> stocklist = objectMapper.readValue(responseBody, new TypeReference<List<RecommendedStocks>>() {});
            return stocklist;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
            throw new RuntimeException("API Error: " + e.getMessage());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException("JSON Processing Error: " + e.getMessage());
        }
    } 
}
    

