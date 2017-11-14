package com.zzx.backFunc.sysuser.menu.service;

import java.util.List;

import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

public interface SysMenuService {
	/**
	 * 物理删除菜单
	 * @param menuid
	 */
	public  void deleteSystem(String menuid)  throws MyException;
	
	/**
	 * 查询顶级菜单
	 * @return
	 */
	public List<SysMenu> findTopMenu();
	
	/**
	 * 查询菜单列表
	 * @param menu
	 * @param page_number
	 * @param page_size
	 * @return
	 */
	public PojoDomain<SysMenu> querySysMenuList(SysMenu menu, int page_number, int page_size);

	/**
	 * 更新菜单
	 * @param menu
	 */
	public void updateMenu(SysMenu menu) throws MyException;
	
	/**
	 * 保存菜单信息
	 * @param menu
	 */
	public void saveMenu(SysMenu menu) throws MyException;
	
	/**
	 * 查询功能列表
	 * @param menu
	 * @param page_number
	 * @param page_size
	 * @return
	 */
	public PojoDomain<SysFunc> querySysFucList(SysFunc menu, int page_number, int page_size);
	
	/**
	 * 更新功能信息
	 * @param menu
	 */
	public void updateFunc(SysFunc func) throws MyException;
	
	/**
	 * 保存功能信息
	 * @param menu
	 */
	public int saveFunc(SysFunc menu,boolean flag) throws MyException;
	
	/**
	 * 物理删除菜单
	 * @param menuid
	 */
	public  void deleteSystemFunc(String urlid,String funcid) throws MyException;
	
	/**
	 * 查询所属菜单
	 * @return
	 */
	public List<SysMenu> findTopFunc();
	
	/**
	 * 查询操作类型
	 * @return
	 */
	public List<SysMenu> findOprType();
}
