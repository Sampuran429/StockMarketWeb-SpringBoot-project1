package com.stocktrading.stocktrade.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.PaymentDetails;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Repo.PaymentRepo;

@Service
public class PaymentDetailsServiceImpl  implements PaymentDetailsService{

    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public PaymentDetails addpaymentdetails(String accountnumber, String accountholdername, String ifsc,String bankname,User user){
        PaymentDetails paymentDetails=new PaymentDetails();
       paymentDetails.setAccountno(accountnumber);
       paymentDetails.setAccountholdername(accountholdername);
       paymentDetails.setIfsc(ifsc);
       paymentDetails.setBankname(bankname);
       paymentDetails.setUser(user);
       return paymentRepo.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserpaymentDetails(User user) {
        return paymentRepo.findByUserId(user.getId());
    }
    
}
