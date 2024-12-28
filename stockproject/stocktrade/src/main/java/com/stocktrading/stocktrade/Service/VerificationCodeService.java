package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationCode;
import com.stocktrading.stocktrade.Model.VerificationType;

@Service
public interface VerificationCodeService {
    VerificationCode  sendVerificationCode(User user,VerificationType verificationType);
    VerificationCode getVerificationCodeById(Long id) throws Exception;
    VerificationCode getVerificationCodeByUser(Long userid);
    void deleteVerificationCode(VerificationCode verificationCode);
}
