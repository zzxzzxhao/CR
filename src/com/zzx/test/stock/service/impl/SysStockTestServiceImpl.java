package com.zzx.test.stock.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.pojo.SysStock;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.test.stock.service.SysStockTestService;
import com.zzx.sys.control.util.HttpUtils;

@Service
public class SysStockTestServiceImpl implements SysStockTestService{
	
	@Override
	public PojoDomain<SysStock> querySysStockList() {
		String host="http://stock.market.alicloudapi.com";
		String path="/batch-real-stockinfo";
		String method="GET";
		String appcode="b2a6b16f2ffe411facef8c56f29bc479";
		
		Map<String,String> headers=new HashMap<String, String>();
		headers.put("Authorization", "APPCODE "+appcode);
		Map<String, String>querys=new HashMap<String,String>();
		querys.put("needIndex", "0");
		querys.put("stocks", "sh601006,sh601007,sh601008,sh601009,sz000018,hk00941");
		
		List<SysStock> list = new ArrayList<SysStock>();
		PojoDomain<SysStock> stockDomain=new PojoDomain<SysStock>();
		try {
			HttpResponse response=HttpUtils.doGet(host, path, method, headers, querys);
			HttpEntity entity=response.getEntity();
			
			if(entity !=null) {
				String result=EntityUtils.toString(entity,"UTF-8");
				JSONObject jsonObject=new JSONObject(result);
				JSONObject body=jsonObject.getJSONObject("showapi_res_body");
				
				JSONArray jsArray=body.getJSONArray("list");
				for (int i = 0; i < jsArray.length(); i++) {
					JSONObject jsob=jsArray.getJSONObject(i);
					
					String nowPrice=jsob.getString("nowPrice");
					float a=40;
					float b=Float.parseFloat(nowPrice.trim());
					float c=b-a;
					float test=c/a;
					DecimalFormat df=new DecimalFormat("0.00");
					String rate=df.format(test);
					
					SysStock stock=new SysStock();
//					stock.setRate(rate);
//					stock.setCode(jsob.getString("code"));
//					stock.setDiff_rate(jsob.getString("diff_rate"));
//					stock.setName(jsob.getString("name"));
//					stock.setNowPrice(jsob.getString("nowPrice"));
					
					list.add(stock);
					
					stockDomain.setPojolist(list);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockDomain;
	}
}
