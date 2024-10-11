package com.example.e_comandroidapp.applicationState;


import android.app.Application;

public class AplicationState extends Application {

    private String globalVariable;

    @Override
    public void onCreate() {
        super.onCreate();
        // Initialization of global state
        globalVariable = "Initial custom Value";
    }

    public String getGlobalVariable() {
        return globalVariable;
    }

    public void setGlobalVariable(String globalVariable) {
        this.globalVariable = globalVariable;
    }
}
