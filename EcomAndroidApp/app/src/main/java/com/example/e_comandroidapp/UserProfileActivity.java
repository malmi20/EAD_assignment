package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.e_comandroidapp.adapters.CategoriesAdapter;
import com.example.e_comandroidapp.adapters.OrderHistoryAdapter;
import com.example.e_comandroidapp.adapters.ProductsAdapter;
import com.example.e_comandroidapp.dto.UserInfoResponse;
import com.example.e_comandroidapp.models.Category;
import com.example.e_comandroidapp.models.OrderHistory;
import com.example.e_comandroidapp.services.ApiClient;
import com.example.e_comandroidapp.services.ApiService;
import com.example.e_comandroidapp.sqlLite.DatabaseHelper;
import com.example.e_comandroidapp.sqlLite.UserDatabaseManager;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserProfileActivity extends AppCompatActivity {

    ApiService apiService = ApiClient.getClient().create(ApiService.class);
    UserDatabaseManager userManager;

    private List<OrderHistory> orderHistoryList = new ArrayList<>();
    private RecyclerView orderHistoryRecyclerView;
    private OrderHistoryAdapter orderHistoryAdapter;

    UserInfoResponse loggedUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_profile);

        //bottom navigation bar handling
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setSelectedItemId(R.id.Profile_bottom);

        bottomNavigationView.setOnItemSelectedListener(item -> {
            if(R.id.home_bottom == item.getItemId()){
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
                return true;
            } else if (R.id.cart_bottom == item.getItemId()) {
                startActivity(new Intent(getApplicationContext(), ProductCartActivity.class));
                finish();
                return true;
            } else if (R.id.Profile_bottom == item.getItemId()) {
                return true;
            }
            return false;
        });

        userManager = new UserDatabaseManager(this);
        userManager.open();
        String userId = "";

        // navigate to sign in activity if there is no valid user session
        Cursor cursor = userManager.getAllUsers();
        if (cursor.moveToFirst()) {
            do {
                userId = cursor.getString(cursor.getColumnIndex(DatabaseHelper.COLUMN_ACCESS_TOKEN));
            } while (cursor.moveToNext());
        }

        // Call the API to user info
        Call<UserInfoResponse> call = apiService.fetchUserinfoById(userId);
        call.enqueue(new Callback<UserInfoResponse>() {
            @Override
            public void onResponse(Call<UserInfoResponse> call, Response<UserInfoResponse> response) {
                System.out.println("response userinfo get ++++++++++");
                System.out.println(response.body().toString());
                if (response.isSuccessful()) {
                    loggedUser = response.body();
                    Log.d("RAW_RESPONSE", response.body().toString());
                    TextView userInfoFnBanner = findViewById(R.id.user_profile_fn);
                    TextView userInfoLnBanner = findViewById(R.id.user_profile_ln);
                    TextView userInfoFn = findViewById(R.id.user_profile_fn_val);
                    TextView userInfoLn = findViewById(R.id.user_profile_ln_val);
                    TextView userInfoEmail = findViewById(R.id.user_profile_email_val);
                    TextView userInfoContact = findViewById(R.id.user_profile_contact_val);
                    TextView userInfoAddress = findViewById(R.id.user_profile_address_val);

                    // populate the data of the selected product
                    userInfoFn.setText(loggedUser.getFirstName());
                    userInfoLn.setText(loggedUser.getLastName());
                    userInfoFnBanner.setText(loggedUser.getFirstName());
                    userInfoLnBanner.setText(loggedUser.getLastName());
                    userInfoEmail.setText(loggedUser.getEmail());
                    userInfoContact.setText(loggedUser.getContact());
                    userInfoAddress.setText(loggedUser.getAddress());

//                    categoryList = response.body();

                    // Set adapter with the fetched data
//                    adapter = new CategoriesAdapter(categoryList, onTextViewClickListener);
//                    categoriesHorizontalview.setAdapter(adapter);
                } else {
                    System.out.println("API_ERROR - " + "Response error: ");
                }
            }

            @Override
            public void onFailure(Call<UserInfoResponse> call, Throwable t) {
                System.out.println("API_ERROR - " + "Failure: " + t.getMessage());
            }
        });

        // Retrieve the data from the Intent
//        TextView userInfoFn = findViewById(R.id.user_profile_fn_val);
//        TextView userInfoLn = findViewById(R.id.user_profile_ln_val);
//        TextView userInfoEmail = findViewById(R.id.user_profile_email_val);
//        TextView userInfoContact = findViewById(R.id.user_profile_contact_val);
//        TextView userInfoAddress = findViewById(R.id.user_profile_address_val);
//
//        // populate the data of the selected product
//        userInfoFn.setText(loggedUser.getFirstName());
//        userInfoLn.setText(loggedUser.getLastName());
//        userInfoEmail.setText(loggedUser.getEmail());
//        userInfoContact.setText(loggedUser.getContact());
//        userInfoAddress.setText(loggedUser.getAddress());


        //logout button binding
        Button logoutButton = findViewById(R.id.log_out_button);

        logoutButton.setOnClickListener(item -> {
            Intent intent = new Intent(UserProfileActivity.this, SignInActivity.class);
            startActivity(intent);
        });

        //mock data for order history
        this.orderHistoryList.add(new OrderHistory("2024-01-01", 34, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-02", 35, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-03", 36, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-04", 37, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-05", 38, "Approved"));
        this.orderHistoryList.add(new OrderHistory("2024-01-06", 39, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-07", 30, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-08", 44, "Pending"));
        this.orderHistoryList.add(new OrderHistory("2024-01-09", 45, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-10", 46, "Delivered"));
        this.orderHistoryList.add(new OrderHistory("2024-01-11", 47, "Rejected"));
        this.orderHistoryList.add(new OrderHistory("2024-01-12", 48, "Delivered"));

        //data binding for order history
        orderHistoryRecyclerView = findViewById(R.id.order_history_recycler_view);
        LinearLayoutManager linearLayoutManagerOrderHistory = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        this.orderHistoryRecyclerView.setLayoutManager(linearLayoutManagerOrderHistory);
        orderHistoryAdapter = new OrderHistoryAdapter(this.orderHistoryList);
        this.orderHistoryRecyclerView.setAdapter(orderHistoryAdapter);
    }
}

