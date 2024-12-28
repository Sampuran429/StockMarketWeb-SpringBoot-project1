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
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Model.StockList;
import com.stocktrading.stocktrade.Repo.StockListRepo;


@Service
public class StockListServiceImpl implements StockListService {
    @Autowired
    private StockListRepo stockListRepo;
    private Apikeyconst apikeyconst = new Apikeyconst();
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<StockList> getallstocklists() {
        String url = apikeyconst.BASE_URL + "stock/symbol?exchange=US&token=" + apikeyconst.API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Log the response for debugging
            String responseBody = response.getBody();
            System.out.println("Response Body: " + responseBody);

            // Deserialize the response to a list of StockList objects
            List<StockList> stockList1 = objectMapper.readValue(responseBody, new TypeReference<List<StockList>>() {});

            // Limit the result to 100 stocks only
            List<StockList> limitedStockList = stockList1.stream()
                    .limit(75)
                    .toList();

            return limitedStockList;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
            throw new RuntimeException("API Error: " + e.getMessage());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException("JSON Processing Error: " + e.getMessage());
        }
    }
}

