package com.zzx.backFunc.live.ask.message.service;

import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
public interface SysStockLiveAskMessageService {
	public void saveAskMessage(String reply,String name,String id)throws MyException;
	
	public PojoDomain<SysStockLive> querySysStockLiveAskList(int page_number,int page_size,String keyword);
	
	public void delete(String id)throws MyException;
}
