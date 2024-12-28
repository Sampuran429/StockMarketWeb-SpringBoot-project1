package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.ForgotPasswordToken;

public interface ForgotPasswordTokenRepo  extends JpaRepository<ForgotPasswordToken,String>{
    ForgotPasswordToken findByUserId(Long userId);
}
