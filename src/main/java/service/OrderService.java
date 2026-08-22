package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.dto.OrderRequest;
import com.ecommerce.ecommerce.entity.Customer;
import com.ecommerce.ecommerce.entity.Order;
import com.ecommerce.ecommerce.repository.CustomerRepository;
import com.ecommerce.ecommerce.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public OrderService(CustomerRepository customerRepository,
                        OrderRepository orderRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    // Place Order
    public Order placeOrder(OrderRequest request) {

        Customer customer = new Customer();

        customer.setFullName(request.fullName);
        customer.setPhone(request.phone);
        customer.setAddress(request.address);
        customer.setCity(request.city);
        customer.setState(request.state);
        customer.setPincode(request.pincode);

        customerRepository.save(customer);

        Order order = new Order();

        order.setCustomer(customer);
        order.setTotalAmount(request.totalAmount);
        order.setPaymentMethod("COD");
        order.setOrderStatus("Pending");

        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Update Order Status
    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);

        return orderRepository.save(order);
    }
}