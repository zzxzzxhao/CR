package com.zzx.test.stock.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.pojo.SysStock;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.test.stock.service.SysStockTestService;

/**
 * 股票控制中心
 * @author 郑志欣
 *
 */
@Controller
public class SysStockTestController {
	@Autowired
	private SysStockTestService stockservice;
	
	@RequestMapping("/stock/date")
	public void getStockDate(HttpServletRequest request,
			HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		PojoDomain<SysStock> pojoDomain = stockservice.querySysStockList();
		
		result.getData().put("systest_list", pojoDomain.getPojolist());
		JsonUtil.output(response, result);
		
	}
}
