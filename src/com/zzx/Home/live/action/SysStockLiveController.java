package com.zzx.Home.live.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Home.live.service.SysStockLiveService;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;


/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Controller
public class SysStockLiveController {
	@Autowired
	private SysStockLiveService index;
	
	/**
	 * 首页刷新
	 */
	@RequestMapping("/live/date")
	public void getdate(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		
		//首页信息加载
		List<SysStockLive> list=index.getList();
		result.getData().put("List", list);
		
		JsonUtil.output(response, result);
	}
}
