package com.stocktrading.stocktrade.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Model.Withdrawal;

@Service
public interface WithdrawalService {
    Withdrawal requestWithdrawal(Long amount,User user);
    Withdrawal proceedWithWithdrawal(Long withdrawalId,boolean accept) throws Exception;
    List<Withdrawal> getUserWithdrawalHistory(User user);
    List<Withdrawal> getAllWithdrawalRequest();
}
