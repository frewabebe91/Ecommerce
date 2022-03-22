package com.hcl.springbootecommerce.controller;

import com.hcl.springbootecommerce.dto.Purchase;
import com.hcl.springbootecommerce.dto.PurchaseResponse;
import com.hcl.springbootecommerce.service.CheckoutService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    public CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }

    
    
}
