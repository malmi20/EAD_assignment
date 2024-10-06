package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import com.example.e_comandroidapp.adapters.OrderHistoryAdapter;
import com.example.e_comandroidapp.adapters.ProductsAdapter;
import com.example.e_comandroidapp.models.OrderHistory;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;

public class UserProfileActivity extends AppCompatActivity {

    private List<OrderHistory> orderHistoryList = new ArrayList<>();
    private RecyclerView orderHistoryRecyclerView;
    private OrderHistoryAdapter orderHistoryAdapter;

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

