package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Wallet;

public interface WalletRepo  extends JpaRepository<Wallet,Long>{
    Wallet findWalletByUserId(Long userId);
}
