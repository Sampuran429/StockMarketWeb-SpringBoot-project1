package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.Company;

public interface CompanyRepo  extends JpaRepository<Company,Long>{
}
