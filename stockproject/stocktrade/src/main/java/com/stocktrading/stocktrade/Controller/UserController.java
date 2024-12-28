package com.stocktrading.stocktrade.Controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.ForgotPasswordToken;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.VerificationCode;
import com.stocktrading.stocktrade.Model.VerificationType;
import com.stocktrading.stocktrade.Request.ForgotPasswordTokenRequest;
import com.stocktrading.stocktrade.Request.ResetPasswordRequest;
import com.stocktrading.stocktrade.Response.ApiResponse;
import com.stocktrading.stocktrade.Response.AuthResponse;
import com.stocktrading.stocktrade.Service.EmailService;
import com.stocktrading.stocktrade.Service.ForgotPasswordTokenService;
import com.stocktrading.stocktrade.Service.UserService;
import com.stocktrading.stocktrade.Service.VerificationCodeService;
import com.stocktrading.stocktrade.Utils.OtpUtils;



@CrossOrigin("*")
@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

   @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;


    @Autowired
    private ForgotPasswordTokenService forgotPasswordService;

    private ForgotPasswordTokenRequest forgotPasswordTokenRequest;
    private String jwt;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader ("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verficationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@RequestHeader ("Authorization") String jwt,@PathVariable VerificationType verficationType) throws Exception{
        User user=userService.findUserByJwt(jwt);
        
        VerificationCode verfificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
        if(verfificationCode==null){
           verfificationCode=verificationCodeService.sendVerificationCode(user, verficationType);
        }
        if(verficationType.equals(VerificationType.email)){
            emailService.sendverificationOtpEmail(user.getEmail(), verfificationCode.getOtp());
        }


        return new ResponseEntity<>("verification  otp sent succesfully",HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuth(@PathVariable String otp,@RequestHeader ("Authorization") String jwt) throws Exception{
        
        System.out.println("---------------Error1--------------");
        User user=userService.findUserByJwt(jwt);
        System.out.println("---------------Error2--------------");
        VerificationCode verfificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
        System.out.println("---------------Error3--------------");
        String sendTo=verfificationCode.getVerificationType().equals(VerificationType.email)?verfificationCode.getEmail():verfificationCode.getMobile();
        System.out.println("---------------Error4--------------");
        boolean isVerified=verfificationCode.getOtp().equals(otp);
        System.out.println("---------------Error5--------------");
        if(isVerified){
            System.out.println("-------------Error 6--------");
            User updatedUser=userService.enableTwoFactorAuth(verfificationCode.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCode(verfificationCode);
            return new ResponseEntity<>(updatedUser,HttpStatus.OK);
        }
        throw new Exception("Wrong Otp");
    }
  
     @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(@RequestBody ForgotPasswordTokenRequest forgotPasswordTokenRequest) throws Exception{
        System.out.println("----------Error1-------------");
        User user=userService.findUserByEmail(forgotPasswordTokenRequest.getSendTo());
        System.out.println("----------Error2-------------");
        
        String otp=OtpUtils.generateOtp();
        System.out.println("----------Error3----------");
        UUID  uuid=UUID.randomUUID();
        System.out.println("-------------Error3-----------");
        String id=uuid.toString();
        System.out.println("----------Error4------------");
        ForgotPasswordToken token=forgotPasswordService.findByUserId(user.getId());
        System.out.println("------------Error 5---------------");
        if(token==null){
            System.out.println("--------------Error6-------------");
            token=forgotPasswordService.createToken(user, id, otp,forgotPasswordTokenRequest.getVerficationType(),forgotPasswordTokenRequest.getSendTo());
        }
        System.out.println("--------------Error7-------------");

        if(forgotPasswordTokenRequest.getVerficationType().equals(VerificationType.email)){
            System.out.println("-------------Error8------------------");
            emailService.sendverificationOtpEmail(user.getEmail(),token.getOtp());
        }
        System.out.println("--------------------------Error9---------------------");
        AuthResponse response=new AuthResponse();
        System.out.println("-----------------------Error10---------------");
        response.setSession(token.getId());
        System.out.println("--------------------Error 11-----------------");
        response.setMessage("Password reset otp sent successfully\n");
        System.out.println("-----------------Error12-------------------");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetpassword(@RequestParam String id,@RequestBody ResetPasswordRequest req,@RequestHeader("Authorization") String jwt) throws Exception{
       
        
       ForgotPasswordToken forgotPasswordToken=forgotPasswordService.findById(id);
        boolean isVerified=forgotPasswordToken.getOtp().equals(req.getOtp());
        if(isVerified){
            userService.updatepassword(forgotPasswordToken.getUser(),req.getPassword());
            ApiResponse response=new ApiResponse();
            response.setMessage("Password reset successfully");
            return new ResponseEntity<>(response,HttpStatus.OK);   
        }
        throw new Exception("Wrong Otp");
    }

}
