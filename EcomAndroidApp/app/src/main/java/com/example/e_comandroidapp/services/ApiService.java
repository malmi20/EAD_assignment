package com.example.e_comandroidapp.services;
import com.example.e_comandroidapp.models.Category;
import com.example.e_comandroidapp.models.Product;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiService {
    @GET("products/categories")
    Call<List<String>> fetchCategories();

    @GET("products")
    Call<List<Product>> fetchProducts();

    ///products/category/jewelery
    @GET("products/category/{categoryName}")
    Call<List<Product>> fetchProductsByCategory(@Path("categoryName") String categoryName);
}
