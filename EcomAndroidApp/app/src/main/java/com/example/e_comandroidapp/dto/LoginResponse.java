package com.example.e_comandroidapp.dto;

import java.util.Arrays;

public class LoginResponse {

    private String id;
    private String fullName;
    private String token;
    private String[] role;


    public LoginResponse(String id, String fullName, String token, String[] role) {
        this.id = id;
        this.fullName = fullName;
        this.token = token;
        this.role = role;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String[] role) {
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getToken() {
        return token;
    }

    public String[] getRole() {
        return role;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", token='" + token + '\'' +
                ", role=" + Arrays.toString(role) +
                '}';
    }
}