package com.zzx.backFunc.sysuser.role.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import com.zzx.backFunc.sysuser.role.dao.SysRoleDao;
import com.zzx.backFunc.sysuser.role.service.SysRoleService;
import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.SIDCreator;

public class SysRoleServiceImpl implements SysRoleService {
	private SysRoleDao sysRoleDao;
	
	public void setSysRoleDao(SysRoleDao sysRoleDao) {
		this.sysRoleDao = sysRoleDao;
	}

	@Override
	public List<SysRole> querySysRoleList() {
		return sysRoleDao.querySysRoleList();
	}

	@Override
	public void updateSysRole(SysRole sysRole,String creator) throws MyException{
		try{
			sysRoleDao.updateSysRole(sysRole);
			
		}catch(Exception e){
			throw new MyException("更新角色异常");
		}
	}
	
	@Override
	public void saveSysRole(SysRole sysRole,String creator) throws MyException{
		try{
			String roleName = sysRole.getRolename();
			if(roleName==null||"".equals(roleName)){
				throw new MyException("角色名称不能为空");
			}
			Integer count = sysRoleDao.getSysRoleByRoleName(roleName.trim());
			if(count!=null&&count>0){
				throw new MyException("此角色已经存在");
			}
			String roleid = SIDCreator.getRandomSid();
			sysRoleDao.saveSysRole(roleid,sysRole.getRolename(), sysRole.getDisable(), creator);
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("新增角色异常");
			}
		}
	}
	
	@Override
	public PojoDomain<SysRole> querySysRoleList(int page_number, int page_size) {
		List<SysRole> role_list=sysRoleDao.querySysRoleListByPage((page_number-1)*page_size, page_size);
		PojoDomain<SysRole> sysRoleDomain  = new PojoDomain<SysRole>();
		sysRoleDomain.setPojolist(role_list);
		int totle=sysRoleDao.countSysRole();
		sysRoleDomain.setPage_number(page_number);
		sysRoleDomain.setPage_size(page_size);
		sysRoleDomain.setTotal_count(totle);
		return sysRoleDomain;
	}
	
	@Override
	public void deleteRoleByRoleId(String roleId) throws MyException{
		try{
			int count = sysRoleDao.countSysUser(new String[]{roleId}, null);
			if(count>0){
				throw new MyException("此角色正在被使用，请先解除操作员与此角色的绑定");
			}
			//sysUserDao.deleteUserRoleByRoleId(roleId);
			sysRoleDao.deleteSysFuncByRoleId(roleId);
			sysRoleDao.deleteRoleByRoleId(roleId);
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("删除角色异常");
			}
		}
	}
	
	@Override
	public SysMenu getSysFuncTree(String userId,String roleid){
		List<String> roleid_check=sysRoleDao.getSysFuncIdListByRoleIds(new String[]{roleid});
		List<SysFunc> sysfunc_list=sysRoleDao.getSysFuncListByUserId(userId);
		Map<String, SysMenu> map=new TreeMap<String, SysMenu>();
		for(SysFunc sysFunc:sysfunc_list){
			SysMenu sysMenu=map.get(sysFunc.getMenuid());
			if(sysMenu==null){
				sysMenu=new SysMenu();
				sysMenu.setMenuid(sysFunc.getMenuid());
				sysMenu.setMenuitem(sysFunc.getMenuitem());
				sysMenu.setParentid(sysFunc.getParentid());
				map.put(sysMenu.getMenuid(), sysMenu);
			}
			if(roleid_check.contains(sysFunc.getFuncid()))
				sysFunc.setIsset(1);
			sysMenu.addOper(sysFunc);
		}
		Map<String, SysMenu> tree_map=new HashMap<String, SysMenu>();
		Set<Entry<String, SysMenu>> set=map.entrySet();
		for(Entry<String, SysMenu> entry:set){
			getParentMenu(entry.getValue(), tree_map);
		}
		return tree_map.get(SysMenu.rootMunuId);
	}
	
	
	private void getParentMenu(SysMenu sysMenu,Map<String, SysMenu> map){
		SysMenu parentMenu=map.get(sysMenu.getParentid());
		if(parentMenu==null){//父菜单不存在
			if(sysMenu.getParentid()!=null&&!"".equals(sysMenu.getParentid())&&!"null".equals(sysMenu.getParentid())){
				parentMenu=sysRoleDao.getMenuById(sysMenu.getParentid());
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
	public void saveSysFuncByRoleId(String userId,String roleId,List<String> funcIds) throws MyException{
		try{
			sysRoleDao.deleteSysFuncByRoleId(roleId);
			for(String funcId:funcIds){
				sysRoleDao.saveSysFuncByRoleId(roleId, funcId);
			}
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("给角色分配权限异常");
			}
		}
	}
}
