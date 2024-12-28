package com.stocktrading.stocktrade.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Withdrawal;
import com.stocktrading.stocktrade.Model.Withdrawalstatus;
import com.stocktrading.stocktrade.Repo.WithdrawalRepo;

@Service
public class WithdrawalServiceImpl  implements WithdrawalService{


    @Autowired
    private WithdrawalRepo withdrawalRepo;

    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
       Withdrawal withdrawal=new Withdrawal();
       withdrawal.setAmount(amount);
       withdrawal.setUser(user);
       withdrawal.setWithdrawalstatus(Withdrawalstatus.Pending);
       return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithWithdrawal(Long withdrawalId, boolean accept) throws Exception {
        Optional<Withdrawal> withdrawal=withdrawalRepo.findById(withdrawalId);
        if(withdrawal.isEmpty()){
            throw new Exception("Withdrawal not found");
        }
        Withdrawal withdrawal2=withdrawal.get();
        withdrawal2.setDate(LocalDateTime.now());
        if(accept){
            withdrawal2.setWithdrawalstatus(Withdrawalstatus.Success);
        }else{
            withdrawal2.setWithdrawalstatus(Withdrawalstatus.Pending);
        }
        return withdrawalRepo.save(withdrawal2);
    }

    @Override
    public List<Withdrawal> getUserWithdrawalHistory(User user) {
        return withdrawalRepo.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepo.findAll();
    }
    
}
