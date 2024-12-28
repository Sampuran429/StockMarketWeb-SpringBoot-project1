package com.stocktrading.stocktrade.Model;



import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Ipo")


public class Ipo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonProperty("date")
    private String  date;
    @JsonProperty("exchange")
    private String exchange;
    @JsonProperty("name")
    private String name;
    @JsonProperty("numberOfShares")
    private Long numberOfShares;
    @JsonProperty("price")
    private String price;
    @JsonProperty("status")
    private String status;
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("totalSharesValue")
    private Long totalSharesValue;

}
