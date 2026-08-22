package com.ecommerce.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name="customers")
public class Customer {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;

    public Customer(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public String getFullName(){ return fullName; }
    public void setFullName(String fullName){ this.fullName=fullName; }

    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone=phone; }

    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address=address; }

    public String getCity(){ return city; }
    public void setCity(String city){ this.city=city; }

    public String getState(){ return state; }
    public void setState(String state){ this.state=state; }

    public String getPincode(){ return pincode; }
    public void setPincode(String pincode){ this.pincode=pincode; }
}