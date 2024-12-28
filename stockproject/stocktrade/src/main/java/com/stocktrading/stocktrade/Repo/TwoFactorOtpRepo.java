package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.TwoFactorOtp;



public interface TwoFactorOtpRepo extends JpaRepository<TwoFactorOtp,String> {
    TwoFactorOtp findByUserId(Long userId);
}
