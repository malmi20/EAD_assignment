package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.e_comandroidapp.dto.LoginRequest;
import com.example.e_comandroidapp.dto.LoginResponse;
import com.example.e_comandroidapp.dto.RegisterUserRequest;
import com.example.e_comandroidapp.dto.RegisterUserResponse;
import com.example.e_comandroidapp.services.ApiClient;
import com.example.e_comandroidapp.services.ApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends AppCompatActivity {

    private ApiService apiService = ApiClient.getClient().create(ApiService.class);


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        //signin button binding
        TextView x = findViewById(R.id.sign_in_link);
        x.setOnClickListener(it -> {
            Intent intent = new Intent(SignUpActivity.this, SignInActivity.class);
            startActivity(intent);
        });

        EditText etFirstname = findViewById(R.id.signup_user_fn);
        EditText etLastName = findViewById(R.id.signup_user_ln);
        EditText etUserName = findViewById(R.id.signup_username);
        EditText etEmail = findViewById(R.id.signup_email);
        EditText etAddress = findViewById(R.id.signup_address);
        EditText etContact = findViewById(R.id.signup_contact);
        Button btnSignUp = findViewById(R.id.sign_up_action_button);

        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Read the values from the input fields
                String firstName = etFirstname.getText().toString();
                String lastName = etLastName.getText().toString();
                String userName = etUserName.getText().toString();
                String userPassword = "randomPassword";
                String email = etEmail.getText().toString();
                String address = etAddress.getText().toString();
                String contact = etContact.getText().toString();

                if (!firstName.isEmpty() && !lastName.isEmpty() && !userName.isEmpty() && !userPassword.isEmpty()  && !email.isEmpty() && !address.isEmpty() && !contact.isEmpty()) {
                    // Make POST request in the background
                    registerUser(firstName, lastName, userName, userPassword, email, address, contact);
//                    new SignInTask().execute(username, password);
                } else {
                    Toast.makeText(SignUpActivity.this, "Please enter the necessary information", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private void registerUser(String firstName, String lastName, String userName, String userPassword, String email, String address, String contact){
        RegisterUserRequest request = new RegisterUserRequest(firstName, lastName, 34);
        apiService.signUp(request).enqueue(new Callback<RegisterUserResponse>() {
            @Override
            public void onResponse(Call<RegisterUserResponse> call, Response<RegisterUserResponse> response) {
                System.out.println(response.body());
                if (response.isSuccessful()) {
                    Toast.makeText(SignUpActivity.this, "Sign-up successful", Toast.LENGTH_SHORT).show();
                    System.out.println(response.body());
                    System.out.println("gbbbbbbbbbbb\t"+response.body().getFirstName()+"\t"+response.body().getLastName());
//                    Intent intent = new Intent(SignUpActivity.this, MainActivity.class);
//                    startActivity(intent);
//                    finish();
                } else {
                    Toast.makeText(SignUpActivity.this, "Sign-up failed", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<RegisterUserResponse> call, Throwable t) {
                Toast.makeText(SignUpActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

}