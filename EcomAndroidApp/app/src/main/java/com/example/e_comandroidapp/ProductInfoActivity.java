package com.example.e_comandroidapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
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

        productInfoTitle.setText(intent.getStringExtra("ptitle"));
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

        dialog = new BottomSheetDialog(this);
        show = findViewById(R.id.add_feedbacks_button);
        createDialog();

        show.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.show();
            }
        });
    }

    public void createDialog(){
        View view = getLayoutInflater().inflate(R.layout.add_comment_bottom_sheet, null, false);
        dialog.setContentView(view);
    }
}