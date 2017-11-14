package com.zzx.Home.liveask.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.Home.liveask.dao.SysStockLiveAskDao;
import com.zzx.Home.liveask.service.SysStockLiveAskService;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;

/**
* @author 郑志欣
* @date 2017年8月18日
*/
@Service
public class SysStockLiveAskServiceImpl  implements SysStockLiveAskService{
	@Autowired
	private SysStockLiveAskDao date;
	
	@Override
	public List<SysStockLive> getList() {
		return this.date.getList();
	}

	@Override
	public void saveMessage(String content) throws MyException{
		try {
			date.saveMessage(content);
		} catch (Exception e) {
			throw new MyException("发送失败！");
		}
	}

}
