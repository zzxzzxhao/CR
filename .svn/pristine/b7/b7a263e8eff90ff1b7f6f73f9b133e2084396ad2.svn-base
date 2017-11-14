package com.zzx.backFunc.live.message.service;

import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
public interface SysStockLiveMessageService {
	public String getStateId(int state);
	
	public void setStateBlue(String id,int state);
	
	public void saveMessage(String content,int state)throws MyException;
	
	public PojoDomain<SysStockLive> querySysStockLiveList(int page_number,int page_size,String keyword);

	public void delete(String id)throws MyException;
	
}
