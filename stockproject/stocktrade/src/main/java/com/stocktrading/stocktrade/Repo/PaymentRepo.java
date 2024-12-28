package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.PaymentDetails;

public interface PaymentRepo  extends JpaRepository<PaymentDetails,Long>{
    PaymentDetails findByUserId(Long userId);
}
