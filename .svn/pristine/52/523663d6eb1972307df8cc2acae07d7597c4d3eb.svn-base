package com.zzx.test.stockmore.action;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zzx.pojo.SysStar;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.test.stockmore.service.SysStockMoreService;

/**
 * @author 郑志欣
 * @date 2017年8月15日
 * 
 */
@Controller
public class SysStockMoreController {
	@Autowired
	private SysStockMoreService more;
	
	
	/**
	 * 首页刷新
	 */
	@RequestMapping("/stock/more")
	public void more(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		String id=request.getParameter("id");
		//首页信息加载
		SysStar star=more.getStar(id);
		result.getData().put("star", star);
		
		JsonUtil.output(response, result);
	}
	
}
