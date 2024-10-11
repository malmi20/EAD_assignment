package com.example.e_comandroidapp.dto;

//public class RegisterUserRequest {
//    private String firstName;
//    private String lastName;
//    private String userName;
//    private String userPassword;
//    private String email;
//    private String address;
//    private String contact;
//
//    public RegisterUserRequest(String firstName, String lastName, String userName, String userPassword, String email, String address, String contact) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.userName = userName;
//        this.userPassword = userPassword;
//        this.email = email;
//        this.address = address;
//        this.contact = contact;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//
//    public void setUserPassword(String userPassword) {
//        this.userPassword = userPassword;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public void setContact(String contact) {
//        this.contact = contact;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public String getUserPassword() {
//        return userPassword;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public String getContact() {
//        return contact;
//    }
//
//    @Override
//    public String toString() {
//        return "RegisterUserRequest{" +
//                "firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", userName='" + userName + '\'' +
//                ", userPassword='" + userPassword + '\'' +
//                ", email='" + email + '\'' +
//                ", address='" + address + '\'' +
//                ", contact='" + contact + '\'' +
//                '}';
//    }
//}

public class RegisterUserRequest {
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    private String firstName;
    private String lastName;
    private int age;

    public RegisterUserRequest(String firstName, String lastName, int age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "RegisterUserRequest{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                '}';
    }
}
