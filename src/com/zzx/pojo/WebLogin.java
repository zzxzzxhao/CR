package com.zzx.pojo;

import java.io.Serializable;

public class WebLogin implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String userid;
	
	private String accno;
	
	private String password;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getAccno() {
		return accno;
	}

	public void setAccno(String accno) {
		this.accno = accno;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
