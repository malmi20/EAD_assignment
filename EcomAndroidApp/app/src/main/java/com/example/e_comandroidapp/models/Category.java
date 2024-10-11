package com.example.e_comandroidapp.models;

//Category model class
public class Category {
    private String name;

    public Category(String name){
        this.name = name;
    }

    public void setName(String name){this.name = name;}
    public String getName(){ return this.name;}
}
