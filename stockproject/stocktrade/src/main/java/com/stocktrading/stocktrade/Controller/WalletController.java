package com.stocktrading.stocktrade.Controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.PaymentOrder;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Wallet;
import com.stocktrading.stocktrade.Model.WalletTransaction;
import com.stocktrading.stocktrade.Service.OrderService;
import com.stocktrading.stocktrade.Service.PaymentService;
import com.stocktrading.stocktrade.Service.UserService;
import com.stocktrading.stocktrade.Service.WalletService;

@CrossOrigin("*")
@RestController
public class WalletController {
    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/api/wallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt ) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Wallet wallet=walletService.getUserWallet(user);
        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/{walletId}/transfer")
    public ResponseEntity<Wallet> walletTowalletTransfer(@RequestHeader("Authorization") String jwt,@PathVariable Long walletId,@RequestBody WalletTransaction req) throws Exception{
        User senderUser=userService.findUserByJwt(jwt);
        Wallet receiverWallet=walletService.findById(walletId);
        Wallet wallet=walletService.wallettoWalletTransfer(senderUser, receiverWallet, req.getAmount());
        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }


    @PutMapping("/api/wallet/order/{orderId}/pay")
    public ResponseEntity<Wallet> PayOrderPayment(@RequestHeader("Authorization") String jwt,@PathVariable Long orderId) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
       Order order=orderService.getOrderById(orderId);

       Wallet wallet=walletService.payOrderPayment(order, user);
       return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/wallet/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(@RequestHeader("Authorization") String jwt,@RequestParam(name = "order_Id") Long orderId,@RequestParam(name = "payment_Id") String paymentId) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
       

       Wallet wallet=walletService.getUserWallet(user);

       PaymentOrder order=paymentService.getPaymentOrderById(orderId);
       Boolean status=paymentService.ProceedPaymentOrder(order, paymentId);
       if(wallet.getBalance()==null){
        wallet.setBalance(BigDecimal.valueOf(0));
       }
       if(status){
        wallet=walletService.addbalancetoWallet(wallet, order.getAmount());
       }
       return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }
}
