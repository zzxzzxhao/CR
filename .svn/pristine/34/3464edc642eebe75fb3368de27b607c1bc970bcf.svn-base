package com.zzx.Home.stock.detail.service.impl;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.Home.stock.detail.dao.SysStockDetailDao;
import com.zzx.Home.stock.detail.service.SysStockDetailService;
import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.util.HttpUtils;

/**
* @author 郑志欣
* @date 2017年9月1日
*/
@Service
public class SysStockDetailServiceImpl implements SysStockDetailService {
	@Autowired
	private SysStockDetailDao sdDao;
	
	@Override
	public List<SysStock> getStockList(String staffid) {
		List<SysStock> list=new ArrayList<SysStock>();
		list=sdDao.getStockDate(staffid);
		DecimalFormat df=new DecimalFormat("0.00%");
		for (int i = 0; i < list.size(); i++) {
			String buyPrice=list.get(i).getBuyPrice();
			String code=list.get(i).getCode();
			String stocknum=list.get(i).getStocknum();
			String sellPrice=list.get(i).getSellPrice();
			String buyTime = list.get(i).getBuyTime();
			float buy=Float.parseFloat(buyPrice);
			float sell=Float.parseFloat(sellPrice);
			float num=Float.parseFloat(stocknum);
			Date date = new Date();
			
			float profit=(sell-buy)*num;
			float cost=buy*num;
			String profitpre=df.format(profit);
			
			// 计算持仓天数
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String now = sdf.format(date);

			try {
				list.get(i).setPositionday(daysBetween(buyTime, now));
			} catch (ParseException e1) {
				e1.printStackTrace();
			}
			list.get(i).setProfit(profit);
			list.get(i).setProfitpre(profitpre);
			list.get(i).setCost(cost);
			
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
					list.get(i).setNowPrice(nowPrice);
					}
				}catch (Exception e) {
					e.printStackTrace();
				}
		}
		return list;
	}

	@Override
	public SysStaff getStaff(String staffid) {
		return this.sdDao.getStaff(staffid);
	}
	
	
	public static int daysBetween(String buytime, String now) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(sdf.parse(buytime));
		long time1 = cal.getTimeInMillis();
		cal.setTime(sdf.parse(now));
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);
		return Integer.parseInt(String.valueOf(between_days));
	}

	@Override
	public void savePraise(String num, String staffid) {
		this.sdDao.savePraise(num,staffid);
	}
}
