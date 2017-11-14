package com.zzx.Home.stock.detail.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Home.stock.detail.service.SysStockDetailService;
import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;

/**
* @author 郑志欣
* @date 2017年9月1日
*/
@Controller
public class SysStockDetailController {
	@Autowired
	private SysStockDetailService sdservice;
	
	@RequestMapping("/detail/list")
	public void getDetail(HttpServletRequest request,HttpServletResponse response ) {
		Result result=new Result();
		String staffid=request.getParameter("staffid");
		List<SysStock> list=sdservice.getStockList(staffid);
		result.getData().put("list", list);
		JsonUtil.output(response, result);
	}
	
	@RequestMapping("/detail/staff")
	public void getStaff(HttpServletRequest request,HttpServletResponse response ) {
		Result result=new Result();
		String staffid=request.getParameter("staffid");
		SysStaff staff=sdservice.getStaff(staffid);
		result.getData().put("staff", staff);
		JsonUtil.output(response, result);
	}
	
	@RequestMapping("/detail/savepraise")
	public void savepraise(HttpServletRequest request,HttpServletResponse response) {
		String num=request.getParameter("num");
		String staffid=request.getParameter("staffid");
		sdservice.savePraise(num,staffid);
	}
}
