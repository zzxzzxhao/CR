package com.zzx.Home.liveask.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Home.live.service.SysStockLiveService;
import com.zzx.Home.liveask.service.SysStockLiveAskService;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.MyException;


/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Controller
public class SysStockLiveAskController {
	@Autowired
	private SysStockLiveAskService index;
	
	/**
	 * 首页刷新
	 */
	@RequestMapping("/ask/date")
	public void getdate(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		
		//首页信息加载
		List<SysStockLive> list=index.getList();
		result.getData().put("List", list);
		
		JsonUtil.output(response, result);
	}
	
	/**
	 * 保存直播内容
	 */
	@RequestMapping("/ask/save")
	public void save(HttpServletRequest request, HttpServletResponse response){
		Result result=new Result();
		String content=request.getParameter("content");
		try {
			index.saveMessage(content);
			result.setCode(0);
			JsonUtil.outputJson(response, result);
		} catch (MyException e) {
			result.setCode(1);
			result.setMessage(e.getMessage());
			e.printStackTrace();
			JsonUtil.outputJson(response, result);
		}
	}
}
