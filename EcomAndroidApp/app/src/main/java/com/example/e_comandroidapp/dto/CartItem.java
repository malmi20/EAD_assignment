package com.example.e_comandroidapp.dto;

import com.example.e_comandroidapp.models.Product;

public class CartItem {
    String userId;
    Product product;

    public CartItem(String userId, Product product) {
        this.userId = userId;
        this.product = product;
    }

    public String getUserId() {
        return userId;
    }

    public Product getProduct() {
        return product;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setProductId(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "userId='" + userId + '\'' +
                ", productId='" + product.toString() + '\'' +
                '}';
    }
}
