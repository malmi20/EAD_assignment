package com.example.e_comandroidapp;
//android:src="@tools:sample/avatars"
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;

import com.example.e_comandroidapp.adapters.ProductsAdapter;
import com.example.e_comandroidapp.applicationState.AplicationState;
import com.example.e_comandroidapp.events.OnProductCardClickListener;
import com.example.e_comandroidapp.events.OnTextViewClickListener;
import com.example.e_comandroidapp.models.Category;
import com.example.e_comandroidapp.models.Product;
import com.example.e_comandroidapp.services.ApiClient;
import com.example.e_comandroidapp.services.ApiService;
import com.example.e_comandroidapp.adapters.CategoriesAdapter;
import com.example.e_comandroidapp.sqlLite.DatabaseHelper;
import com.example.e_comandroidapp.sqlLite.UserDatabaseManager;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

//  bootstrapping point of the application/activity
public class MainActivity extends AppCompatActivity implements OnTextViewClickListener, OnProductCardClickListener {

    ApiService apiService = ApiClient.getClient().create(ApiService.class);
    RecyclerView categoriesHorizontalview, productsVerticalView;
    List<Category> categoryList = new ArrayList<>();
    List<Product> productList = new ArrayList<>();
    CategoriesAdapter adapter;
    ProductsAdapter productsAdapter;
    OnTextViewClickListener onTextViewClickListener = this;
    OnProductCardClickListener onProductCardClickListener = this;
    AplicationState globalState;

    UserDatabaseManager userManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        globalState = (AplicationState) getApplicationContext();

        userManager = new UserDatabaseManager(this);
        userManager.open();

        // navigate to sign in activity if there is no valid user session
        Cursor cursor = userManager.getAllUsers();
        if (cursor.moveToFirst()) {
            do {
                String username = cursor.getString(cursor.getColumnIndex(DatabaseHelper.COLUMN_USERNAME));
                String token = cursor.getString(cursor.getColumnIndex(DatabaseHelper.COLUMN_ACCESS_TOKEN));
                System.out.println("db userrrrrrrrrrrnmae main activity " + username + "..." + token);
                if(Objects.equals(username, "none") && Objects.equals(token, "none")){
                    System.out.println("to be navigate into login");
                    Intent intent = new Intent(MainActivity.this, SignInActivity.class);
                    startActivity(intent);
                    finish();
                }
            } while (cursor.moveToNext());
        }else{
            Intent intent = new Intent(MainActivity.this, SignInActivity.class);
            startActivity(intent);
            finish();
        }

        //bottom navigation bar handling
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setSelectedItemId(R.id.home_bottom);

        bottomNavigationView.setOnItemSelectedListener(item -> {
            if(R.id.home_bottom == item.getItemId()){
                return true;
            } else if (R.id.cart_bottom == item.getItemId()) {
                startActivity(new Intent(getApplicationContext(), ProductCartActivity.class));
                finish();
                return true;
            } else if (R.id.Profile_bottom == item.getItemId()) {
                startActivity(new Intent(getApplicationContext(), UserProfileActivity.class));
                finish();
                return true;
            }
            return false;
        });

        // Call the API to get categories
        Call<List<Category>> call = apiService.fetchCategories();
        call.enqueue(new Callback<List<Category>>() {
            @Override
            public void onResponse(Call<List<Category>> call, Response<List<Category>> response) {
                System.out.println("response category get ++++++++++");
                System.out.println(response.body());
                if (response.isSuccessful()) {
                    Log.d("RAW_RESPONSE", response.body().toString());
                    categoryList = response.body();

                    // Set adapter with the fetched data
                    adapter = new CategoriesAdapter(categoryList, onTextViewClickListener);
                    categoriesHorizontalview.setAdapter(adapter);
                } else {
                    System.out.println("API_ERROR - " + "Response error: ");
                }
            }

            @Override
            public void onFailure(Call<List<Category>> call, Throwable t) {
                System.out.println("API_ERROR - " + "Failure: " + t.getMessage());
            }
        });

        // Call the API to get products
        Call<List<Product>> call_getProducts = apiService.fetchProducts();
        call_getProducts.enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                System.out.println("response product get ++++++++++");
                System.out.println(response.body());
                if (response.isSuccessful()) {
                    Log.d("RAW_RESPONSE", response.body().toString());
                    productList = response.body();

                    // Set adapter with the fetched data
                    productsAdapter = new ProductsAdapter(productList, onProductCardClickListener);
                    productsVerticalView.setAdapter(productsAdapter);
                } else {
                    System.out.println("API_ERROR - " + "Response error: ");
                }
            }

            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                System.out.println("API_ERROR - " + "Failure: " + t.getMessage());
            }
        });

        //data binding - for categories
        categoriesHorizontalview = findViewById(R.id.categories_recycler_view);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.HORIZONTAL, false);
        this.categoriesHorizontalview.setLayoutManager(linearLayoutManager);
        CategoriesAdapter categoriesAdapter = new CategoriesAdapter(this.categoryList, onTextViewClickListener);
        this.categoriesHorizontalview.setAdapter(categoriesAdapter);

        //data binding for products
        productsVerticalView = findViewById(R.id.products_recycler_view);
        LinearLayoutManager linearLayoutManagerProducts = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        this.productsVerticalView.setLayoutManager(linearLayoutManagerProducts);
        ProductsAdapter productsAdapter1 = new ProductsAdapter(this.productList, onProductCardClickListener);
        this.productsVerticalView.setAdapter(productsAdapter1);
    }

    @Override //implementing interface abstract methods
    public void onTextViewClick(String textViewValue) {
        System.out.println(textViewValue);
        // Handle TextView click, e.g., make an API call with the clicked value
        fetchProductsWithCategoryName(textViewValue);
    }

    @Override //implementing interface abstract methods
    public void onProductCardClick(Product product) {
        System.out.println(product);
        Intent intent = new Intent(MainActivity.this, ProductInfoActivity.class);
        intent.putExtra("pid", String.valueOf(product.getId()));
        intent.putExtra("pname", product.getName());
        intent.putExtra("ptitle", product.getTitle());
        intent.putExtra("pprice", String.valueOf(product.getPrice()));
        intent.putExtra("pdescription", product.getDescription());
        intent.putExtra("pcategory", product.getCategory());
        intent.putExtra("pimage", product.getImage());
        intent.putExtra("prating", String.valueOf(product.getRatingValue()));
        startActivity(intent);
    }

    //  filter products by category name
    public void fetchProductsWithCategoryName(String categoryName){
        Call<List<Product>> call_getProducts = apiService.fetchProductsByCategory(categoryName);
        call_getProducts.enqueue(new Callback<List<Product>>() {
            @Override
            public void onResponse(Call<List<Product>> call, Response<List<Product>> response) {
                if (response.isSuccessful()) {
                    Log.d("RAW_RESPONSE", response.body().toString());
                    productList.clear();
                    productList = response.body();
                    productsAdapter.notifyDataSetChanged();

                    // Set adapter with the fetched data
                    productsAdapter = new ProductsAdapter(productList, onProductCardClickListener);
                    productsVerticalView.setAdapter(productsAdapter);
                } else {
                    System.out.println("API_ERROR - " + "Response error: ");
                }
            }

            //  excuted when the network request got failed
            @Override
            public void onFailure(Call<List<Product>> call, Throwable t) {
                System.out.println("API_ERROR - " + "Failure: " + t.getMessage());
            }
        });
    }

    @Override
    protected void onDestroy() {
        userManager.close();
        super.onDestroy();
    }
}