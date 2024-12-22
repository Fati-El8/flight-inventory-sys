package com.next1.controllers;

import com.next1.entities.PaymentEntity;
import com.next1.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Charge;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Get a payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentEntity> getPaymentById(@PathVariable Integer id) {
        Optional<PaymentEntity> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<PaymentEntity>> getAllPayments() {
        List<PaymentEntity> payments = paymentService.getAllPayment();
        return ResponseEntity.ok(payments);
    }

    // Create a new payment
    @PostMapping
    public ResponseEntity<PaymentEntity> savePayment(@RequestBody PaymentEntity payment) {
        PaymentEntity savedPayment = paymentService.savePayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
    }

    // Update an existing payment
    @PutMapping("/{id}")
    public ResponseEntity<PaymentEntity> updatePayment(@PathVariable Integer id, @RequestBody PaymentEntity paymentDetails) {
        try {
            PaymentEntity updatedPayment = paymentService.updatePayment(id, paymentDetails);
            return ResponseEntity.ok(updatedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete a payment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Integer id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    // Create a PaymentIntent
    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntent> createPaymentIntent(@RequestParam Long amount, @RequestParam String currency) {
        try {
            PaymentIntent paymentIntent = paymentService.createPaymentIntent(amount, currency);
            return ResponseEntity.ok(paymentIntent);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Charge a payment
    @PostMapping("/charge")
    public ResponseEntity<Charge> chargePayment(@RequestParam Long amount, @RequestParam String currency, @RequestParam String source) {
        try {
            Charge charge = paymentService.chargePayment(amount, currency, source);
            return ResponseEntity.ok(charge);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

