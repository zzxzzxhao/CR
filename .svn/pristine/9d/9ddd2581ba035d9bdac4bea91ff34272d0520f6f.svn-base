package com.zzx.Weixin.Util.dao;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.AccessToken;
import com.zzx.pojo.JsapiTicket;

/**
 * @author 郑志欣
 * @date 2017年10月7日
 */

public interface WeixinDao {
	public AccessToken getAccessToken();

	public JsapiTicket getJsapiTicket();
	
	public void setAccessToken(@Param("token")String token,@Param("expiretime")long expiretime);

	public void setJsapiTicket(@Param("ticket")String token,@Param("expiretime")long expiretime);
}
