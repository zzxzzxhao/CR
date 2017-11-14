package com.zzx.backFunc.live.message.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.backFunc.live.message.service.SysStockLiveMessageService;
import com.zzx.pojo.SysStock;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Controller
public class SysStockLiveMessageController {
	@Autowired
	private SysStockLiveMessageService message;
	
	/**
	 * 保存直播内容
	 */
	@RequestMapping("/live/save")
	public void getdate(HttpServletRequest request, HttpServletResponse response){
		Result result=new Result();
		String content=request.getParameter("content");
		int state = Integer.parseInt(request.getParameter("liveState"));
		try {
			//红色置顶取消，变为蓝色消息
			if(state==1) {
				String id=message.getStateId(state);
				message.setStateBlue(id,state);
			}
			
			message.saveMessage(content,state);
			result.setCode(0);
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 直播内容列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/live/list")
	public void getLiveDate(HttpServletRequest request,
			HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		String keyword = request.getParameter("keyword");
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		PojoDomain<SysStockLive> pojoDomain = message.querySysStockLiveList(page_number,page_size,keyword);
		
		result.getData().put("live_list", pojoDomain.getPojolist());
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());
		JsonUtil.output(response, result);
		
	}
	
	/**
	 * 删除
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/live/delete")
	public void delete(HttpServletRequest request,HttpServletResponse response) throws Exception {
		Result result = new Result();
		String id = request.getParameter("id");
		String[] ids=id.split(",");
		try{
			for (int i = 0; i < ids.length; i++) {
				if(ids[i]!=null) {
					message.delete(ids[i]);
				}else {
					result.setCode(1);
					result.setMessage("选择的内容为空！");
				}
			}
		}catch(Exception e){
			result.setCode(-2);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
		JsonUtil.outputJson(response, result);
	}
}
