package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;

import com.example.e_comandroidapp.dto.LoginResponse;
import com.example.e_comandroidapp.services.ApiClient;
import  com.example.e_comandroidapp.services.ApiService;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import retrofit2.Callback;
import retrofit2.Call;
import retrofit2.Response;

import com.example.e_comandroidapp.dto.LoginRequest;
import com.example.e_comandroidapp.sqlLite.DatabaseHelper;
import com.example.e_comandroidapp.sqlLite.UserDatabaseManager;

import java.util.Objects;

public class SignInActivity extends AppCompatActivity {

    private ApiService apiService = ApiClient.getClient().create(ApiService.class);
    private UserDatabaseManager userManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        userManager = new UserDatabaseManager(this);
        userManager.open();
        userManager.signOut();

        // navigate to main activity if there is an active user session
        Cursor cursor = userManager.getAllUsers();
        if (cursor.moveToFirst()) {
            do {
                String username = cursor.getString(cursor.getColumnIndex(DatabaseHelper.COLUMN_USERNAME));
                String token = cursor.getString(cursor.getColumnIndex(DatabaseHelper.COLUMN_ACCESS_TOKEN));
                System.out.println("db userrrrrrrrrrrnmae " + username + "..." + token);
                if(!Objects.equals(username, "none") && !Objects.equals(token, "none")){
                    Intent intent = new Intent(SignInActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            } while (cursor.moveToNext());
        }else{
            Intent intent = new Intent(SignInActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        }

        //signup button binding
        TextView signupButton = findViewById(R.id.sign_up_link);
        EditText etUsername = findViewById(R.id.signin_username);
        EditText etPassword = findViewById(R.id.signin_password);
        Button btnSignIn = findViewById(R.id.sign_in_button);

        signupButton.setOnClickListener(item -> {
            Intent intent = new Intent(SignInActivity.this, SignUpActivity.class);
            startActivity(intent);
        });

        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Read the values from the input fields
                String username = etUsername.getText().toString();
                String password = etPassword.getText().toString();

                if (!username.isEmpty() && !password.isEmpty()) {
                    // Make POST request in the background
                    loginUser(username, password);
//                    new SignInTask().execute(username, password);
                } else {
                    Toast.makeText(SignInActivity.this, "Please enter both username and password", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    //make request to sign-in user
    private void loginUser(String username, String password) {
        LoginRequest request = new LoginRequest(username, password);
        System.out.println("login req ++++++++++++++ ");
        System.out.println(request);
        apiService.login(request).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                System.out.println("response login ++++++++++");
                System.out.println(response);
                if (response.isSuccessful()) {
                    Toast.makeText(SignInActivity.this, "Sign-in successful", Toast.LENGTH_SHORT).show();
                    System.out.println("gbbbbbbbbbbb\t"+response.body().getFullName());
//                    userManager.addUserSession(response.body().getUsername(), response.body().getAccessToken());
                    userManager.updateFirstRecord(response.body().getFullName(), response.body().getToken());
                    Intent intent = new Intent(SignInActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } else {
                    Toast.makeText(SignInActivity.this, "Sign-in failed", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Toast.makeText(SignInActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    protected void onDestroy() {
        userManager.close();
        super.onDestroy();
    }
}