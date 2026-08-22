package com.ecommerce.ecommerce.controller;

import com.ecommerce.ecommerce.dto.OrderRequest;
import com.ecommerce.ecommerce.entity.Order;
import com.ecommerce.ecommerce.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService=orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request){
        return orderService.placeOrder(request);
    }

    @GetMapping
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    @PutMapping("/{id}/{status}")
    public Order updateStatus(
            @PathVariable Long id,
            @PathVariable String status){

        return orderService.updateOrderStatus(id,status);
    }
}