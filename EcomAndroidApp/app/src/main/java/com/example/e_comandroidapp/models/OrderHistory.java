package com.example.e_comandroidapp.models;

import java.util.Date;

public class OrderHistory {
    private String date;
    private double subTotal;
    private String orderState;

    public OrderHistory(){}

    public OrderHistory(String date, double subTotal, String orderState) {
        this.date = date;
        this.subTotal = subTotal;
        this.orderState = orderState;
    }

    public String getDate() {
        return date;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public String getOrderState() {
        return orderState;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
    }

    @Override
    public String toString() {
        return "OrderHistory{" +
                "date='" + date + '\'' +
                ", subTotal=" + subTotal +
                ", orderState='" + orderState + '\'' +
                '}';
    }
}
