package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.e_comandroidapp.dto.CartItem;
import com.example.e_comandroidapp.dto.CreateCartRequest;
import com.example.e_comandroidapp.dto.RegisterUserRequest;
import com.example.e_comandroidapp.events.OnProductCardClickListener;
import com.example.e_comandroidapp.events.OnTextViewClickListener;
import com.example.e_comandroidapp.services.ApiClient;
import com.example.e_comandroidapp.services.ApiService;
import com.example.e_comandroidapp.adapters.CategoriesAdapter;
import com.example.e_comandroidapp.adapters.ProductsAdapter;
import com.example.e_comandroidapp.models.Product;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Random;
import java.util.Collections;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProductCartActivity extends AppCompatActivity implements  OnProductCardClickListener {

    RecyclerView cartItemsRecyclerVIew;
    ApiService apiService = ApiClient.getClient().create(ApiService.class);
    List<Product> productList = new ArrayList<>();
    List<Product> limittedProductList = new ArrayList<>();
    ProductsAdapter productsAdapter;
    OnProductCardClickListener onProductCardClickListener = this;

    private double sumTotal = 7;
    private double deliveryFee = 23;

    static Random randomGenerator = new Random();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_cart);

        //bottom navigation bar handling
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setSelectedItemId(R.id.cart_bottom);

        bottomNavigationView.setOnItemSelectedListener(item -> {
            if(R.id.home_bottom == item.getItemId()){
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
                return true;
            } else if (R.id.cart_bottom == item.getItemId()) {
                return true;
            } else if (R.id.Profile_bottom == item.getItemId()) {
                startActivity(new Intent(getApplicationContext(), UserProfileActivity.class));
                finish();
                return true;
            }
            return false;
        });

        // Get SharedPreferences
        List<CartItem> cartItems = new ArrayList<>();
        String userId = "";
        SharedPreferences sharedPreferences = getSharedPreferences("userCartList1", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        String stringOfCart = sharedPreferences.getString("userCartItems", "[]");

        Gson gson = new Gson();
        Type type = new TypeToken<ArrayList<CartItem>>() {}.getType();

        ArrayList<CartItem> userList = gson.fromJson(stringOfCart, type);

        cartItems = gson.fromJson(stringOfCart, type);

        productList.clear();
        System.out.println("+++++++++++++++++++ display cart items");
        for (int i = 0; i < cartItems.size(); i++) {
            productList.add(cartItems.get(i).getProduct());
            userId = cartItems.get(i).getUserId();
            System.out.println(cartItems.get(i));
        }

        editor.apply();


        // Call the API to get products
        Call<List<Product>> call_getProducts = apiService.fetchProducts();
        call_getProducts.enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                if (response.isSuccessful()) {
                    Log.d("RAW_RESPONSE", response.body().toString());
//                    productList = response.body();

                    //shuffle th product list
                    for (int i = productList.size() - 1; i >= 1; i--) {
                        // swapping current index value
                        // with random index value
                        Collections.swap(productList, i, randomGenerator.nextInt(i + 1));
                    }

                    limittedProductList = productList.stream().limit(6).collect(Collectors.toList());
                    sumTotal = limittedProductList.stream().map(Product::getPrice).reduce(0.0, (a, b) -> a + b);

                    TextView sum = findViewById(R.id.cart_order_sum_val), subTotal = findViewById(R.id.cart_order_subtotal_val);
                    sum.setText("$" + String.valueOf(sumTotal));
                    subTotal.setText("$" + String.valueOf(sumTotal));

                    // Set adapter with the fetched data
                    productsAdapter = new ProductsAdapter(limittedProductList, onProductCardClickListener);
                    cartItemsRecyclerVIew.setAdapter(productsAdapter);
                } else {
                    System.out.println("API_ERROR - " + "Response error: ");
                }
            }
            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                System.out.println("API_ERROR - " + "Failure: " + t.getMessage());
            }
        });

        //data binding for products
        cartItemsRecyclerVIew = findViewById(R.id.cart_items_recycler_item);
        LinearLayoutManager linearLayoutManagerProducts = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        this.cartItemsRecyclerVIew.setLayoutManager(linearLayoutManagerProducts);
        ProductsAdapter productsAdapter1 = new ProductsAdapter(this.limittedProductList, onProductCardClickListener);

        Button placeOrderButton = findViewById(R.id.cart_place_order_button);
        String finalUserId = userId;
        placeOrderButton.setOnClickListener(item -> {
            createOrder(finalUserId, productList);
        });
    }

    @Override //implementing interface abstract methods
    public void onProductCardClick(Product product) {
        System.out.println(product);
        Intent intent = new Intent(ProductCartActivity.this, ProductInfoActivity.class);
        intent.putExtra("pid", String.valueOf(product.getId()));
        intent.putExtra("ptitle", product.getTitle());
        intent.putExtra("pprice", String.valueOf(product.getPrice()));
        intent.putExtra("pdescription", product.getDescription());
        intent.putExtra("pcategory", product.getCategory());
        intent.putExtra("pimage", product.getImage());
        intent.putExtra("prating", String.valueOf(product.getRatingValue()));
        startActivity(intent);
    }

    public void createOrder(String userId, List<Product> products){
//        RegisterUserRequest request = new RegisterUserRequest(firstName, lastName, userName, email, userPassword, userPassword, address, contact);
        CreateCartRequest request = new CreateCartRequest(userId, products.stream().map(item -> item.getId()).collect(Collectors.toList()), 0, "address-testing");

        System.out.println("create request order body");
        System.out.println(request);
        apiService.createOrder(request).enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                System.out.println("create border response");
                System.out.println(response);
                if (response.isSuccessful()) {
                    Toast.makeText(ProductCartActivity.this, "Order placed successfully", Toast.LENGTH_SHORT).show();
                    System.out.println(response.body());
                } else {
                    Toast.makeText(ProductCartActivity.this, "failed", Toast.LENGTH_SHORT).show();
                }
                Intent intent = new Intent(ProductCartActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                Toast.makeText(ProductCartActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        // Get SharedPreferences
        SharedPreferences sharedPreferences = getSharedPreferences("userCartList1", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        String stringOfCart = sharedPreferences.getString("userCartItems", "[]");
        // Store the JSON string in SharedPreferences
        editor.putString("userCartItems", "[]");
        editor.apply();

    }
}