package com.stocktrading.stocktrade.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Withdrawal {
    private Long amount;
    private LocalDateTime date=LocalDateTime.now();
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

        private Withdrawalstatus withdrawalstatus;

  

    @ManyToOne
    private User user;



}
