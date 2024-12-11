package com.next1.services;

import com.next1.entities.PaymentEntity;
import com.next1.entities.PlaneEntity;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import com.next1.repositories.PaymentReository;
import com.next1.repositories.PlaneReository;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Optional;

public class PaymentService {
    @Autowired
    private PaymentReository paymentReository ;


    public Optional<PaymentEntity> getPaymentById(Integer id) {
        return paymentReository.findById(id);
    }

    public List<PaymentEntity> getAllPayment() {
        return paymentReository.findAll();
    }

    public PaymentEntity savePayment(PaymentEntity payment){
        return paymentReository.save(payment);
    }

    public PaymentEntity updatePayment(Integer id, PaymentEntity paymentDetails) {
        return  paymentReository.findById(id)
                .map(payment -> {
                    payment.setDate_payment(paymentDetails.getDate_payment());

                    return savePayment(paymentDetails);
                })
                .orElseThrow(() -> new RuntimeException("Plane not found with id " + id));

    }

    public void deletePayment(Integer id) {
        paymentReository.deleteById(id);
    }


    @Value("${stripe.api.key.secret}")
    private String secretKey;

    // Constructor to initialize Stripe API key
    public PaymentService() {
        Stripe.apiKey = secretKey;  // Configure the Stripe API key
    }

    // Method to create a PaymentIntent (for a payment)
    public PaymentIntent createPaymentIntent(Long amount, String currency) throws StripeException {
        // Set up the parameters for PaymentIntent
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)  // Amount in cents
                .setCurrency(currency)
                .build();

        // Create the PaymentIntent and return it
        return PaymentIntent.create(params);
    }

    // Method to charge a payment using Stripe (with Charge)
    public Charge chargePayment(Long amount, String currency, String source) throws StripeException {
        // Set up the parameters for the charge
         ChargeCreateParams params = ChargeCreateParams.builder()
                .setAmount(amount)  // Amount in cents
                .setCurrency(currency)
                .setSource(source)  // Token or card source
                .build();

        // Create the charge and return it
        return Charge.create(params);
    }
}
