package com.stocktrading.stocktrade.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.UserRepo;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
       User user=userRepo.findByEmail(username);
       if(user==null){
        throw new UsernameNotFoundException("Invalid username or password");
       }
       List<GrantedAuthority> authoritylist=new ArrayList<>();
       return new org.springframework.security.core.userdetails.User(user.getEmail(), 
       user.getPassword(), authoritylist);
    }
}
