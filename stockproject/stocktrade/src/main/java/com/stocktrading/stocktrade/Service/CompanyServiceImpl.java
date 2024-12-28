package com.stocktrading.stocktrade.Service;
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
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocktrading.stocktrade.Config.Apikeyconst;
import com.stocktrading.stocktrade.Model.Company;

import com.stocktrading.stocktrade.Repo.CompanyRepo;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepo companyRepo;
     private Apikeyconst apikeyconst=new Apikeyconst();
    private final ObjectMapper objectMapper=new ObjectMapper();
    @Override
public String getcompanydetails(String symbol) {
    String url = apikeyconst.BASE_URL + "stock/profile2?symbol=" + symbol + "&token=" + apikeyconst.API_KEY;
    System.out.println(url);

    RestTemplate restTemplate = new RestTemplate();
    try {
        // Set up headers if needed, but in this case, they're not necessary for Finnhub API
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        // Make the API request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        try {
            // Parse the response body
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            // Map the API response to the Company object
            Company company = new Company();
            company.setCountry(jsonNode.has("country") ? jsonNode.get("country").asText() : null);
            company.setCurrency(jsonNode.has("currency") ? jsonNode.get("currency").asText() : null);
            company.setEstimateCurrency(jsonNode.has("estimateCurrency") ? jsonNode.get("estimateCurrency").asText() : null);
            company.setExchange(jsonNode.has("exchange") ? jsonNode.get("exchange").asText() : null);
            company.setFinnhubIndustry(jsonNode.has("finnhubIndustry") ? jsonNode.get("finnhubIndustry").asText() : null);
            company.setIpo(jsonNode.has("ipo") ? jsonNode.get("ipo").asText() : null);
            company.setLogo(jsonNode.has("logo") ? jsonNode.get("logo").asText() : null);
            company.setMarketCapitalization(jsonNode.has("marketCapitalization") ? jsonNode.get("marketCapitalization").asDouble() : 0.0);
            company.setName(jsonNode.has("name") ? jsonNode.get("name").asText() : null);
            company.setPhone(jsonNode.has("phone") ? jsonNode.get("phone").asText() : null);
            company.setShareOutstanding(jsonNode.has("shareOutstanding") ? jsonNode.get("shareOutstanding").asDouble() : 0.0);
            company.setTicker(jsonNode.has("ticker") ? jsonNode.get("ticker").asText() : null);
            company.setWeburl(jsonNode.has("weburl") ? jsonNode.get("weburl").asText() : null);

            // Optionally, log the Company data
            System.out.println("Company Information: " + company.toString());

            // You can return a formatted response if needed, or the raw response body
            companyRepo.save(company);
            return response.getBody();

        } catch (JsonMappingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error mapping JSON response to Company object.");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error processing JSON response.");
        }

    } catch (HttpClientErrorException | HttpServerErrorException e) {
        System.out.println("Error----" + e.getMessage());
        throw new RuntimeException(e.getMessage());
    }
}

    
}
