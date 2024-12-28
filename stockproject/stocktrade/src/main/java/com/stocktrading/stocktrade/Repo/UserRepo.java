package com.stocktrading.stocktrade.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocktrading.stocktrade.Model.User;

public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
