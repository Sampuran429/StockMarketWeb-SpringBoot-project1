package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Wallet;

@Service
public interface WalletService {
    Wallet getUserWallet(User user);
    Wallet addbalancetoWallet(Wallet wallet,Long money);
    Wallet findById(Long Id) throws Exception;
    Wallet wallettoWalletTransfer(User sender,Wallet receiverWallet,Long amount) throws Exception;
    Wallet payOrderPayment(Order order,User user) throws Exception;
}
