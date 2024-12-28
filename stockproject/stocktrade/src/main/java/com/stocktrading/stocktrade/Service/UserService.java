package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationType;

@Service
public interface UserService {
    User findUserByJwt(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    User findUserById(Long id) throws Exception;
    User updatepassword(User user,String password);
    User enableTwoFactorAuth(VerificationType verificationType,String sendTo,User user); 
}
