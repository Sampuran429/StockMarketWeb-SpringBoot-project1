package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.ForgotPasswordToken;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationType;

@Service
public interface ForgotPasswordTokenService {
    ForgotPasswordToken createToken(User user,String id,String otp,VerificationType verificationType,String sendTo);
    ForgotPasswordToken findById(String id);
    ForgotPasswordToken findByUserId(Long userId);
    void deleteToken(ForgotPasswordToken token);
}
