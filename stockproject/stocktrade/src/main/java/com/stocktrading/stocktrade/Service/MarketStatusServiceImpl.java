package com.stocktrading.stocktrade.Service;

import java.util.ArrayList;
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
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.MarketStatus;
import com.stocktrading.stocktrade.Model.Stock;
import com.stocktrading.stocktrade.Repo.MarketStatusRepo;

@Service
public class MarketStatusServiceImpl implements MarketStatusService {

    private Apikeyconst apikeyconst = new Apikeyconst();

    @Autowired
    private MarketStatusRepo marketStatusRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public String getmarket_status() {
       
        String url = apikeyconst.BASE_URL + "stock/market-status?exchange=US&token=" + apikeyconst.API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        

        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            // Send request
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Parse the response
            try {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());

                // Create and populate MarketStatus object
                MarketStatus marketStatus = new MarketStatus();
                marketStatus.setExchange(jsonNode.has("exchange") ? jsonNode.get("exchange").asText() : null);
                marketStatus.setHoliday(jsonNode.has("holiday") ? jsonNode.get("holiday").asText() : null);
                marketStatus.setOpen(jsonNode.has("isOpen") ? jsonNode.get("isOpen").asBoolean() : false);
                marketStatus.setSession(jsonNode.has("session") ? jsonNode.get("session").asText() : null);
                marketStatus.setTimezone(jsonNode.has("timezone") ? jsonNode.get("timezone").asText() : null);
                marketStatus.setTimestamp(jsonNode.has("t") ? jsonNode.get("t").asLong() : 0L);

                // Save market status to the repository
                marketStatusRepo.save(marketStatus);

            } catch (JsonMappingException e) {
                e.printStackTrace();
                throw new RuntimeException("Error mapping JSON response.");
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                throw new RuntimeException("Error processing JSON response.");
            }

            // Return the raw response or format it as needed
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println("Error: " + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

   
}
