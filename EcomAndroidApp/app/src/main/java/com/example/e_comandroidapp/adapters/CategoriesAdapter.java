package com.example.e_comandroidapp.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.e_comandroidapp.R;
import com.example.e_comandroidapp.events.OnTextViewClickListener;
import com.example.e_comandroidapp.models.Category;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class CategoriesAdapter extends RecyclerView.Adapter<CategoriesAdapter.MyViewHolder>{
    List<String> categories;

    private OnTextViewClickListener listener;

    public CategoriesAdapter(List<String> list, OnTextViewClickListener listener){
        this.categories = list;
        this.listener = listener;
    }

    @NonNull
    @Override
    public CategoriesAdapter.MyViewHolder onCreateViewHolder(@NotNull ViewGroup parent, int viewType){
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.category_card, null);
        CategoriesAdapter.MyViewHolder viewHolder = new CategoriesAdapter.MyViewHolder(view);
        return viewHolder;
    }

    public void onBindViewHolder (CategoriesAdapter.MyViewHolder holder, int position){
        String item = categories.get(position);
        holder.names.setText(categories.get(position));
        holder.bind(categories.get(position), listener);
    }

    @Override
    public int getItemCount(){return categories.size();}

    class MyViewHolder extends  RecyclerView.ViewHolder{
        TextView names, textViewId;
        public MyViewHolder(@NonNull View itemView){
            super(itemView);
            names = itemView.findViewById(R.id.category_card_name);
            textViewId = itemView.findViewById(R.id.category_card_name);

        }

        // Bind data to views and set click listeners
        public void bind(final String data, final OnTextViewClickListener listener) {
            textViewId.setText(data);
//            textViewName.setText("Name: " + data.getName());

            // Set click listeners for each TextView
            textViewId.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // Pass the clicked text to the listener
                    listener.onTextViewClick(textViewId.getText().toString());
                }
            });
        }
    }
}