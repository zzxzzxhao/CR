package com.zzx.backFunc.live.ask.message.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStockLive;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
public interface SysStockLiveAskMessageDao {
	public void saveAskMessage(@Param("reply")String reply,@Param("name")String name,@Param("id")String id);

	public List<SysStockLive> querySysStockLiveAskList(@Param("start_number")int start_number,@Param("page_size")int page_size,@Param("keyword")String keyword);

	public int count();
	
	public void delete(@Param("id")String id);
	
}
