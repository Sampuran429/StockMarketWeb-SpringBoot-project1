package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Company;

@Service
public interface CompanyService {
    String  getcompanydetails(String symbol);
} 
