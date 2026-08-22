package com.ecommerce.ecommerce.repository;

import com.ecommerce.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long>{}