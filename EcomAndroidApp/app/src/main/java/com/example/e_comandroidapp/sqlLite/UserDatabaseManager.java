package com.example.e_comandroidapp.sqlLite;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class UserDatabaseManager {

    private DatabaseHelper dbHelper;
    private SQLiteDatabase database;

    public UserDatabaseManager(Context context) {
        dbHelper = new DatabaseHelper(context);
    }

    public void open() {
        database = dbHelper.getWritableDatabase();
    }

    public void close() {
        dbHelper.close();
    }

    public void addUserSession(String username, String token) {
        ContentValues values = new ContentValues();
        values.put(DatabaseHelper.COLUMN_USERNAME, username);
        values.put(DatabaseHelper.COLUMN_ACCESS_TOKEN, token);
        database.insert(DatabaseHelper.TABLE_NAME, null, values);
    }

    public Cursor getAllUsers() {
        String[] columns = {
                DatabaseHelper.COLUMN_ID,
                DatabaseHelper.COLUMN_USERNAME,
                DatabaseHelper.COLUMN_ACCESS_TOKEN
        };
        return database.query(DatabaseHelper.TABLE_NAME, columns, null, null, null, null, null);
    }

    //update username, access token of logged user of first record
    public void updateFirstRecord(String newUsername, String newAccessToken) {

        // Query the first record from the table (sorted by ID or any other criteria)
        String query = "SELECT " + DatabaseHelper.COLUMN_ID + " FROM " + DatabaseHelper.TABLE_NAME +
                " ORDER BY " + DatabaseHelper.COLUMN_ID + " ASC LIMIT 1";

        Cursor cursor = database.rawQuery(query, null);

        if (cursor.moveToFirst()) {
            // Get the ID of the first record
            int firstRecordId = cursor.getInt(cursor.getColumnIndex(DatabaseHelper.COLUMN_ID));

            // Now prepare the new values for the update
            ContentValues values = new ContentValues();
            values.put(DatabaseHelper.COLUMN_USERNAME, newUsername);
            values.put(DatabaseHelper.COLUMN_ACCESS_TOKEN, newAccessToken);

            // Update the first record where ID matches the firstRecordId
            database.update(DatabaseHelper.TABLE_NAME, values, DatabaseHelper.COLUMN_ID + " = ?",
                    new String[]{String.valueOf(firstRecordId)});
        }
        cursor.close();
    }

    //sign out method set th username and access token to 'none'
    public void signOut() {

        // Query the first record from the table (sorted by ID or any other criteria)
        String query = "SELECT " + DatabaseHelper.COLUMN_ID + " FROM " + DatabaseHelper.TABLE_NAME +
                " ORDER BY " + DatabaseHelper.COLUMN_ID + " ASC LIMIT 1";

        Cursor cursor = database.rawQuery(query, null);

        if (cursor.moveToFirst()) {
            // Get the ID of the first record
            int firstRecordId = cursor.getInt(cursor.getColumnIndex(DatabaseHelper.COLUMN_ID));

            // Now prepare the new values for the update
            ContentValues values = new ContentValues();
            values.put(DatabaseHelper.COLUMN_USERNAME, "none");
            values.put(DatabaseHelper.COLUMN_ACCESS_TOKEN, "none");

            // Update the first record where ID matches the firstRecordId
            database.update(DatabaseHelper.TABLE_NAME, values, DatabaseHelper.COLUMN_ID + " = ?",
                    new String[]{String.valueOf(firstRecordId)});
        }
        cursor.close();
    }

}
