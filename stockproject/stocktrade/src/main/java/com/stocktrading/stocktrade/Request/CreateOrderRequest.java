package com.stocktrading.stocktrade.Request;

import com.stocktrading.stocktrade.Model.OrderType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class CreateOrderRequest {
    @Id
    private String stockId;
    private double quantity;
    private OrderType orderType;

}
