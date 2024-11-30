package com.next1.repositories;

import com.next1.entities.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentReository extends JpaRepository<PaymentEntity, Integer> {
}
