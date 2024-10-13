package com.example.e_comandroidapp.dto;

public class RegisterUserRequest {


    private String FirstName;
    private String LastName;

    private String UserName;
    private String Email;
    private String Password;
    private String ConfirmPassword;
    private String Address;
    private String ContactNo;


    public RegisterUserRequest(String firstName, String lastName, String userName, String email, String password, String confirmPassword, String address, String contactNo) {
        FirstName = firstName;
        LastName = lastName;
        UserName = userName;
        Email = email;
        Password = password;
        ConfirmPassword = confirmPassword;
        Address = address;
        ContactNo = contactNo;
    }

    public String getFirstName() {
        return FirstName;
    }

    public String getLastName() {
        return LastName;
    }

    public String getUserName() {
        return UserName;
    }

    public String getEmail() {
        return Email;
    }

    public String getPassword() {
        return Password;
    }

    public String getConfirmPassword() {
        return ConfirmPassword;
    }

    public String getAddress() {
        return Address;
    }

    public String getContactNo() {
        return ContactNo;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public void setConfirmPassword(String confirmPassword) {
        ConfirmPassword = confirmPassword;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public void setContactNo(String contactNo) {
        ContactNo = contactNo;
    }
}

