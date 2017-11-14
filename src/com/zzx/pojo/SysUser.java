package com.zzx.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.zzx.sys.control.JsonProperty;

public class SysUser  implements Serializable{
	private static final long serialVersionUID = 1L;
	
    private String userid;

    private String username;

    private String password;

    private short peopleState;//人员状态  1、启用  2、禁用  3、冻结
    
    private int disable;
    
    private int passwordErrCount;//密码错误次数
    
    private final List<String> urlList = new ArrayList<String>();
    
    private List<SysRole> role_list;
    
    private String recentPasswordRecord;//最近密码修改记录
    
    public boolean urlFilter(String url) {
		return this.urlList.contains(url);
	}
    public void addAllUrl(List<String> list){
		if (list != null){
			this.urlList.addAll(list);
		}
	}
    
    public SysUser(){}
    
    public SysUser(String userid,String username,String password){
    	super();
    	this.userid=userid;
    	this.username=username;
    	this.password=password;
    }
    public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<SysRole> getRole_list() {
		return role_list;
	}

	public void setRole_list(List<SysRole> role_list) {
		this.role_list = role_list;
	}

	public String getRecentPasswordRecord() {
		return recentPasswordRecord;
	}
	public void setRecentPasswordRecord(String recentPasswordRecord) {
		this.recentPasswordRecord = recentPasswordRecord;
	}
	public int getPasswordErrCount() {
		return passwordErrCount;
	}

	public void setPasswordErrCount(int passwordErrCount) {
		this.passwordErrCount = passwordErrCount;
	}

	@JsonProperty(name="disable")
    public int getDisable() {
		return disable;
	}

	public void setDisable(int disable) {
		this.disable = disable;
	}

	public short getPeopleState() {
		return peopleState;
	}

	public void setPeopleState(short peopleState) {
		this.peopleState = peopleState;
	}

	@JsonProperty(name="userid")
	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	
	@JsonProperty(name="password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}