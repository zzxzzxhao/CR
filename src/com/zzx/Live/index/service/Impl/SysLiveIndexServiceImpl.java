package com.zzx.Live.index.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.Live.index.dao.SysLiveIndexDao;
import com.zzx.Live.index.service.SysLiveIndexService;
import com.zzx.pojo.SysLiveUser;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.SIDCreator;

/**
* @author 郑志欣
* @date 2017年9月15日
*/
@Service
public class SysLiveIndexServiceImpl implements SysLiveIndexService {
	@Autowired
	private SysLiveIndexDao livedao;
	
	@Override
	public String login(SysLiveUser user) throws MyException {
		String account=user.getAccount();
		String password=user.getPassword();
		if(account==null||account.equals("")) {
			throw new MyException("手机号不能为空！");
		}
		if(password==null||password.equals("")) {
			throw new MyException("密码不能为空！");
		}
		int totle=livedao.count(account,password);
		if(totle!=1) {
			throw new MyException("手机号或密码错误！");
		}
		
		//验证成功，设置登录状态为0！
		livedao.setLoginState(account);
		
		return this.livedao.getName(account);
	}
	
	@Override
	public String moblielogin(SysLiveUser user) throws MyException {
		String account=user.getAccount();
		String password=user.getPassword();
		if(account==null||account.equals("")) {
			throw new MyException("手机号不能为空！");
		}
		if(password==null||password.equals("")) {
			throw new MyException("密码不能为空！");
		}
		int totle=livedao.count(account,password);
		if(totle!=1) {
			throw new MyException("手机号或密码错误！");
		}
		
		return this.livedao.getName(account);
	}

	@Override
	public void register(SysLiveUser user) throws MyException {
		String name=user.getName();
		String account=user.getAccount();
		String password=user.getPassword();
		
		if(name==null||name.equals("")) {
			throw new MyException("昵称不能为空！");
		}
		if(account==null||account.equals("")) {
			throw new MyException("手机号不能为空！");
		}
		if(password==null||password.equals("")) {
			throw new MyException("密码不能为空！");
		}
		
		int totle=livedao.countNum(account);
		if(totle>=1) {
			throw new MyException("此手机号已注册！");
		}
		
		int num=livedao.countName(name);
		if(num>=1) {
			throw new MyException("此昵称已存在！");
		}
		
		String userid=SIDCreator.getRandomSid();
		livedao.reg(name,account,password,userid);
	}

	@Override
	public int checkLoginState(String account){
		long nowTime=System.currentTimeMillis();
		int asd=livedao.check(account);
		
		if(asd==1) {
			long setTime = nowTime+1800*1000;
			livedao.setExpireTime(account,setTime);
			return asd;
		}else {
			long expireTime=livedao.getExpireTime(account);
			if(nowTime>expireTime) {
				return 1;
			}else {
				return 0;
			}
			
		}
	}
	
	@Override
	public int checkRegistered(String account) throws MyException{
		if(account==null||account.equals("")) {
			throw new MyException("手机号不能为空！");
		}
		return this.livedao.countNum(account);
	}

	@Override
	public void logout(String account) {
		this.livedao.logout(account);
	}

	@Override
	public String getnameForCheckLogin(String account) throws MyException {
		//用户禁言状态：0是正常，1是已禁言
		int disable=livedao.getDisable(account);
		if(disable!=0) {
			throw new MyException("此用户已经被禁言，请联系客服！");
		}
		return this.livedao.getName(account);
	}

	@Override
	public List<SysLiveUser> getonlineuser() {
		return this.livedao.getonlineuser();
	}

}
