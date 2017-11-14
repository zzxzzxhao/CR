package com.zzx.Home.stock.second.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Home.stock.second.service.SysStockSecondService;
import com.zzx.pojo.SysStaff;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;

/**
 * 第二版
* @author 郑志欣
* @date 2017年8月30日
*/
@Controller
public class SysStockSecondController {
	@Autowired
	private SysStockSecondService stockservice;

	@RequestMapping("/index/index")
	public void getDate(HttpServletRequest request,HttpServletResponse response) {
		Result result=new Result();
		List<SysStaff> list=stockservice.queryStaffDate();
		for (int i = 0; i < list.size(); i++) {
			try {
				stockservice.setStockDate(list.get(i));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	
		List<SysStaff> allrate=stockservice.queryStaffAll();
		result.getData().put("allrate", allrate);

		List<SysStaff> nowrate=stockservice.queryStaffNow();
		result.getData().put("nowrate", nowrate);
		
		JsonUtil.output(response, result);
	}
	
}
