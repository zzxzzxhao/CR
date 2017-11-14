package com.zzx.backFunc.sysuser.control.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.pojo.SysUser;

/**
 * 系统管理Dao
 * @author zzxin9
 *
 */
public interface SysUserDao {
	public SysUser getSysUserById(@Param("userId")String userId);
	
	public List<SysRole> querySysRoleListByUserId(@Param("userId")String userId);
	
	public void updateSysUser(SysUser sysUser);
	
	public List<SysMenu> getMenuByUserId(@Param("userId")String userId);
	
	public SysMenu getMenuById(@Param("menuId")String menuId);
	
	public List<SysUser> querySysUserList(@Param("start_number")int start_number,@Param("page_size")int page_size,
			@Param("roleids")String[] roleids,@Param("keyword")String keyword);

	public int countSysUser(@Param("roleids")String[] roleids,@Param("keyword")String keyword);

	public void saveSysUser(SysUser sysUser);
	
	public void deleteSysRolesByUserId(@Param("userId")String userId);
	
	public void saveSysRoleByUserId(@Param("userId")String userId,@Param("roleId")String roleId);
	
	public List<SysRole> querySysRoleList();
	
	public void deleteUserByUserId(@Param("userId")String userId);
	
}
