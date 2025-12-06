package com.liveanchor;

import android.os.Bundle;
import android.app.Activity;
import android.widget.TextView;
import android.widget.Button;
import android.widget.LinearLayout;
import android.view.Gravity;
import android.graphics.Color;
import android.view.View;
import android.widget.Toast;
import android.content.Intent;

public class MainActivity extends Activity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Create a simple layout programmatically to avoid XML issues
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setGravity(Gravity.CENTER);
        layout.setBackgroundColor(Color.parseColor("#2C3E50"));
        
        // Title text
        TextView titleText = new TextView(this);
        titleText.setText("🎥 YY直播主播端");
        titleText.setTextSize(24);
        titleText.setTextColor(Color.WHITE);
        titleText.setGravity(Gravity.CENTER);
        titleText.setPadding(0, 50, 0, 30);
        
        // Subtitle text
        TextView subtitleText = new TextView(this);
        subtitleText.setText("专业直播，精彩不断");
        subtitleText.setTextSize(16);
        subtitleText.setTextColor(Color.parseColor("#ECF0F1"));
        subtitleText.setGravity(Gravity.CENTER);
        subtitleText.setPadding(0, 0, 0, 50);
        
        // Status text
        TextView statusText = new TextView(this);
        statusText.setText("✅ 应用已成功启动\n🚀 准备开始直播");
        statusText.setTextSize(14);
        statusText.setTextColor(Color.parseColor("#2ECC71"));
        statusText.setGravity(Gravity.CENTER);
        statusText.setPadding(50, 30, 50, 30);
        statusText.setBackgroundColor(Color.parseColor("#34495E"));
        
        // Feature button
        Button featureButton = new Button(this);
        featureButton.setText("📱 开始直播功能");
        featureButton.setTextColor(Color.WHITE);
        featureButton.setBackgroundColor(Color.parseColor("#3498DB"));
        featureButton.setPadding(50, 20, 50, 20);
        featureButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "直播功能正在开发中...", Toast.LENGTH_SHORT).show();
            }
        });
        
        // Add views to layout
        layout.addView(titleText);
        layout.addView(subtitleText);
        layout.addView(statusText);
        layout.addView(featureButton);
        
        // Set the content view
        setContentView(layout);
        
        // Show welcome message
        Toast.makeText(this, "YY直播主播端已启动", Toast.LENGTH_SHORT).show();
    }
    
    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }
}