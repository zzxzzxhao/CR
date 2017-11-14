package com.zzx.pojo;
/**
* @author 郑志欣
* @date 2017年10月7日
* 微信jsapi_ticket
*/
public class JsapiTicket {
	private String ticket;
	
	private long expiresIn;

	public String getTicket() {
		return ticket;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}

	public long getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(long expiresIn) {
		this.expiresIn = expiresIn;
	}
}
