package com.stocktrading.stocktrade.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.stocktrading.stocktrade.Service.CompanyService;


@RestController
@CrossOrigin("*")
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/details")
    public ResponseEntity<JsonNode> getcompanydetails(@RequestParam("symbol") String symbol) throws JsonMappingException,JsonProcessingException{
       String company = companyService.getcompanydetails(symbol);
       JsonNode jsonNode=objectMapper.readTree(company);
       return ResponseEntity.ok(jsonNode);
    }
}
