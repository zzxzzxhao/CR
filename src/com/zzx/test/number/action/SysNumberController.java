package com.zzx.test.number.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.test.number.service.SysNumberService;


/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Controller
public class SysNumberController {
	@Autowired
	private SysNumberService ns;
	
	/**
	 * 首页刷新
	 */
	@RequestMapping("/num/create")
	public void getdate(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		String name=request.getParameter("name");
		int number=Integer.parseInt(request.getParameter("number"));
		
		try {
			ns.create(name,number);
			result.setCode(0);
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
}
