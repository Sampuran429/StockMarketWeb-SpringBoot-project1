package com.stocktrading.stocktrade.Service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Order;
import com.stocktrading.stocktrade.Model.OrderType;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Wallet;
import com.stocktrading.stocktrade.Repo.WalletRepo;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepo walletRepo;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet=walletRepo.findWalletByUserId(user.getId());
        if(wallet==null){
            wallet=new Wallet();
            wallet.setUser(user);
            System.out.println("---------------"+wallet.getBalance()+"----------");
            walletRepo.save(wallet);
        }

        return wallet;
    }

    @Override
    public Wallet addbalancetoWallet(Wallet wallet, Long money) {
        BigDecimal balance=wallet.getBalance();
        BigDecimal newbalance=balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newbalance);
        System.out.println("-------"+newbalance+"--------");
        return walletRepo.save(wallet);
    }

    @Override
    public Wallet findById(Long Id) throws Exception {
        Optional<Wallet> wallet=walletRepo.findById(Id);
        if(wallet.isPresent()){
            return wallet.get();
        }
        throw new Exception("Wallet not found\n");
    }

    @Override
    public Wallet wallettoWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
       Wallet senderwallet=getUserWallet(sender);
       if(senderwallet.getBalance().compareTo(BigDecimal.valueOf(amount))<0){
        throw new Exception("Insufficient balance");
       }
       BigDecimal senderbalance=senderwallet.getBalance().subtract(BigDecimal.valueOf(amount));
       senderwallet.setBalance(senderbalance);
       walletRepo.save(senderwallet);
       BigDecimal receiverbalance=receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
       receiverWallet.setBalance(receiverbalance);
       walletRepo.save(receiverWallet);
       return senderwallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception {
        System.out.println("----------Success1-----------");
        Wallet wallet = getUserWallet(user);
        System.out.println("----------Success2-----------");
    
        // If the order type is 'Buy', check if there are sufficient funds in the wallet
        if (order.getOrdertype().equals(OrderType.Buy)) {
            System.out.println("----------Success3-----------");
            System.out.println("Order price: " + order.getPrice());
            System.out.println("Wallet balance before transaction: " + wallet.getBalance());
    
            BigDecimal initialBalance = wallet.getBalance();  // Store the initial balance
            BigDecimal orderPrice = order.getPrice();  // Get the order price
    
            // Check if the wallet has enough balance before the deduction
            if (initialBalance.compareTo(orderPrice) < 0) {
                System.out.println("----------Insufficient funds-----------");
                throw new Exception("Insufficient funds for this transaction\n");
            }
    
            // Subtract the order price from the wallet balance
            BigDecimal newBalance = initialBalance.subtract(orderPrice);
            System.out.println("New wallet balance after deduction: " + newBalance);
    
            // Update the wallet balance
            wallet.setBalance(newBalance);
            System.out.println("----------Success6-----------");
    
        } else {  // If it's a 'Sell' order, add the order price to the wallet balance
            System.out.println("----------Success7-----------");
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
            System.out.println("New wallet balance after adding: " + newBalance);
            
            // Update the wallet balance
            wallet.setBalance(newBalance);
            System.out.println("----------Success8-----------");
        }
    
        // Save the updated wallet balance to the database
        walletRepo.save(wallet);
        System.out.println("----------Success11-----------");
        
        return wallet;
    }
    
}
