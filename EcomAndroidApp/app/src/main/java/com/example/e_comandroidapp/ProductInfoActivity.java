package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.bottomsheet.BottomSheetDialog;
import com.squareup.picasso.Picasso;

public class ProductInfoActivity extends AppCompatActivity {

    BottomSheetDialog dialog;
    Button show;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_info);

        Intent intent = getIntent();

        // Retrieve the data from the Intent
        TextView productInfoTitle = findViewById(R.id.product_info_tittle);
        ImageView productInfoImage = findViewById(R.id.product_info_image);
        TextView productInfoTitleMini = findViewById(R.id.product_info_title_mini);
        TextView productInfoPrice = findViewById(R.id.product_info_price);
        TextView productInfoRating = findViewById(R.id.product_info_rating);
        TextView productInfoDescription = findViewById(R.id.product_info_description);

        // populate the data of the selected product
        String productId = intent.getStringExtra("pid");
        productInfoTitle.setText(intent.getStringExtra("pname"));
        Picasso.get().load(intent.getStringExtra("pimage")).into(productInfoImage);
        productInfoTitleMini.setText(intent.getStringExtra("ptitle"));
        productInfoPrice.setText("$" + intent.getStringExtra("pprice"));
        productInfoRating.setText(intent.getStringExtra("prating") + " Rating");
        productInfoDescription.setText(intent.getStringExtra("pdescription"));

        //bottom navigation bar handling
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setSelectedItemId(R.id.home_bottom);

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
                startActivity(new Intent(getApplicationContext(), UserProfileActivity.class));
                finish();
                return true;
            }
            return false;
        });

        // find the bottom sheet by id
        dialog = new BottomSheetDialog(this);
        show = findViewById(R.id.add_feedbacks_button);
        createDialog();

        // set the on click listener to the bottom sheet visible down
        show.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.show();
            }
        });

        //add to cart listener
        Button addToCartButton = findViewById(R.id.product_info_button_addToCart);
        addToCartButton.setOnClickListener(item -> {
            addToCart("userid001", productId);
        });
    }

    // populate the bottom sheet and display it
    public void createDialog(){
        View view = getLayoutInflater().inflate(R.layout.add_comment_bottom_sheet, null, false);
        dialog.setContentView(view);

        // This returns the rating as a float out of 5  from rating bar
        RatingBar ratingBar = view.findViewById(R.id.product_feedback_rating_bar);
        EditText etFeedback = view.findViewById(R.id.vendor_comment_input);

        Button postFeedbackButton = view.findViewById(R.id.vendor_comment_post_btn);
        postFeedbackButton.setOnClickListener(item -> {
            float rating = ratingBar.getRating();
            String commentText = etFeedback.getText().toString();
            postFeedback("", "", commentText, rating);
        });
    }

    //add product to the user cart
    private void addToCart(String userid, String productId){
        System.out.println("adding to cart..\t" + userid + "..\t.." + productId);
    }

    //post a feedback with rating
    private void postFeedback(String userId, String productId, String comment, float rating){
        System.out.println("post feedback... " + userId + " " + productId + " " + comment + " " + rating);
    }
}