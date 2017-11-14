package com.zzx.backFunc.yylive.control.dao;
/**
* @author 郑志欣
* @date 2017年9月19日
*/

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysLivePic;
import com.zzx.pojo.SysWapAddress;
import com.zzx.pojo.SysYYLiveUser;

public interface SysYYLiveManageDao {
	public List<SysYYLiveUser> getLiveUser(@Param("start_number")int start_number,@Param("page_size")int page_size,@Param("keyword")String keyword);

	public List<SysWapAddress> getAddress(@Param("start_number")int start_number,@Param("page_size")int page_size);

	public List<SysLivePic>getLivePicList(@Param("start_number")int start_number,@Param("page_size")int page_size);
	
	public int count();

	public int countPic();
	
	public void delete(@Param("id")String id);
	
	public void saveEnable(@Param("account")String account);

	public void saveDisable(@Param("account")String account);

	public void updateState(@Param("account")String account);

	public void updateAddress(@Param("address")String address);

	public void updatePCAddress(@Param("address")String address);

	public void updatePassword(@Param("account")String account,@Param("password")String password);

	public void updateLivePic(@Param("picid")int picid,@Param("url")String url);
	
}
