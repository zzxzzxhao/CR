package com.zzx.backFunc.sysuser.control.service;

import java.util.List;
import java.util.Map;

import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.pojo.SysUser;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
 * 系统用户服务接口
 * @author zzxin9
 *
 */
public interface SysUserService {
	public SysMenu getSysMenuTree(String userId);
	
	public Map<String, Object> login(String userid,String password) throws MyException;
	
	public void updateSysUser(SysUser sysUser)   throws MyException;

	public PojoDomain<SysUser> querySysUserList(int page_number,int page_size,String[] roleids,String keyword);

	public SysUser getSysUserById(String userId);
	
	public void saveSysUser(String adminId,SysUser sysUser,String[] roleids) throws MyException;

	public void updateSysUser(String adminId,SysUser sysUser,String[] roleids) throws MyException;

	public List<SysRole> querySysRoleList();
	
	/**
	 * @author zzxin9
	 * @param userId  用户ID
	 * 根据用户ID物理删除用户
	 */
	public void deleteUserByUserId(String userId)  throws MyException;
}
