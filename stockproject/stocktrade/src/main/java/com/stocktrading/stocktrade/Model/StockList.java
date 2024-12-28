package com.stocktrading.stocktrade.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "stocklist")
public class StockList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;  
    @JsonProperty("currency")
    private String currency;
    @JsonProperty("description")
    private String description;
    @JsonProperty("displaySymbol")
    private String displaySymbol;
    @JsonProperty("figi")
    private String figi;
    @JsonProperty("mic")
    private String mic;
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("type")
    private String type;
}

