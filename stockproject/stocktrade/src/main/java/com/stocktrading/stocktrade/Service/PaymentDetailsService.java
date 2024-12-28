package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.PaymentDetails;
import com.stocktrading.stocktrade.Model.User;

@Service
public interface PaymentDetailsService {
    public PaymentDetails addpaymentdetails(String accountnumber,String accountholdername,String ifsc,String bankname,User user);
    public PaymentDetails getUserpaymentDetails(User user);
}
