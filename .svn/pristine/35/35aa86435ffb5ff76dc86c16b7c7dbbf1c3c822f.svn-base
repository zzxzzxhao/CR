package com.zzx.backFunc.sysuser.menu.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.sysuser.menu.dao.SysMenuDao;
import com.zzx.backFunc.sysuser.menu.service.SysMenuService;
import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.SIDCreator;

@Service
public class SysMenuServiceImpl implements SysMenuService {
	@Autowired
	private SysMenuDao menuDao;

	@Override
	public List<SysMenu> findTopMenu() {
		
		return this.menuDao.findTopMenu();
	}
	

	@Override
	public void deleteSystem(String menuid) throws MyException{
		try{
			int count = menuDao.countAllChildrenMenu(menuid);
			if(count>0){
				throw new MyException("此菜单存在子菜单,请先删除子菜单");
			}
			count = menuDao.countAllFunsByMenuid(menuid);
			if(count>0){
				throw new MyException("此菜单存在子功能项,请先删除子功能项");
			}
			menuDao.deleteMenu(menuid);
		}catch(Exception e){
			if(e instanceof MyException){
				throw e;
			}else{
				throw new MyException("删除菜单异常");
			}
		}

	}
	
	@Override
	public PojoDomain<SysMenu> querySysMenuList(SysMenu menu, int page_number,
			int page_size) {
		PojoDomain<SysMenu> sysMenuPages = new PojoDomain<SysMenu>();
		String menuid = "";
		if (null != menu.getMenuid()) {
			menuid = menu.getMenuid().toString();
		}
		List<SysMenu> list = menuDao.querySysMentList(menuid,menu.getMenuitem(), menu.getUrl(), (page_number-1)*page_size, page_size);
		sysMenuPages.setPojolist(list);
		int count = menuDao.countAll(menu.getMenuid(), menu.getMenuitem(),menu.getUrl());
		sysMenuPages.setPage_number(page_number);
		sysMenuPages.setPage_size(page_size);
		sysMenuPages.setTotal_count(count);

		return sysMenuPages;
	}

	@Override
	public void saveMenu(SysMenu menu) throws MyException {
		try {
			String sid = SIDCreator.getRandomSid();
			menu.setMenuid(sid);
			String menuitem = menu.getMenuitem();
			if (menuitem == null || "".equals(menuitem)) {
				throw new MyException("菜单名称不能为空");
			}
			int count = this.menuDao.getMenuCountByMenuitem(menuitem.trim());
			if (count > 0) {
				throw new MyException("此菜单项已经存在");
			}
			this.menuDao.saveMenu(menu);
		} catch (Exception e) {
			if (e instanceof MyException) {
				throw e;
			} else {
				throw new MyException("新增菜单异常");
			}
		}
	}
	
	@Override
	public void updateMenu(SysMenu menu)  throws MyException{
		try{
			this.menuDao.updateMenu(menu);
		}catch(Exception e){
			if(e instanceof MyException){
				throw e;
			}else{
				throw new MyException("更新菜单异常");
			}
		}
	}
	
	@Override
	public PojoDomain<SysFunc> querySysFucList(SysFunc menu, int page_number,
			int page_size) {
		PojoDomain<SysFunc> sysMenuPages = new PojoDomain<SysFunc>();
		String menuid = "";
		if(null != menu.getId()){
			menuid = menu.getId().toString();
		}
		List<SysFunc> list = menuDao.querySysFuncList(menuid, menu.getMenuitem(), menu.getUrl(),menu.getName(), (page_number - 1) * page_size, page_size);
		sysMenuPages.setPojolist(list);
		int count = menuDao.countAllFunc(menu.getId(), menu.getMenuitem(), menu.getUrl(),menu.getName());
		sysMenuPages.setPage_number(page_number);
		sysMenuPages.setPage_size(page_size);
		sysMenuPages.setTotal_count(count);
		
		
		return sysMenuPages;
	}
	
	@Override
	public void updateFunc(SysFunc func) throws MyException {
		try{
			List<SysFunc> list = this.menuDao.querySysFuncList2(func.getFuncid());
			if(list!=null&&list.size()>0){
				SysFunc temp = list.get(0);
				func.getSysUrl().setId(temp.getId());
				this.menuDao.updateFunc(func);
				this.menuDao.updateSys_url(func);
			}else{
				throw new MyException("没有找到相关的功能模块");
			}
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}else{
				throw new MyException("更新功能异常");
			}
		}
	}
	
	@Override
	public int saveFunc(SysFunc func,boolean flag) throws MyException{
		int result = 0;
		try{
			List<SysFunc> querySysFuncByUrl = null;
			if(flag){
				querySysFuncByUrl = menuDao.querySysFuncByUrl(func.getSysUrl().getUrl());
			}
			if(querySysFuncByUrl != null && querySysFuncByUrl.size()>0){
				throw new MyException("该功能已经存在，不能重复插入");
			}else{
				this.menuDao.saveSys_url(func);
				this.menuDao.saveSys_func(func);
				this.menuDao.saveSys_func_url(func);
			}
		}catch(Exception e){
			System.out.println(e);
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("新增功能异常");
			}
		}
		return result;
	}
	
	
	@Override
	public void deleteSystemFunc(String urlid,String funcid) throws MyException{
		try{
			int count = menuDao.countFromSys_role_funcByFuncid(funcid);
			if(count>0){
				throw new MyException("此功能被赋予给了某角色，请先与角色解除绑定后再删除");
			}
			menuDao.deleteSys_func_url(funcid);
			menuDao.deleteSys_url(urlid);
			menuDao.deleteSys_funcById(funcid);
			menuDao.deleteSys_role_func(funcid);
		}catch(Exception e){
			if(e instanceof MyException){
				throw e;
			}else{
				throw new MyException("删除功能失败");
			}
		}
	}
	
	@Override
	public List<SysMenu> findTopFunc() {
		return this.menuDao.findTopFunc();
	}
	
	@Override
	public List<SysMenu> findOprType() {
		return this.menuDao.findOprType();
	}
}
