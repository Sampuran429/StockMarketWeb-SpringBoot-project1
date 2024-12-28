package com.stocktrading.stocktrade.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Config.JwtProvider;
import com.stocktrading.stocktrade.Model.TwoFactorAuth;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationType;
import com.stocktrading.stocktrade.Repo.UserRepo;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private  UserRepo userRepo;
    @Override
    public User findUserByJwt(String jwt) throws Exception {
       String email=JwtProvider.getEmailFromToken(jwt);
       User user=userRepo.findByEmail(email);
       if(user==null){
        throw new Exception("No user found\n");
       }
       return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user=userRepo.findByEmail(email);
        if (user==null) {
         throw new Exception("No user found");
        }
        return user;
    }

    @Override
    public User findUserById(Long id) throws Exception {
        Optional<User> user=userRepo.findById(id);
        if(user.isEmpty()){
            throw new Exception("User not found");
        }
        return user.get();
    }

    @Override
    public User updatepassword(User user, String password) {
        user.setPassword(password);
        return userRepo.save(user);
    }

    @Override
    public User enableTwoFactorAuth(VerificationType verificationType, String sendTo, User user) {
         TwoFactorAuth twoFactorAuth=new TwoFactorAuth();
       twoFactorAuth.setIsenabled(true);
       twoFactorAuth.setSendto(verificationType);

       user.setTwoFactorAuth(twoFactorAuth);
       return userRepo.save(user);
    }
    
}