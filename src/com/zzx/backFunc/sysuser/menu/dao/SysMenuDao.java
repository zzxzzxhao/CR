package com.zzx.backFunc.sysuser.menu.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysFunc;
import com.zzx.pojo.SysMenu;

/**
 * 菜单管理Dao接口
 * @author zzxin9
 *
 */
public interface SysMenuDao {
	/**
	 * 根据ID删除菜单
	 * @param menuid
	 */
	public void deleteMenu(@Param("menuid") String menuid);
	
	/**
	 * 根据菜单项计算其包含的子功能的数量
	 * @param menuid
	 * @return
	 */
	public int countAllFunsByMenuid(@Param("menuid")String menuid);
	
	/**
	 * 计算子菜单的数量
	 * @param menuid
	 * @return
	 */
	public int countAllChildrenMenu(@Param("menuid")String menuid);
	
	/**
	 * 查询顶级菜单
	 * @return
	 */
	public List<SysMenu> findTopMenu();
	
	/**
	 * 菜单列表
	 * @param menuid
	 * @param menuitem
	 * @param url
	 * @param startPage
	 * @param endPage
	 * @return
	 */
	public List<SysMenu>  querySysMentList(@Param("menuid")String menuid,@Param("menuitem")String menuitem,@Param("url")String url,@Param("start_number")int start_number,@Param("page_size")int page_size);

	/**
	 * 统计总数
	 * @param menuid
	 * @param menuitem
	 * @param url
	 * @return
	 */
	public int countAll(@Param("menuid")String menuid,@Param("menuitem")String menuitem,@Param("url")String url);

	/**
	 * 根据菜单项名计算菜单总数
	 * @param menu
	 */
	public int getMenuCountByMenuitem(@Param("menuitem") String menuitem);
	
	/**
	 * 保存菜单
	 * @param menu
	 */
	public void saveMenu(@Param("sysMenu") SysMenu menu);
	
	/**
	 * 更新菜单
	 * @param menu
	 */
	public void updateMenu(@Param("sysMenu")SysMenu menu);
	
	/**
	 * 功能列表
	 * @param menuid
	 * @param menuitem
	 * @param url
	 * @param startPage
	 * @param endPage
	 * @return
	 */
	public List<SysFunc>  querySysFuncList(@Param("menuid")String menuid,@Param("menuitem")String menuitem,@Param("url")String url,@Param("name")String name,@Param("start_number")int start_number,@Param("page_size")int page_size);

	public int countAllFunc(@Param("menuid")String menuid,@Param("menuitem")String menuitem,@Param("url")String url,@Param("name")String name);

	/**
	 * 更新功能
	 * @param menu
	 */
	public void updateFunc(@Param("sysFunc")SysFunc func);
	
	/**
	 * 更新Sys_Url
	 * @param menu
	 */
	public void updateSys_url(@Param("sysFunc")SysFunc func);
	
	public List<SysFunc>  querySysFuncByUrl(@Param("url")String url);
	
	/**
	 * 保存功能
	 * @param SYS_URL
	 */
	public void saveSys_url(@Param("sysFunc") SysFunc func);
	
	/**
	 * 保存功能
	 * @param SYS_FUNC
	 */
	public void saveSys_func(@Param("sysFunc") SysFunc func);
	
	/**
	 * 保存功能
	 * @param SYS_FUNC_URL
	 */
	public void saveSys_func_url(@Param("sysFunc") SysFunc func);
	
	public List<SysFunc>  querySysFuncList2(@Param("funcid")String funcid);
	
	/**
	 * 计算某功能被赋予的角色的数量
	 * @param funcid
	 * @return
	 */
	public int countFromSys_role_funcByFuncid(@Param("funcid")String funcid);
	
	/**
	 * 根据ID删除菜单
	 * @param menuid
	 */
	public void deleteSys_func_url(@Param("funcid") String funcid);
	
	/**
	 * 根据ID删除菜单
	 * @param menuid
	 */
	public void deleteSys_url(@Param("id") String id);
	
	/**
	 * 根据ID删除菜单
	 * @param menuid
	 */
	public void deleteSys_funcById(@Param("funcid") String funcid);
	
	/**
	 * 根据ID删除菜单
	 * @param menuid
	 */
	public void deleteSys_role_func(@Param("funcid") String funcid);
	
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
