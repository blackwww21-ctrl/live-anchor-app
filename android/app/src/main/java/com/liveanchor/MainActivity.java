package com.liveanchor;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;

public class MainActivity extends Activity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setGravity(Gravity.CENTER);
        layout.setBackgroundColor(Color.parseColor("#2C3E50"));
        
        TextView titleText = new TextView(this);
        titleText.setText("🎥 YY直播主播端");
        titleText.setTextSize(24);
        titleText.setTextColor(Color.WHITE);
        titleText.setGravity(Gravity.CENTER);
        titleText.setPadding(0, 50, 0, 30);
        
        TextView subtitleText = new TextView(this);
        subtitleText.setText("专业直播，精彩不断");
        subtitleText.setTextSize(16);
        subtitleText.setTextColor(Color.parseColor("#ECF0F1"));
        subtitleText.setGravity(Gravity.CENTER);
        subtitleText.setPadding(0, 0, 0, 50);
        
        layout.addView(titleText);
        layout.addView(subtitleText);
        setContentView(layout);
    }
}