package com.zzx.backFunc.yylive.control.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.yylive.control.dao.SysYYLiveManageDao;
import com.zzx.backFunc.yylive.control.service.SysYYLiveManageService;
import com.zzx.pojo.SysLivePic;
import com.zzx.pojo.SysWapAddress;
import com.zzx.pojo.SysYYLiveUser;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年9月19日
*/
@Service
public class SysYYLiveManageServiceImpl implements SysYYLiveManageService {
	@Autowired
	private SysYYLiveManageDao userdao;
	
	@Override
	public PojoDomain<SysYYLiveUser> getLiveUser(int page_number, int page_size, String keyword) {
		List<SysYYLiveUser> user=userdao.getLiveUser((page_number-1)*page_size, page_size,keyword);
		PojoDomain<SysYYLiveUser> userPojo=new PojoDomain<>();
		userPojo.setPojolist(user);
		int totle=userdao.count();
		userPojo.setPage_number(page_number);
		userPojo.setPage_size(page_size);
		userPojo.setTotal_count(totle);
		return userPojo;
	}
	
	@Override
	public PojoDomain<SysWapAddress> getAddress(int page_number, int page_size) {
		List<SysWapAddress> user=userdao.getAddress((page_number-1)*page_size, page_size);
		PojoDomain<SysWapAddress> userPojo=new PojoDomain<>();
		userPojo.setPojolist(user);
		int totle=1;
		userPojo.setPage_number(page_number);
		userPojo.setPage_size(page_size);
		userPojo.setTotal_count(totle);
		return userPojo;
	}
	
	@Override
	public void delete(String id) throws MyException {
		try {
			userdao.delete(id);
		} catch (Exception e) {
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("删除用户异常");
			}
		}		
	}

	@Override
	public void saveEnable(String account) throws MyException{
		try {
			userdao.saveEnable(account);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MyException("启用用户异常");
		}
	}

	@Override
	public void saveDisable(String account) throws MyException{
		try {
			userdao.saveDisable(account);
		} catch (Exception e) {
			throw new MyException("禁用用户异常");
		}
	}

	@Override
	public void updatePassword(String account, String password) throws MyException {
		try {
			userdao.updatePassword(account,password);
		} catch (Exception e) {
			throw new MyException("重置密码异常");
		}		
	}

	@Override
	public void updateState(String account) throws MyException {
		try {
			userdao.updateState(account);
		} catch (Exception e) {
			throw new MyException("重置登录状态异常");
		}			
	}

	@Override
	public void updateAddress(String address) throws MyException {
		try {
			userdao.updateAddress(address);
		} catch (Exception e) {
			throw new MyException("更新直播地址异常");
		}
	}
	
	@Override
	public void updatePCAddress(String address) throws MyException {
		try {
			userdao.updatePCAddress(address);
		} catch (Exception e) {
			throw new MyException("更新直播地址异常");
		}
	}

	@Override
	public PojoDomain<SysLivePic> getLivePicList(int page_number, int page_size) {
		List<SysLivePic> piclist=userdao.getLivePicList((page_number-1)*page_size, page_size);
		PojoDomain<SysLivePic> picdomain=new PojoDomain<>();
		picdomain.setPojolist(piclist);
		int totle=userdao.countPic();
		picdomain.setPage_number(page_number);
		picdomain.setPage_size(page_size);
		picdomain.setTotal_count(totle);
		return picdomain;
	}

	@Override
	public void updateLivePic(SysLivePic pic) throws MyException {
		try{
			int picid=pic.getPicid();
			String url=pic.getUrl();
			userdao.updateLivePic(picid,url);
		}catch(Exception e){
			throw new MyException("更新图片异常");
		}
	}
	
	
}
