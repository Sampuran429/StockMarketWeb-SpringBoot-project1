package com.stocktrading.stocktrade.Utils;

import java.util.Random;

public class OtpUtils {
    public static String generateOtp(){
        int otplen=6;
        Random random=new Random();
        StringBuilder otp=new StringBuilder();
        for(int i=0;i<otplen;i++){
            int otpdigit=random.nextInt(10);
            otp.append(otpdigit);
        }
        return otp.toString();
    }
}
