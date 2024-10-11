package com.example.e_comandroidapp.services;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

// class that implements retrofit client for network communication
public class ApiClient {
    private static final String BASE_URL = "https://fakestoreapi.com/";
//    private static final String BASE_URL = "https://dummyjson.com/auth/";
//    private static final String BASE_URL = "https://dummyjson.com/users/";
    private static Retrofit retrofit = null;

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    // Convert JSON to Java object
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
