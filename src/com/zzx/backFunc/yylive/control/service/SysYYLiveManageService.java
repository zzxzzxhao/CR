package com.zzx.backFunc.yylive.control.service;
/**
* @author 郑志欣
* @date 2017年9月19日
*/

import com.zzx.pojo.SysLivePic;
import com.zzx.pojo.SysWapAddress;
import com.zzx.pojo.SysYYLiveUser;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

public interface SysYYLiveManageService {
	public PojoDomain<SysYYLiveUser>getLiveUser(int page_number,int page_size,String keyword);

	public PojoDomain<SysWapAddress>getAddress(int page_number,int page_size);

	public PojoDomain<SysLivePic> getLivePicList(int page_number,int page_size);
	
	public void delete(String id)throws MyException;
	
	public void saveEnable(String account)throws MyException;
	
	public void saveDisable(String account)throws MyException;

	public void updateState(String account)throws MyException;

	public void updateAddress(String address)throws MyException;

	public void updateLivePic(SysLivePic pic)throws MyException;

	public void updatePCAddress(String address)throws MyException;

	public void updatePassword(String account,String password)throws MyException;

}
