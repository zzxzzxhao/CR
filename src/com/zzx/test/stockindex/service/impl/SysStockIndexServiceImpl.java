package com.zzx.test.stockindex.service.impl;

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
import com.zzx.sys.control.util.HttpUtils;
import com.zzx.test.stockindex.dao.SysStockIndexDao;
import com.zzx.test.stockindex.service.SysStockIndexService;

@Service
public class SysStockIndexServiceImpl implements SysStockIndexService{
	@Autowired
	private SysStockIndexDao index;
	
	@Override
	public List<SysStock> getList() {
		String host="http://stock.market.alicloudapi.com";
		String path="/batch-real-stockinfo";
		String method="GET";
		String appcode="b2a6b16f2ffe411facef8c56f29bc479";
		
		Map<String,String> headers=new HashMap<String, String>();
		headers.put("Authorization", "APPCODE "+appcode);
		Map<String, String>querys=new HashMap<String,String>();
		querys.put("needIndex", "0");
		querys.put("stocks", "sh603636,sh600570,sz300567,sz002001,sh603768,sz000779");
		
		float[] cash= {(float) 10.93,(float) 44.27,(float) 71.48,(float) 20.32,(float) 22.08,(float) 13.9};//成本价设置
		List<SysStock> list=new ArrayList<SysStock>();
		list=index.getList();
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
					float b=Float.parseFloat(nowPrice.trim());
					float c=b-cash[i];
					float test=c/cash[i];
					DecimalFormat df=new DecimalFormat("0.00%");
					String rate=df.format(test);
					
//					list.get(i).setRate(rate);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	public void savenum(String num,String code) {
		this.index.savenum(num,code);
	}

}
