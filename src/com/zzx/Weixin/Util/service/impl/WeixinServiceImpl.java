package com.zzx.Weixin.Util.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.Weixin.Util.dao.WeixinDao;
import com.zzx.Weixin.Util.service.WeixinService;
import com.zzx.pojo.AccessToken;
import com.zzx.pojo.JsapiTicket;

/**
* @author 郑志欣
* @date 2017年10月7日
*/
@Service
public class WeixinServiceImpl implements WeixinService {
	@Autowired
	private WeixinDao wxdao;

	@Override
	public AccessToken getAccessToken() {
		return this.wxdao.getAccessToken();
	}

	@Override
	public void setAccessToken(String token,long expiretime) {
		wxdao.setAccessToken(token,expiretime);
	}

	@Override
	public JsapiTicket getJsapiTicket() {
		return this.wxdao.getJsapiTicket();
	}

	@Override
	public void setJsapiTicket(String ticket,long expiretime) {
		wxdao.setJsapiTicket(ticket,expiretime);
	}

}
