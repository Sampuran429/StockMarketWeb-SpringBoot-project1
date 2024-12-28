package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Ipo;

public interface IpoRepo  extends JpaRepository<Ipo,Long>{
}
