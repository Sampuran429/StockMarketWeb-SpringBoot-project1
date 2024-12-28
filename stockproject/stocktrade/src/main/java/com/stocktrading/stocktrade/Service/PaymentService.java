package com.stocktrading.stocktrade.Service;

import org.springframework.stereotype.Service;

import com.razorpay.RazorpayException;
import com.stocktrading.stocktrade.Model.PaymentMethod;
import com.stocktrading.stocktrade.Model.PaymentOrder;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Response.PaymentResponse;
import com.stripe.exception.StripeException;

@Service
public interface PaymentService {
    PaymentOrder createOrder(User user,Long amount,PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException, StripeException;
    PaymentResponse createRazorPayPaymentLink(User user,Long amount,Long orderId) throws RazorpayException;
    PaymentResponse createStripePayPaymentLink(User user,Long amount,Long orderId) throws StripeException;
    String   getPaymentIdFromSession(String sessionId) throws StripeException, Exception;
}
