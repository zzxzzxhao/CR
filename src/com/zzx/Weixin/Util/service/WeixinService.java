package com.zzx.Weixin.Util.service;

import com.zzx.pojo.AccessToken;
import com.zzx.pojo.JsapiTicket;

/**
 * @author 郑志欣
 * @date 2017年10月7日
 */
public interface WeixinService {
	public AccessToken getAccessToken();

	public JsapiTicket getJsapiTicket();
	
	public void setAccessToken(String token,long expiretime);

	public void setJsapiTicket(String ticket,long expiretime);
}