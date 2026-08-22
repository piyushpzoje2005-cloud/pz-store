package com.ecommerce.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Customer customer;

    private Double totalAmount;
    private String paymentMethod;
    private String orderStatus;

    public Order(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public Customer getCustomer(){ return customer; }
    public void setCustomer(Customer customer){ this.customer=customer; }

    public Double getTotalAmount(){ return totalAmount; }
    public void setTotalAmount(Double totalAmount){ this.totalAmount=totalAmount; }

    public String getPaymentMethod(){ return paymentMethod; }
    public void setPaymentMethod(String paymentMethod){ this.paymentMethod=paymentMethod; }

    public String getOrderStatus(){ return orderStatus; }
    public void setOrderStatus(String orderStatus){ this.orderStatus=orderStatus; }
}