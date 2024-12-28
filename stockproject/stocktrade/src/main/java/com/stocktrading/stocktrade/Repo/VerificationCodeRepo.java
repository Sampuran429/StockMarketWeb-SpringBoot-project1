package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.VerificationCode;

public interface VerificationCodeRepo  extends JpaRepository<VerificationCode,Long>{
    VerificationCode findByUserId(Long userId);
}
