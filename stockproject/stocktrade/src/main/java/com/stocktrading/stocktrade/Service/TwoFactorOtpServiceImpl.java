package com.stocktrading.stocktrade.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.TwoFactorOtp;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.TwoFactorOtpRepo;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {

    @Autowired
    private TwoFactorOtpRepo twoFactorOtpRepo;

    @Override
    public TwoFactorOtp createTwoFactorOtp(User user, String otp, String jwt) {
       UUID  uuid = UUID.randomUUID();
       String id=uuid.toString();
       TwoFactorOtp twoFactorOtp = new TwoFactorOtp();
       twoFactorOtp.setId(id);
       twoFactorOtp.setUser(user);
       twoFactorOtp.setJwt(jwt);
       twoFactorOtp.setOtp(otp);
       return twoFactorOtpRepo.save(twoFactorOtp);
    }
    public TwoFactorOtp findbyUser(Long userId) {
      return twoFactorOtpRepo.findByUserId(userId);  // Find OTP by User ID
  }

    @Override
    public TwoFactorOtp findbyId(String id) {
       Optional<TwoFactorOtp> otp=twoFactorOtpRepo.findById(id);
       return otp.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp, String otp) {
       return twoFactorOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp) {
        twoFactorOtpRepo.delete(twoFactorOtp);
    }
    
}
