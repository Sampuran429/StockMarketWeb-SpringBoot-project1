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
@Table(name = "marketstatus")

public class MarketStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonProperty("exchange")
    private String exchange;
    @JsonProperty("holiday")
    private String holiday;
    @JsonProperty("isOpen")
    private boolean isOpen;
    @JsonProperty("session")
    private String session;
    @JsonProperty("t")
    private Long timestamp;
    @JsonProperty("timezone")
    private String timezone;
}

