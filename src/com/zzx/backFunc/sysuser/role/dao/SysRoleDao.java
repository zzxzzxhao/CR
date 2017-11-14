package com.zzx.backFunc.sysuser.role.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
/**
 * 角色dao层
 * @author zzxin9
 *
 */
public interface SysRoleDao {

	public List<SysRole> querySysRoleList();
	
	public List<SysRole> querySysRoleListByPage(@Param("start_number")int start_number,@Param("page_size")int page_size);

	public int countSysRole();
	
	public void updateSysRole(SysRole sysRole);
	
	public Integer getSysRoleByRoleName(@Param("rolename")String rolename);
	
	public void saveSysRole(@Param("roleid")String roleid,@Param("rolename")String rolename,@Param("disable")int disable,@Param("creator")String creator);

	public int countSysUser(@Param("roleids")String[] roleids,@Param("keyword")String keyword);

	public void deleteSysFuncByRoleId(@Param("roleId")String roleId);
	
	/**
	 * 根据roleId来删除角色
	 * @param roleId
	 */
	public void deleteRoleByRoleId(@Param("roleId")String roleId);
	
	public List<String> getSysFuncIdListByRoleIds(@Param("roleids")String[] roleids);
	
	public List<SysFunc> getSysFuncListByUserId(@Param("userId")String userId);
	
	public SysMenu getMenuById(@Param("menuId")String menuId);
	
	public void saveSysFuncByRoleId(@Param("roleId")String roleId,@Param("funcId")String funcId);
	
	
}

