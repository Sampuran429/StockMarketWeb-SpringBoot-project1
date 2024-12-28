package com.stocktrading.stocktrade.Model;

import java.util.Date;



import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "recommended-stocks")
public class RecommendedStocks {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
   @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("buy")
    private int buy;
    @JsonProperty("hold")
    private int hold;
    @JsonProperty("period")
    private Date period;
    @JsonProperty("sell")
    private int sell;
    @JsonProperty("strongBuy")
    private int strong_buy;
    @JsonProperty("strongSell")
    private int strong_sell;
}
  
   