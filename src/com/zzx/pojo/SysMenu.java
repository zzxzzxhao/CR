package com.zzx.pojo;

import java.util.ArrayList;
import java.util.List;

import com.zzx.sys.control.ConstDefine.MenuState;
import com.zzx.sys.control.JsonObject;
import com.zzx.sys.control.JsonProperty;



/**
 * 系统菜单
 * @author zzxin9
 */
@JsonObject
public class SysMenu{
	//顶级菜单
	public final static String rootMunuId = "00000000000000000000000000000000";

	private String menuid;
	
	private String parentid;
	
	private String menuitem;
	
	private String parentItem;
	
	private String url;
	
	private Integer sort;
	//菜单状态  1、新建  2、删除
	private short state = MenuState.ENABLE;
	
	private List<SysFunc> oper_list=new ArrayList<SysFunc>();
	
	private List<SysMenu> childMenu=new ArrayList<SysMenu>();

	@JsonProperty(name="menuid")
	public String getMenuid() {
		return menuid;
	}

	public void setMenuid(String menuid) {
		this.menuid = menuid;
	}

	@JsonProperty(name="sort")
	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
	@JsonProperty(name="parentid")
	public String getParentid() {
		return parentid;
	}
	
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	@JsonProperty(name="parentItem")
	public String getParentItem() {
		return parentItem;
	}

	public void setParentItem(String parentItem) {
		this.parentItem = parentItem;
	}
	
	@JsonProperty(name="menuitem")
	public String getMenuitem() {
		return menuitem;
	}

	public void setMenuitem(String menuitem) {
		this.menuitem = menuitem;
	}

	@JsonProperty(name="url")
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	

	public short getState() {
		return state;
	}

	public void setState(short state) {
		this.state = state;
	}

	@JsonProperty(name="menu_list")
	public List<SysMenu> getChildMenu() {
		return childMenu;
	}

	public void addChildMenu(SysMenu childMenu) {
		this.childMenu.add(childMenu);
	}

	@JsonProperty(name="oper_list")
	public List<SysFunc> getOper_list() {
		return oper_list;
	}

	public void addOper(SysFunc sysFunc) {
		oper_list.add(sysFunc);
	}
	
}
