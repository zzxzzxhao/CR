package com.zzx.pojo;
/**
* @author 郑志欣
* @date 2017年10月7日
* 微信accesstoken
*/
public class AccessToken {
	private String token;
	
	private long expiresIn;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public long getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(long expiresIn) {
		this.expiresIn = expiresIn;
	}
}
