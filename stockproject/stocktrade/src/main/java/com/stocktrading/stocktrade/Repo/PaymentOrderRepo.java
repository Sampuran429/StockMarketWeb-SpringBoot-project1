package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.PaymentOrder;

public interface PaymentOrderRepo  extends JpaRepository<PaymentOrder,Long>{
}
