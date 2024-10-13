package com.example.e_comandroidapp.models;

// Product model class
public class Product {
    private String id;

    private String categoryID = "";

    private String name;
    private ComprehensiveId _id;
    private String title;
    private double price;
    private String description;
    private String category;
    private String image;
    private Rate rating = new Rate(3, 3);

    private double ratingValue;

    public Product() {
    }

    public Product(String id, ComprehensiveId _id, String name, String title, double price, String description, String category, String image, Rate rating, double ratingValue) {
        this.name = name;
        this.id = id;
        this._id = _id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
        this.ratingValue = ratingValue;
    }


    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getImage() {
        return image;
    }

    public Rate getRating() {
        return rating;
    }

    public double getRatingValue(){return  this.rating.getRate();}

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setRating(Rate rating) {
        this.rating = rating;
    }


    public ComprehensiveId get_id() {
        return _id;
    }

    public void set_id(ComprehensiveId _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRatingValue(double ratingValue) {
        this.ratingValue = ratingValue;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", categoryID='" + categoryID + '\'' +
                ", name='" + name + '\'' +
                ", _id=" + _id +
                ", title='" + title + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", image='" + image + '\'' +
                ", rating=" + rating +
                ", ratingValue=" + ratingValue +
                '}';
    }
}

class Rate{
    private double rate;
    private int count;

    public Rate() {
    }

    public Rate(double rate, int count) {
        this.rate = rate;
        this.count = count;
    }

    public double getRate() {
        return rate;
    }

    public int getCount() {
        return count;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public void setCount(int count) {
        this.count = count;
    }
}

class ComprehensiveId{
    private int timestamp;
    private int machine;
    private int pid;
    private int increment;
    private String creationTime;

    public ComprehensiveId(int timestamp, int machine, int pid, int increment, String creationTime) {
        this.timestamp = timestamp;
        this.machine = machine;
        this.pid = pid;
        this.increment = increment;
        this.creationTime = creationTime;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public int getMachine() {
        return machine;
    }

    public int getPid() {
        return pid;
    }

    public int getIncrement() {
        return increment;
    }

    public String getCreationTime() {
        return creationTime;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    public void setMachine(int machine) {
        this.machine = machine;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public void setIncrement(int increment) {
        this.increment = increment;
    }

    public void setCreationTime(String creationTime) {
        this.creationTime = creationTime;
    }

    @Override
    public String toString() {
        return "ComprehensiveId{" +
                "timestamp=" + timestamp +
                ", machine=" + machine +
                ", pid=" + pid +
                ", increment=" + increment +
                ", creationTime='" + creationTime + '\'' +
                '}';
    }
}