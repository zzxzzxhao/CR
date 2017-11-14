package com.zzx.backFunc.sysuser.role.action;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.backFunc.sysuser.role.service.SysRoleService;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.pojo.SysUser;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.SysUserHelper;

/**
 * 角色控制层
 * @author zzxin9
 *
 */
@Controller
public class SysRoleController {
	@Autowired
	private SysRoleService sysRoleService = null;
	
	/**
	 * 获取分页角色列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sys/role/listByPage")
	public void getSysRoleListByPage(HttpServletRequest request,
			HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		PojoDomain<SysRole> pojoDomain = sysRoleService.querySysRoleList(
				page_number, page_size);
		result.getData().put("sysrole_list", pojoDomain.getPojolist());
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());
		JsonUtil.output(response, result);
		
	}
	
	/**
	 * 保存/更新角色
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sys/role/save")
	public void saveSysRole(HttpServletRequest request,
			HttpServletResponse response) {
		Result result = new Result();
		try{
			String roleid = request.getParameter("roleid");
			if(roleid!=null&&!"".equals(roleid)){
				SysUser admin = SysUserHelper.getCurrentUserInfo(request);
				SysRole sysRole = new SysRole();
				sysRole.setRoleid(roleid);
				sysRole.setRolename(request.getParameter("rolename"));
				sysRole.setDisable(Integer.parseInt(request.getParameter("disable")));
				sysRoleService.updateSysRole(sysRole, admin.getUserid());
			}else{
				SysUser admin = SysUserHelper.getCurrentUserInfo(request);
				SysRole sysRole = new SysRole();
				sysRole.setRolename(request.getParameter("rolename"));
				sysRole.setDisable(Integer.parseInt(request.getParameter("disable")));
				sysRoleService.saveSysRole(sysRole, admin.getUserid());
			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 物理删除角色
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/sys/user/deleteRoles")
	public void deleteRoleByRolesId(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Result result = new Result();
		try{
			String roleId = request.getParameter("roleid");
			sysRoleService.deleteRoleByRoleId(roleId);
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 获取角色操作列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sys/role/oper/list")
	public void getSysRoleOper(HttpServletRequest request,
			HttpServletResponse response) {
		Result result = new Result();
		SysUser admin = SysUserHelper.getCurrentUserInfo(request);
		String roleid = request.getParameter("roleid");
		SysMenu sysMenu = sysRoleService.getSysFuncTree(admin.getUserid(),roleid);
		result.getData().put("menu_list", sysMenu.getChildMenu());
		JsonUtil.output(response, result);
	}
	
	/**
	 * 保存角色的操作
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/sys/role/oper/save")
	public void saveSysFunc(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Result result = new Result();
		try{
			SysUser admin = SysUserHelper.getCurrentUserInfo(request);
			String roleId = request.getParameter("roleid");
			String[] funcId_str_ary = request.getParameterValues("funcid");
			/*List<Integer> funcIds = new ArrayList<Integer>();
		for (String funcId : funcId_str_ary)
			funcIds.add(Integer.parseInt(funcId));*/
			sysRoleService.saveSysFuncByRoleId(admin.getUserid(), roleId, Arrays.asList(funcId_str_ary));
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
}
