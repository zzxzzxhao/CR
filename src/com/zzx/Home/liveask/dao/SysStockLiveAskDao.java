package com.zzx.Home.liveask.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStockLive;

/**
* @author 郑志欣
* @date 2017年8月18日
*/
public interface SysStockLiveAskDao {
	public List<SysStockLive> getList();
	
	public void saveMessage(@Param("content")String content);
}
