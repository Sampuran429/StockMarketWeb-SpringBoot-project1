package com.stocktrading.stocktrade.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Withdrawal;

public interface WithdrawalRepo extends JpaRepository<Withdrawal,Long>{
    List<Withdrawal> findByUserId(Long userId);
}
