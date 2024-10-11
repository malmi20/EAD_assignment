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
import com.example.e_comandroidapp.models.OrderHistory;
import com.example.e_comandroidapp.models.Product;
import com.squareup.picasso.Picasso;

import org.jetbrains.annotations.NotNull;

import java.util.List;


public class OrderHistoryAdapter extends RecyclerView.Adapter<OrderHistoryAdapter.MyViewHolder> {
    List<OrderHistory> orderHistoryList;

    public OrderHistoryAdapter(List<OrderHistory> list){this.orderHistoryList = list;}

    // defining the view holder for a single component
    @NonNull
    @Override
    public OrderHistoryAdapter.MyViewHolder onCreateViewHolder(@NotNull ViewGroup parent, int viewType){
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.order_history_card, null);
        OrderHistoryAdapter.MyViewHolder viewHolder = new OrderHistoryAdapter.MyViewHolder(view);
        return viewHolder;
    }

    // bind th data to view holder
    public void onBindViewHolder (OrderHistoryAdapter.MyViewHolder holder, int position){

        holder.itemView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));

        holder.order_dates.setText(orderHistoryList.get(position).getDate());
        holder.order_sub_totals.setText(String.valueOf("$"+orderHistoryList.get(position).getSubTotal()));
        holder.order_states.setText(orderHistoryList.get(position).getOrderState());
    }

    // get the number of count of all items
    @Override
    public int getItemCount(){return orderHistoryList.size();}

    class MyViewHolder extends  RecyclerView.ViewHolder{
        TextView order_dates, order_sub_totals, order_states;
        public MyViewHolder(@NonNull View itemView){
            super(itemView);
            order_dates = itemView.findViewById(R.id.order_history_card_date);
            order_sub_totals = itemView.findViewById(R.id.order_history_card_subtotal);
            order_states = itemView.findViewById(R.id.order_history_card_state);
        }
    }
}
