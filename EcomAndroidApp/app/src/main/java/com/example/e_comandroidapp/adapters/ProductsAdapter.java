package com.example.e_comandroidapp.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.example.e_comandroidapp.R;
import com.example.e_comandroidapp.events.OnProductCardClickListener;
import com.example.e_comandroidapp.events.OnTextViewClickListener;
import com.example.e_comandroidapp.models.Product;
import com.squareup.picasso.Picasso;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class ProductsAdapter extends RecyclerView.Adapter<ProductsAdapter.MyViewHolder>{
    List<Product> products;
    private OnProductCardClickListener listener;

    public ProductsAdapter(List<Product> list, OnProductCardClickListener listener){this.products = list; this.listener = listener;}

    // defining the view holder for a single component
    @NonNull
    @Override
    public ProductsAdapter.MyViewHolder onCreateViewHolder(@NotNull ViewGroup parent, int viewType){
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_card, null);
        ProductsAdapter.MyViewHolder viewHolder = new ProductsAdapter.MyViewHolder(view);
        return viewHolder;
    }

    // bind th data to view holder
    public void onBindViewHolder (ProductsAdapter.MyViewHolder holder, int position){

        holder.itemView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));

        String formattedTitle = products.get(position).getTitle();
        if(formattedTitle.length() < 35){
            formattedTitle = formattedTitle + " are available now on stocks";
        }
        if(formattedTitle.length() > 35){
            formattedTitle = formattedTitle.substring(0, 33) + "...";
        }
        holder.prod_names.setText(products.get(position).getName());
        holder.prod_prices.setText("$"+String.valueOf(products.get(position).getPrice()));
        holder.prod_titles.setText(formattedTitle);
        holder.prod_categories.setText(products.get(position).getCategory());
        Picasso.get().load(products.get(position).getImage()).into(holder.prod_images);
        holder.bind(products.get(position),listener);
    }

    // get the number of count of all items
    @Override
    public int getItemCount(){return products.size();}

    class MyViewHolder extends  RecyclerView.ViewHolder{
        TextView prod_names, prod_categories, prod_prices, prod_titles;
        ImageView prod_images;
        ConstraintLayout productCard;
        public MyViewHolder(@NonNull View itemView){
            super(itemView);
            prod_names = itemView.findViewById(R.id.product_name);
            prod_categories = itemView.findViewById(R.id.product_sub_category);
            prod_prices = itemView.findViewById(R.id.product_price);
            prod_titles = itemView.findViewById(R.id.product_title);
            prod_images = itemView.findViewById(R.id.product_image);
            productCard = itemView.findViewById(R.id.product_card_constrained);
        }

        // Bind data to views and set click listeners
        public void bind(final Product data, final OnProductCardClickListener listener) {
            // Set click listeners for each TextView
            productCard.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // Pass the clicked text to the listener
                    listener.onProductCardClick(data);
                }
            });
        }
    }
}
