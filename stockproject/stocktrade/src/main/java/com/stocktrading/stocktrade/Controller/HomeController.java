package com.stocktrading.stocktrade.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class HomeController {
    @GetMapping
    public String home(){
        return "Welcome to Stock Trading";
    }
}
