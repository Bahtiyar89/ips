package com.sarv; // Replace it with your app-name

import android.os.BatteryManager;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BatteryModule extends ReactContextBaseJavaModule {
  
  private final ReactApplicationContext reactContext;

  public BatteryModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "BatteryModule";
  }

  @ReactMethod
  public void getBatteryLevel(Promise promise) {
    try {
      Intent batteryIntent = this.reactContext.registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
      int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
      int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
      float batteryLevel = level / (float)scale;
      promise.resolve(batteryLevel);
    } catch (Exception e) {
      promise.reject("Battery Level Error", e.getMessage());
    }
  }
}