package com.zzx.Home.live.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.Home.live.dao.SysStockLiveDao;
import com.zzx.Home.live.service.SysStockLiveService;
import com.zzx.pojo.SysStockLive;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Service
public class SysStockLiveServiceImpl implements SysStockLiveService{
	@Autowired
	private SysStockLiveDao date;
	
	@Override
	public List<SysStockLive> getList() {
		
		return this.date.getList();
	}

}
