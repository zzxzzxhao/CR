package com.zzx.backFunc.sysuser.role.service;

import java.util.List;

import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
 * 角色管理接口
 * @author zzxin9
 *
 */
public interface SysRoleService {

	public List<SysRole> querySysRoleList();
	
	public PojoDomain<SysRole> querySysRoleList(int page_number,int page_size);
	
	public void updateSysRole(SysRole sysRole,String creator) throws MyException;
	
	public void saveSysRole(SysRole sysRole,String creator) throws MyException;
	
	/**
	 * 根据roleId来删除角色
	 * @param roleId
	 * @return 
	 */
	public void deleteRoleByRoleId(String roleId)  throws MyException;
	
	public SysMenu getSysFuncTree(String userId,String roleid);
	
	public void saveSysFuncByRoleId(String userId,String roleId,List<String> funcIds) throws MyException;
	
}
