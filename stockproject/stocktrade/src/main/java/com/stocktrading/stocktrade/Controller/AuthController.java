package com.stocktrading.stocktrade.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Config.JwtProvider;
import com.stocktrading.stocktrade.Model.TwoFactorOtp;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.UserRepo;
import com.stocktrading.stocktrade.Response.AuthResponse;
import com.stocktrading.stocktrade.Service.CustomerUserDetailsService;
import com.stocktrading.stocktrade.Service.EmailService;
import com.stocktrading.stocktrade.Service.TwoFactorOtpService;
import com.stocktrading.stocktrade.Service.WatchlistService;
import com.stocktrading.stocktrade.Utils.OtpUtils;



@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController { 
    @Autowired
    private UserRepo  userRepo;

    @Autowired
    private CustomerUserDetailsService customUserDetailsService;

    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception{
       
        User isEmailExists=userRepo.findByEmail(user.getEmail());
        if (isEmailExists != null) {
            throw new Exception("Email already exists\n");
        }
        if (user.getFullName() == null || user.getFullName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 Bad Request if fullName is missing
        }
        
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setFullName(user.getFullName());

       

        User savedUser = userRepo.save(newUser);

         watchlistService.createWatchList(savedUser);

         Authentication auth=new UsernamePasswordAuthenticationToken(
            user.getEmail(),
            user.getPassword()
                        );

                        SecurityContextHolder.getContext().setAuthentication(auth);

        
        String jwt=JwtProvider.generateToken(auth);
        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("register success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception{
        

        String username=user.getEmail();
        String password=user.getPassword();



         Authentication auth=authenticate(username,password);

                        SecurityContextHolder.getContext().setAuthentication(auth);

        
        String jwt=JwtProvider.generateToken(auth);

        User authuser=userRepo.findByEmail(username);
        if(user.getTwoFactorAuth().isIsenabled()){
            AuthResponse res=new AuthResponse();
            res.setMessage("Two factor Auth is enabled\n");
            res.setTwoFactorAuthEnabled(true);
            String otp=OtpUtils.generateOtp();

            TwoFactorOtp oldTwoFactorOtp=twoFactorOtpService.findbyUser(authuser.getId());
            if(oldTwoFactorOtp!=null){
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);
            }

            TwoFactorOtp newFactorOtp=twoFactorOtpService.createTwoFactorOtp(authuser, otp, jwt);

            emailService.sendverificationOtpEmail(username, otp);

            res.setSession(newFactorOtp.getId());
            return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
        }
        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("login success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    private Authentication authenticate(String username, String password) {
        UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
        if(!password.equals(userDetails.getPassword())){
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySignOtp(@PathVariable String otp,@RequestParam String id) throws Exception{
        TwoFactorOtp twoFactorOtp=twoFactorOtpService.findbyId(id);
        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOtp,otp)){
            AuthResponse authResponse=new AuthResponse();
            authResponse.setMessage("Two factor auth is verified");
            authResponse.setTwoFactorAuthEnabled(true);
            authResponse.setJwt(twoFactorOtp.getJwt());
            return new ResponseEntity<>(authResponse,HttpStatus.OK);
        }
        throw new Exception("invalid\n");
    }
}
