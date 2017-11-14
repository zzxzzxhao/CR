package com.zzx.test.stockindex.action;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.test.stockindex.service.SysStockIndexService;

/**
 * 前端页面登陆控制层
 * @author zzxin
 * @version 2017年8月15日
 *
 */
@Controller
public class SysStockIndexController {
	@Autowired
	private SysStockIndexService index;
	
	
	/**
	 * 首页刷新
	 */
	@RequestMapping("/stock/index")
	public void getusername(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		
		//首页信息加载
		List<SysStock> list=index.getList();
		result.getData().put("List", list);
		
		JsonUtil.output(response, result);
	}
	
	/**
	 * 保存点赞数
	 */
	@RequestMapping("/stock/savenum")
	public void savenum(HttpServletRequest request, HttpServletResponse response){
		String num=request.getParameter("num");
		String code=request.getParameter("code");
		index.savenum(num,code);
	}
}
