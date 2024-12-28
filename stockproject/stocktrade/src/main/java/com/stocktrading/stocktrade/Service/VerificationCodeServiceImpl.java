package com.stocktrading.stocktrade.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationCode;
import com.stocktrading.stocktrade.Model.VerificationType;
import com.stocktrading.stocktrade.Repo.VerificationCodeRepo;
import com.stocktrading.stocktrade.Utils.OtpUtils;


@Service
public class VerificationCodeServiceImpl  implements VerificationCodeService{

    @Autowired
    private VerificationCodeRepo verificationCodeRepo;
    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode verificationCode1=new VerificationCode();
        verificationCode1.setOtp(OtpUtils.generateOtp());
        verificationCode1.setVerificationType(verificationType);
        verificationCode1.setUser(user);
        return verificationCodeRepo.save(verificationCode1); 
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
       Optional<VerificationCode> verificationcode=verificationCodeRepo.findById(id);
       if(verificationcode.isPresent()){
        return verificationcode.get();
       }
       throw new Exception("verification code not found\n");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userid) {
        return verificationCodeRepo.findByUserId(userid);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
        verificationCodeRepo.delete(verificationCode);
    }
}
