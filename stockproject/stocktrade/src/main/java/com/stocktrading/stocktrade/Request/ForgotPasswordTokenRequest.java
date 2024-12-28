package com.stocktrading.stocktrade.Request;

import com.stocktrading.stocktrade.Model.VerificationType;

import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private String sendTo;
    private VerificationType verficationType;;
}
