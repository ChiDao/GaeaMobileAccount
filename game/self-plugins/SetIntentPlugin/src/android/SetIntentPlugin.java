package com.gaea.cut;

import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;

public class SetIntentPlugin extends CordovaPlugin {
	public static final String TAG = "SetIntentPlugin";
	public static final String ACTION_GET_CARRIER_CODE = "setIntentCode";

	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (ACTION_GET_CARRIER_CODE.equals(action)) {
			RunApp(this.cordova.getActivity(),args.get(0).toString(),args.get(1).toString());
			return true;
		}
		return false;
	}
	
	private void RunApp(Context activity,String packageName,String json) {  
        PackageInfo pi;  
        try {  
        	pi=activity.getPackageManager().getPackageInfo(packageName, 0);
            Intent resolveIntent = new Intent(Intent.ACTION_MAIN, null);  
            // resolveIntent.addCategory(Intent.CATEGORY_LAUNCHER);   
            resolveIntent.setPackage(pi.packageName);  
            PackageManager pManager = activity.getPackageManager();  
            List<ResolveInfo> apps = pManager.queryIntentActivities(  
                    resolveIntent, 0);  
  
            ResolveInfo ri = apps.iterator().next();  
            if (ri != null) {  
                packageName = ri.activityInfo.packageName;  
                String className = ri.activityInfo.name;  
                Intent intent = new Intent(Intent.ACTION_MAIN);  
                intent.putExtra("from", true);
                intent.putExtra("jsonValue", json);
                // intent.addCategory(Intent.CATEGORY_LAUNCHER);   
                ComponentName cn = new ComponentName(packageName, className);  
                intent.setComponent(cn);  
                activity.startActivity(intent);  
            }  
        } catch (NameNotFoundException e) {  
            e.printStackTrace();  
        }  
  
    }  
}