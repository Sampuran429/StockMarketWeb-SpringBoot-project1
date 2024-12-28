package com.stocktrading.stocktrade.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Wallet;
import com.stocktrading.stocktrade.Model.Withdrawal;
import com.stocktrading.stocktrade.Service.UserService;
import com.stocktrading.stocktrade.Service.WalletService;
import com.stocktrading.stocktrade.Service.WithdrawalService;

@RestController
@CrossOrigin("*")
public class WithdrawalController {
    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;
     @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(@PathVariable Long amount,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Wallet userwallet=walletService.getUserWallet(user);
        Withdrawal withdrawal=withdrawalService.requestWithdrawal(amount, user);
        walletService.addbalancetoWallet(userwallet,-withdrawal.getAmount());

        // WalletTransaction walletTransaction=wa

       return new ResponseEntity<>(withdrawal,HttpStatus.OK);

    }
     @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithWithdrawal(@PathVariable Long id,@PathVariable boolean accept,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Withdrawal withdrawal=withdrawalService.proceedWithWithdrawal(id, accept);
        Wallet userWallet=walletService.getUserWallet(user);
        if(!accept){
            walletService.addbalancetoWallet(userWallet,withdrawal.getAmount());
        }
        return new ResponseEntity<>(withdrawal,HttpStatus.OK);
    }
     @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawalhistory(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        List<Withdrawal> withdrawal=withdrawalService.getUserWithdrawalHistory(user);
        return new ResponseEntity<>(withdrawal,HttpStatus.OK);
    }
    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        List<Withdrawal> withdrawal=withdrawalService.getAllWithdrawalRequest();
        return new ResponseEntity<>(withdrawal,HttpStatus.OK);
    }


}
