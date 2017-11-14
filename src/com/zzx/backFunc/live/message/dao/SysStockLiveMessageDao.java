package com.zzx.backFunc.live.message.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStockLive;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
public interface SysStockLiveMessageDao {
	public String getStateId(@Param("state")int state);
	
	public void saveMessage(@Param("content")String content,@Param("state")int state);

	public void setStateBlue(@Param("id")String id,@Param("state")int state);

	public List<SysStockLive> querySysStockLiveList(@Param("start_number")int start_number,@Param("page_size")int page_size,@Param("keyword")String keyword);
	
	public int count();
	
	public void delete(@Param("id")String id);
	
}
