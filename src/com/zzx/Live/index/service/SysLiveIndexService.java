package com.zzx.Live.index.service;
/**
* @author 郑志欣
* @date 2017年9月15日
*/

import java.util.List;

import com.zzx.pojo.SysLiveUser;
import com.zzx.sys.control.util.MyException;

public interface SysLiveIndexService {
	public String login(SysLiveUser user)throws MyException;
	
	public String moblielogin(SysLiveUser user)throws MyException;

	public String getnameForCheckLogin(String account)throws MyException;
	
	public int checkLoginState(String account);

	public int checkRegistered(String account) throws MyException;

	public void register(SysLiveUser user)throws MyException;
	
	public void logout(String account);

	public List<SysLiveUser> getonlineuser();
}
