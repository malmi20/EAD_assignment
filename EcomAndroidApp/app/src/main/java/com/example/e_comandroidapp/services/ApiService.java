package com.example.e_comandroidapp.services;
import com.example.e_comandroidapp.dto.CreateCartRequest;
import com.example.e_comandroidapp.dto.LoginRequest;
import com.example.e_comandroidapp.dto.LoginResponse;
import com.example.e_comandroidapp.dto.RegisterUserRequest;
import com.example.e_comandroidapp.dto.RegisterUserResponse;
import com.example.e_comandroidapp.dto.UserInfoResponse;
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
    @GET("category")
    Call<List<Category>> fetchCategories();

    @GET("product")
    Call<List<Product>> fetchProducts();

    ///products/category/jewelery
    @GET("product/filter/{categoryName}")
    Call<List<Product>> fetchProductsByCategory(@Path("categoryName") String categoryName);

    @GET("auth/user/{id}")
    Call<UserInfoResponse> fetchUserinfoById(@Path("id") String id);

    @POST("auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    // auth/register
    @POST("auth/register")
    Call<String> signUp(@Body RegisterUserRequest request);

    @POST("order")
    Call<String> createOrder(@Body CreateCartRequest request);

}
