package com.stocktrading.stocktrade.Model;

import lombok.Data;

@Data
public class TwoFactorAuth {
    private boolean isenabled=false;
    private VerificationType sendto;
}