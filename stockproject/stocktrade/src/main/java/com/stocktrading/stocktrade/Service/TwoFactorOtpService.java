package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.TwoFactorOtp;
import com.stocktrading.stocktrade.Model.User;

@Service
public interface TwoFactorOtpService {
    TwoFactorOtp createTwoFactorOtp(User user, String otp,String jwt);
    TwoFactorOtp findbyUser(Long userId);
    TwoFactorOtp findbyId(String id);
    boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp,String otp);
    void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp);
}
