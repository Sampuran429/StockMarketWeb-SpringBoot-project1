package com.stocktrading.stocktrade.Model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "stock")
@Data
public class Stock {
   

   // private Long id;

   @Id
   @JsonProperty("symbol")
   private String symbol;  // Add symbol field to hold the stock symbol

   @JsonProperty("c")
   private double current_price;

   @JsonProperty("d")
   private double price_change;

   @JsonProperty("dp")
   private double percent_change;

   @JsonProperty("h")
   private double high_price;

   @JsonProperty("l")
   private double low_price;

   @JsonProperty("o")
   private double open_price;

   @JsonProperty("pc")
   private double previous_close;

   @JsonProperty("t")
   private long timestamp;


   @Override
   public boolean equals(Object o) {
       if (this == o) return true;
       if (o == null || getClass() != o.getClass()) return false;
       Stock stock = (Stock) o;
       return Objects.equals(symbol, stock.symbol);  // Compare by symbol
   }

   @Override
   public int hashCode() {
       return Objects.hash(symbol);
   }
}
