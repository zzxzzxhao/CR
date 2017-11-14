package com.zzx.backFunc.sysuser.control.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zzx.backFunc.sysuser.control.dao.SysUserDao;
import com.zzx.backFunc.sysuser.control.service.SysUserService;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.pojo.SysUser;
import com.zzx.sys.control.ConstDefine.PeopleState;
import com.zzx.sys.control.PropsUtil;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;
/**
 * 系统用户服务接口实现
 * @author zzxin9
 *
 */
public class SysUserServiceImpl implements SysUserService {
	private SysUserDao sysUserDao;

	public void setSysUserDao(SysUserDao sysUserDao) {
		this.sysUserDao = sysUserDao;
	}
	
	/**
	 * 用户登录，成功返回用户对象，否则返回空
	 * @author zzxin9
	 */
	public Map<String, Object> login(String userid, String password)
			throws MyException {
		Map<String, Object> map = new HashMap<String, Object>();
		String result = "";
		SysUser sysuser = sysUserDao.getSysUserById(userid);
		if(sysuser!=null){
			if (sysuser.getPeopleState() == PeopleState.FREEZING) {
				result = "您的账号已锁定，请联系管理员";
				map.put("result", result);
				return map;
			}else if (sysuser.getDisable() == PeopleState.DISABLE) {
				result = "您的账号已禁用，请联系管理员";
				map.put("result", result);
				return map;
			}
			if(!sysuser.getPassword().equals(password)){
				int errCount = sysuser.getPasswordErrCount();
				sysuser.setPasswordErrCount(errCount+1);
				String passwordErrCount = PropsUtil.getProperty("passwordErrCount").trim();
				if((errCount+1)>Integer.valueOf(passwordErrCount)){
					sysuser.setPeopleState(PeopleState.FREEZING);
					updateSysUser(sysuser);
					result = "密码错误次数已超过上限，账号已被锁定，请联系管理员";
					map.put("result", result);
					return map;
				}
				updateSysUser(sysuser);
				result = "用户名或密码不正确";
				map.put("result", result);
				return map;
			}else{
				List<SysRole> role_list=sysUserDao.querySysRoleListByUserId(userid);
				if(role_list!=null&&role_list.size()>0){
					sysuser.setPeopleState(PeopleState.ENABLE);
					sysuser.setPasswordErrCount(Integer.valueOf("0"));
					updateSysUser(sysuser);
					sysuser.setRole_list(role_list);
					map.put("result", result);
					map.put("sysuser", sysuser);
				}else{
					result = "此用户没有被分配角色，不允许登陆，请联系管理员分配角色";
					map.put("result", result);
					return map;
				}
			}
		}
		return map;
	}
	
	@Override
	public void updateSysUser(SysUser sysUser)  throws MyException{
		try{
			sysUserDao.updateSysUser(sysUser);
		}catch(Exception e){
			System.out.println(e);
			throw new MyException("更新用户信息异常");
		}
	}
	
	public SysMenu getSysMenuTree(String userid){
		List<SysMenu> menu_list=sysUserDao.getMenuByUserId(userid);
		Map<String, SysMenu> map=new HashMap<String, SysMenu>();
		for(SysMenu sysMenu:menu_list){
			getParentMenu(sysMenu, map);
		}
		return map.get(SysMenu.rootMunuId);
	}
	
	private void getParentMenu(SysMenu sysMenu,Map<String, SysMenu> map){
		SysMenu parentMenu=map.get(sysMenu.getParentid());
		if(parentMenu==null){//父菜单不存在
			if(sysMenu.getParentid()!=null&&!"".equals(sysMenu.getParentid())&&!"null".equals(sysMenu.getParentid())){
				parentMenu=sysUserDao.getMenuById(sysMenu.getParentid());
				if(parentMenu==null) 
					return;
			}else{//顶级菜单
				/*parentMenu=new SysMenu();
				parentMenu.setMenuid(SysMenu.rootMunuId);*/
				return;
			}
			map.put(sysMenu.getParentid(), parentMenu);
			parentMenu.addChildMenu(sysMenu);
			if(parentMenu.getParentid()!=null&&!"".equals(parentMenu.getParentid())&&!"null".equals(parentMenu.getParentid()))
				getParentMenu(parentMenu, map);
		}else{
			parentMenu.addChildMenu(sysMenu);
		}
	}
	
	@Override
	public PojoDomain<SysUser> querySysUserList(int page_number, int page_size,String[] roleids,String keyword) {
		List<SysUser> user_list=sysUserDao.querySysUserList((page_number-1)*page_size, page_size,roleids,keyword);
		PojoDomain<SysUser> sysUserDomain  = new PojoDomain<SysUser>();
		for(SysUser sysUser:user_list){
			sysUser.setRole_list(sysUserDao.querySysRoleListByUserId(sysUser.getUserid()));
		}
		sysUserDomain.setPojolist(user_list);
		int totle=sysUserDao.countSysUser(roleids,keyword);
		sysUserDomain.setPage_number(page_number);
		sysUserDomain.setPage_size(page_size);
		sysUserDomain.setTotal_count(totle);
		return sysUserDomain;
	}
	
	public SysUser getSysUserById(String userId){
		return sysUserDao.getSysUserById(userId);
	}
	
	@Override
	public void saveSysUser(String adminId,SysUser sysUser, String[] roleids) throws MyException{
		try{
			sysUserDao.saveSysUser(sysUser);
			sysUserDao.deleteSysRolesByUserId(sysUser.getUserid());
			if(roleids!=null&&roleids.length>0){
				for(String roleid:roleids)
					sysUserDao.saveSysRoleByUserId(sysUser.getUserid(), roleid);
			}
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("新增用户信息异常");
			}
		}

	}
	
	@Override
	public void updateSysUser(String adminId, SysUser sysUser, String[] roleids) throws MyException {
		try{
			sysUserDao.updateSysUser(sysUser);
			sysUserDao.deleteSysRolesByUserId(sysUser.getUserid());
			if(roleids!=null&&roleids.length>0){
				for(String roleid:roleids)
					sysUserDao.saveSysRoleByUserId(sysUser.getUserid(), roleid);
			}
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("更新用户信息异常");
			}
		}

	}
	
	@Override
	public List<SysRole> querySysRoleList() {
		return sysUserDao.querySysRoleList();
	}
	
	@Override
	public void deleteUserByUserId(String userId)  throws MyException{
		try{
			sysUserDao.deleteSysRolesByUserId(userId);
			sysUserDao.deleteUserByUserId(userId);
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}else{
				throw new MyException("删除角色异常");
			}
		}
	}
}
