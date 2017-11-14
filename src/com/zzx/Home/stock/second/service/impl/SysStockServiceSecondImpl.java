package com.zzx.Home.stock.second.service.impl;

import java.io.IOException;
import java.io.InputStream;
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

import com.zzx.Home.stock.second.dao.SysStockSecondDao;
import com.zzx.Home.stock.second.service.SysStockSecondService;
import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.util.HttpUtils;

/**
* @author 郑志欣
* @date 2017年8月30日
*/
@Service
public class SysStockServiceSecondImpl implements SysStockSecondService {
	@Autowired
	private SysStockSecondDao stockdao;
	
	@Override
	public List<SysStaff> queryStaffDate() {
		return this.stockdao.getstaff();
	}
	
	@Override
	public List<SysStaff> queryStaffAll() {
		return this.stockdao.getstaffall();
	}
	
	@Override
	public List<SysStaff> queryStaffNow() {
		return this.stockdao.getstaffnow();
	}

	@Override
	public void setStockDate(SysStaff staff) throws IOException {
		HttpResponse response=null;
		HttpEntity entity=null;
		String staffid=staff.getStaffid();
		List<SysStock> stocklist=stockdao.getStock(staffid);
		List<Float> allprofit=new ArrayList<Float>();
		List<Float> nowprofit=new ArrayList<Float>();
		List<Float> allcost=new ArrayList<Float>();
		float all = 0;
		float now = 0;
		float costA = 0;
		float allrate = 0;
		float nowrate = 0;
		for (int i = 0; i < stocklist.size(); i++) {
			String buyPrice=stocklist.get(i).getBuyPrice();
			String code=stocklist.get(i).getCode();
			String stocknum=stocklist.get(i).getStocknum();
			float cost=Float.parseFloat(buyPrice);
			float snum=Float.parseFloat(stocknum);
			
			//调用股票信息api
//			String host="http://stock.market.alicloudapi.com";
//			String path="/real-stockinfo";
			String host="https://ali-stock.showapi.com";//自己接口测试
			String path="/batch-real-stockinfo";//测试
			String method="GET";
			String appcode="d6f93b694fdb4709b68f9e94ec893a94";
			
			Map<String,String> headers=new HashMap<String, String>();
			headers.put("Authorization", "APPCODE "+appcode);
			Map<String, String>querys=new HashMap<String,String>();
			querys.put("stocks", code);
			
			try {
				response=HttpUtils.doGet(host, path, method, headers, querys);
				entity=response.getEntity();
				
				if(entity !=null) {
					String result=EntityUtils.toString(entity,"UTF-8");
					JSONObject jsonObject=new JSONObject(result);
					JSONObject body=jsonObject.getJSONObject("showapi_res_body");
					JSONArray list=body.getJSONArray("list");
					JSONObject content=list.getJSONObject(0);
					
					String nowPrice=content.getString("nowPrice");
					String openPrice=content.getString("openPrice");
					
					float b=Float.parseFloat(nowPrice.trim());
					float c=b-cost;
					float test=c*snum;//总收益
					allprofit.add(test);
					
					float testcost=cost*snum;//成本
					allcost.add(testcost);
					
					float open=Float.parseFloat(openPrice.trim());
					float dis=b-open;
					float asd=dis*snum;//今日收益
					nowprofit.add(asd);
				}
				}catch (Exception e) {
					e.printStackTrace();
				}finally {
					EntityUtils.consume(entity);
				}
			}
		for (int j = 0; j < allprofit.size(); j++) {
			all=all+allprofit.get(j);
		}
		for (int i = 0; i < nowprofit.size(); i++) {
			now=now+nowprofit.get(i);
		}
		for (int i = 0; i < allcost.size(); i++) {
			costA=costA+allcost.get(i);
		}
		
		allrate=all/costA;
		nowrate=now/costA;
		
		DecimalFormat df=new DecimalFormat("0.00%");
		String allpre=df.format(allrate);
		String nowpre=df.format(nowrate);
		stockdao.setStockForStaff(allpre,nowpre,staffid);
	}
	
}
