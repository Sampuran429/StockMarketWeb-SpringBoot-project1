package com.stocktrading.stocktrade.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stocktrading.stocktrade.Model.PaymentMethod;
import com.stocktrading.stocktrade.Model.PaymentOrder;
import com.stocktrading.stocktrade.Model.User;
import com.stocktrading.stocktrade.Response.PaymentResponse;
import com.stocktrading.stocktrade.Service.PaymentService;
import com.stocktrading.stocktrade.Service.UserService;

@RestController
@CrossOrigin("*")
public class PaymentController {
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod,
                                                          @PathVariable Long amount,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        PaymentResponse paymentResponse;
        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        if (paymentMethod.equals(PaymentMethod.Razorpay)) {
            paymentResponse = paymentService.createRazorPayPaymentLink(user, amount, order.getId());
        } else {
            paymentResponse = paymentService.createStripePayPaymentLink(user, amount, order.getId());
           
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

    @GetMapping("/api/payment/success")
    public ResponseEntity<String> handlePaymentSuccess(@RequestParam String session_id) {
        try {
            // Retrieve the payment ID from Stripe using the session_id
            String paymentId = paymentService.getPaymentIdFromSession(session_id);
            return ResponseEntity.ok("Payment successful! Payment ID: " + paymentId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
