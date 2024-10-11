package com.example.e_comandroidapp.services;
import com.example.e_comandroidapp.dto.LoginRequest;
import com.example.e_comandroidapp.dto.LoginResponse;
import com.example.e_comandroidapp.dto.RegisterUserRequest;
import com.example.e_comandroidapp.dto.RegisterUserResponse;
import com.example.e_comandroidapp.models.Category;
import com.example.e_comandroidapp.models.Product;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

// calling the API endpoint as form of api service
public interface ApiService {
    @GET("products/categories")
    Call<List<String>> fetchCategories();

    @GET("products")
    Call<List<Product>> fetchProducts();

    ///products/category/jewelery
    @GET("products/category/{categoryName}")
    Call<List<Product>> fetchProductsByCategory(@Path("categoryName") String categoryName);

    @POST("login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("add")
    Call<RegisterUserResponse> signUp(@Body RegisterUserRequest request);
}
