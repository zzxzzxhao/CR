package com.zzx.Home.liveask.service;

import java.util.List;

import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;

/**
* @author 郑志欣
* @date 2017年8月18日
*/
public interface SysStockLiveAskService {
	public List<SysStockLive> getList();
	
	public void saveMessage(String content) throws MyException;
	
}
