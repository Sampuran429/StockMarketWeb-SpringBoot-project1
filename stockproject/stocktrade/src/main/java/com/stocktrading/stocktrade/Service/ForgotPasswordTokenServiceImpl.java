package com.stocktrading.stocktrade.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.ForgotPasswordToken;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationType;
import com.stocktrading.stocktrade.Repo.ForgotPasswordTokenRepo;

@Service
public class ForgotPasswordTokenServiceImpl implements ForgotPasswordTokenService {

    @Autowired
    private ForgotPasswordTokenRepo forgotPasswordTokenRepo;
    @Override
    public ForgotPasswordToken createToken(User user, String id,String otp, VerificationType verificationType, String sendTo) {
        ForgotPasswordToken forgotPasswordToken =new ForgotPasswordToken();
        forgotPasswordToken.setUser(user);
        forgotPasswordToken.setSendTo(sendTo);
        forgotPasswordToken.setVerificationType(verificationType);
        forgotPasswordToken.setOtp(otp);
        forgotPasswordToken.setId(id);
        return forgotPasswordTokenRepo.save(forgotPasswordToken);
    }

    @Override
    public ForgotPasswordToken findById(String id) {
       Optional<ForgotPasswordToken> token=forgotPasswordTokenRepo.findById(id);
       return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUserId(Long userId) {
        return forgotPasswordTokenRepo.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordTokenRepo.delete(token);
    }
    
}
