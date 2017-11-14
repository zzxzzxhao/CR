package com.zzx.backFunc.sysuser.menu.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.backFunc.sysuser.menu.service.SysMenuService;
import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysUrl;
import com.zzx.sys.control.ConstDefine.MenuState;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.SIDCreator;

/**
 * 菜单控制层
 * @author zzxin9
 *
 */
@Controller
public class SysMenuController {
	@Autowired
	private SysMenuService menuService;
	
	@RequestMapping("/sysMenu/list")
	public void listFunc(HttpServletRequest request, HttpServletResponse response){
		String page_number_str = request.getParameter("page_number");
		String page_size_str = request.getParameter("page_size");
		String menuitem = request.getParameter("menuitem");
		String url = request.getParameter("url");
		int page_number = 1;
		int page_size = 10;

		if (page_number_str != null) {
			page_number = Integer.parseInt(page_number_str);
		}

		if (page_size_str != null) { 
			page_size = Integer.parseInt(page_size_str);
		}
		
		SysMenu menu = new SysMenu();
		menu.setMenuitem(menuitem);
		menu.setUrl(url);
		
		PojoDomain<SysMenu> pojoDomain = menuService.querySysMenuList(menu, page_number, page_size);
		
		//返回结果
		PaginationResult result = new PaginationResult();
		
		result.getData().put("menuList", pojoDomain.getPojolist());
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());

		JsonUtil.output(response, result);
		
	}
	
	@RequestMapping("/sysMenu/saveMenu")
	public void saveMenu(String menuid, String parentid, String menuitem, String url, Integer sort, HttpServletRequest request, HttpServletResponse response){
		Result result = new Result();
		try{
			SysMenu menu = new SysMenu();
			if(menuid != null&&!"".equals(menuid)){
				menu.setMenuid(menuid);
				menu.setMenuitem(menuitem);
				menu.setParentid(parentid);
				menu.setUrl(url);
				menu.setSort(sort);
				menuService.updateMenu(menu);
			}else{
				menu.setMenuitem(menuitem);
				menu.setParentid(parentid);
				menu.setUrl(url);
				if(sort == null){
					sort = 0;
				}
				menu.setSort(sort);
				menu.setState(MenuState.ENABLE);
				menuService.saveMenu(menu);
			}
			
			result.getData().put("menu", menu);
			JsonUtil.output(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
		
	}
	
	@RequestMapping("/sysMenu/delMenu")
	public void deleteMenuById( HttpServletRequest request, HttpServletResponse response){
		Result result = new Result();
		String menuId=request.getParameter("id");
		String[] menuids=menuId.split(",");
		try {
			for(int i=0;i<menuids.length;i++){
				if(menuids[i]!=null){
				this.menuService.deleteSystem(menuids[i]);
			} else {
				result.setCode(1);
				result.setMessage("该菜单不存在！");
			}}
		} catch (Exception e) {
			result.setCode(-2);
			result.setMessage(e.getMessage());
		}
		JsonUtil.outputJson(response, result);
	}
	
	@RequestMapping("/sysMenu/findTopMenu")
	public void findTopMenu( HttpServletRequest request, HttpServletResponse response){
		Result result = new Result();
		List<SysMenu> list = this.menuService.findTopMenu();
		result.getData().put("topMenuList", list);
		JsonUtil.output(response, result);
	}
	
	@RequestMapping("/sysMenu/listFunc")
	public void menuList(HttpServletRequest request, HttpServletResponse response){
		String page_number_str = request.getParameter("page_number");
		String page_size_str = request.getParameter("page_size");
		String menuitem = request.getParameter("menuitem");
		String url = request.getParameter("url");
		String funandmenu = request.getParameter("funandmenu");
		int page_number = 1;
		int page_size = 10;

		if (page_number_str != null) {
			page_number = Integer.parseInt(page_number_str);
		}

		if (page_size_str != null) { 
			page_size = Integer.parseInt(page_size_str);
		}
		
		SysFunc menu = new SysFunc();
		menu.setMenuitem(menuitem);
		menu.setUrl(url);
		menu.setName(funandmenu);
		
		PojoDomain<SysFunc> pojoDomain = menuService.querySysFucList(menu, page_number, page_size);
		
		//返回结果
		PaginationResult result = new PaginationResult();
		
		result.getData().put("menuList", pojoDomain.getPojolist());
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());

		JsonUtil.output(response, result);
		
	}
	
	@RequestMapping("/sysMenu/saveFunc")
	public void saveFunc(String funcid,String selectmenuid,int oprId,String funName,String url, HttpServletRequest request, HttpServletResponse response,String parentid, String oprname){
		Result result = new Result();
		try{
			if(selectmenuid == null || selectmenuid.equals("")){
				result.setCode(-1);
				result.setMessage("请选择所属菜单！");
				JsonUtil.output(response, result);
				return;
			}else if(oprId == 0){
				result.setCode(-2);
				result.setMessage("请选择操作类型！");
				JsonUtil.output(response, result);
				return;
			}
			//  更新/保存
			if(funcid != null&&!"".equals(funcid)){
				SysFunc func = new SysFunc();
				SysUrl sysUrl = new SysUrl();
				sysUrl.setUrl(url);
				sysUrl.setName(funName);
				func.setSysUrl(sysUrl);
				
				SysMenu sysMenu = new SysMenu();
				sysMenu.setMenuid(selectmenuid);
				func.setFuncid(funcid);
				func.setSysMenu(sysMenu);
				func.setOperid(oprId);
				menuService.updateFunc(func);
			}else{
				SysFunc func = new SysFunc();
				SysUrl sysUrl = new SysUrl();
				sysUrl.setId(SIDCreator.getRandomSid());
				sysUrl.setUrl(url);
				sysUrl.setName(funName);
				func.setSysUrl(sysUrl);
				
				SysMenu sysMenu = new SysMenu();
				sysMenu.setMenuid(selectmenuid);
				func.setFuncid(SIDCreator.getRandomSid());
				func.setSysMenu(sysMenu);
				func.setOperid(oprId);
				
				menuService.saveFunc(func, true);
			}
			result.setCode(0);
			JsonUtil.output(response, result);
		}catch(Exception e){
			result.setCode(1);
			String msg = e.getMessage();
			result.setMessage(msg);
			JsonUtil.output(response, result);
		}
	}
	
	@RequestMapping("/sysMenu/delFunc")
	public void delFunc( HttpServletRequest request, HttpServletResponse response){
		//获取前台传来的id和funcid参数数组
		Result result = new Result();
		String[] Id = request.getParameterValues("id[]");
		String[] Funcid=request.getParameterValues("funcid[]");
		try {
			if (Id!= null && Id.length!=0) {
				for(int i=0;i<Id.length;i++){
				this.menuService.deleteSystemFunc(Id[i],Funcid[i]);
				}
				} else {
				result.setCode(1);
				result.setMessage("该菜单不存在！");
			}
		} catch (Exception e) {
			result.setCode(-2);
			result.setMessage(e.getMessage());
		}
		JsonUtil.outputJson(response, result);
	}
	
	@RequestMapping("/sysMenu/findTopFunc")
	public void findTopFunc( HttpServletRequest request, HttpServletResponse response){
		Result result = new Result();
		List<SysMenu> list = this.menuService.findTopFunc();
		result.getData().put("topFuncList", list);
		JsonUtil.output(response, result);
	}
	
	@RequestMapping("/sysMenu/findOprType")
	public void findOprType( HttpServletRequest request, HttpServletResponse response){
		Result result = new Result();
		List<SysMenu> list = this.menuService.findOprType();
		result.getData().put("topFuncList", list);
		JsonUtil.output(response, result);
	}
}
