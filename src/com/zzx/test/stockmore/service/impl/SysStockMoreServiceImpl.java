package com.zzx.test.stockmore.service.impl;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import com.google.gson.JsonObject;
import com.zzx.pojo.SysStar;
import com.zzx.sys.control.util.HttpUtils;
import com.zzx.test.stockmore.dao.SysStockMoreDao;
import com.zzx.test.stockmore.service.SysStockMoreService;

/**
* @author 郑志欣
* @date 2017年8月15日
*/
@Service
public class SysStockMoreServiceImpl implements SysStockMoreService{
	@Autowired
	private SysStockMoreDao more;
	
	@Override
	public SysStar getStar(String id) {
		SysStar star=more.getStar(id);
		String code=star.getCode().toString();
		float cost=Float.parseFloat(star.getCost().toString());
		
		String host="http://stock.market.alicloudapi.com";
		String path="/real-stockinfo";
		String method="GET";
		String appcode="b2a6b16f2ffe411facef8c56f29bc479";
		
		Map<String,String> headers=new HashMap<String, String>();
		headers.put("Authorization", "APPCODE "+appcode);
		Map<String, String>querys=new HashMap<String,String>();
		querys.put("code", code);
		
		try {
			HttpResponse response=HttpUtils.doGet(host, path, method, headers, querys);
			HttpEntity entity=response.getEntity();
			
			if(entity !=null) {
				String result=EntityUtils.toString(entity,"UTF-8");
				JSONObject jsonObject=new JSONObject(result);
				JSONObject body=jsonObject.getJSONObject("showapi_res_body");
				
				JSONObject content=body.getJSONObject("stockMarket");
				
				String nowPrice=content.getString("nowPrice");
				String name=content.getString("name");
				Date date=star.getDate();
				Date dotime=star.getDotime();
				
				SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
				
				star.setTime(formatter.format(date));
				star.setDodatetime(formatter.format(dotime));
				float b=Float.parseFloat(nowPrice.trim());
				float c=b-cost;
				float test=c/cost;
				DecimalFormat df=new DecimalFormat("0.00%");
				String rate=df.format(test);
					
				star.setNowPrice(nowPrice);
				star.setRate(rate);
				star.setName(name);
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
		return star;
	}

}
