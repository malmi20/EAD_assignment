package com.example.e_comandroidapp.dto;

import com.example.e_comandroidapp.models.Product;

import java.util.List;

public class CreateCartRequest {

    public String id = "";
    public String CustomerId;
    public List<String> Items;
    public double TotalAmount = 0.0;

    public String DeliveryAddress = "";

    public CreateCartRequest(String customerId, List<String> items, double totalAmount, String deliveryAddress) {
        CustomerId = customerId;
        Items = items;
        TotalAmount = totalAmount;
        DeliveryAddress = deliveryAddress;
    }

    public String getCustomerId() {
        return CustomerId;
    }

    public List<String> getItems() {
        return Items;
    }

    public double getTotalAmount() {
        return TotalAmount;
    }

    public String getDeliveryAddress() {
        return DeliveryAddress;
    }

    public void setCustomerId(String customerId) {
        CustomerId = customerId;
    }

    public void setItems(List<String> items) {
        Items = items;
    }

    public void setTotalAmount(double totalAmount) {
        TotalAmount = totalAmount;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        DeliveryAddress = deliveryAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CreateCartRequest{" +
                "id='" + id + '\'' +
                ", CustomerId='" + CustomerId + '\'' +
                ", Items=" + Items +
                ", TotalAmount=" + TotalAmount +
                ", DeliveryAddress='" + DeliveryAddress + '\'' +
                '}';
    }
}
