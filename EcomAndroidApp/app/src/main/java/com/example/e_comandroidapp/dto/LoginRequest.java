package com.example.e_comandroidapp.dto;

public class LoginRequest {
    private String Email;
    private String Password;

    public LoginRequest(String email, String password) {
        Email = email;
        Password = password;
    }

    @Override
    public String toString() {
        return "LoginRequest{" +
                "Email='" + Email + '\'' +
                ", Password='" + Password + '\'' +
                '}';
    }
}
