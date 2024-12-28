package com.stocktrading.stocktrade.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "marketnews")
public class MarketNews {
    @JsonProperty("category")
    private String category;
    @JsonProperty("datetime")
    private Long datetime;
    @JsonProperty("headline")
    private String headline;
    @Id
    @JsonProperty("id")
    private Long id;
    @JsonProperty("image")
    private String image;
    @JsonProperty("related")
    private String related;
    @JsonProperty("source")
    private String source;
    @JsonProperty("summary")
    private String summary;
    @JsonProperty("url")
    private String url;
}
