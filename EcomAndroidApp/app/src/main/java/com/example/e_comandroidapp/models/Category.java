package com.example.e_comandroidapp.models;

//Category model class
public class Category {

    private String categoryId;
    private String name;
    private boolean isActive;

    public Category(String categoryId, String name, boolean isActive) {
        this.categoryId = categoryId;
        this.name = name;
        this.isActive = isActive;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryId='" + categoryId + '\'' +
                ", name='" + name + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
