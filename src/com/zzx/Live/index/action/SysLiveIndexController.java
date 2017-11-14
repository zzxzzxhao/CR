package com.zzx.Live.index.action;

import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Live.index.service.SysLiveIndexService;
import com.zzx.pojo.SysLiveUser;
import com.zzx.pojo.SysUser;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.RSAUtils;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PasswordEncoder;
import com.zzx.sys.control.util.SysUserHelper;

/**
* @author 郑志欣
* @date 2017年9月15日
*/
@Controller
public class SysLiveIndexController {
	@Autowired
	private SysLiveIndexService liveservice;
	
	/**
	 * 注册
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/register")
	public void register(HttpServletRequest request,HttpServletResponse response) throws MyException {
		Result result=new Result();
		SysLiveUser user=new SysLiveUser();
		String account=request.getParameter("registerAccount");
		String name=request.getParameter("registerName");
		String password=request.getParameter("registerPassword");
		try {
			HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
			//获取私钥    
			RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
			
			try {
				password = RSAUtils.decryptByPrivateKey(password, privateKey);
			} catch (Exception e) {
				throw new MyException("密码通过秘钥解密错误");
			} 
			
			PasswordEncoder passwordEncoder = new PasswordEncoder();
			password = passwordEncoder.encodePassword(password, account);
			
			user.setAccount(account);
			user.setPassword(password);
			user.setName(name);
			
			liveservice.register(user);
			result.setCode(1);
			result.setMessage("注册成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 登录
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/login")
	public void login(HttpServletRequest request,HttpServletResponse response) throws MyException {
		Result result=new Result();
		SysLiveUser user=new SysLiveUser();
		String account=request.getParameter("account");
		String password=request.getParameter("password");
		try {
			//判断是否注册
			int registered=liveservice.checkRegistered(account);
			if(registered==0) {
				result.setCode(-4);
				result.setMessage("此手机号尚未注册，请先注册！");
				JsonUtil.outputJson(response, result);
			}else {
				//验证是否已经登入
				int state=liveservice.checkLoginState(account);
				if(state==1) {
					try {
						HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
						//获取私钥    
						RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
						
						try {
							password = RSAUtils.decryptByPrivateKey(password, privateKey);
						} catch (Exception e) {
							throw new MyException("密码通过秘钥解密错误");
						} 
						
						PasswordEncoder passwordEncoder = new PasswordEncoder();
						password = passwordEncoder.encodePassword(password, account);
						
						user.setAccount(account);
						user.setPassword(password);
						String username=liveservice.login(user);
						
						SysUser sysuser=new SysUser();
						sysuser.setUsername(account);
						SysUserHelper.setCurrentUserInfo(request, sysuser);//把账号保存到session里
						
						result.getData().put("name", username);
						result.setCode(1);
						result.setMessage("登录成功！");
						JsonUtil.outputJson(response, result);
					} catch (Exception e) {
						result.setCode(-1);
						result.setMessage(e.getMessage());
						JsonUtil.outputJson(response, result);
					}
				}else {
					result.setCode(-3);
					result.setMessage("此用户已经登录！");
					JsonUtil.outputJson(response, result);
				}
			}
		} catch (Exception e) {
			result.setCode(-4);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 登录
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/moblie/login")
	public void moblielogin(HttpServletRequest request,HttpServletResponse response) throws MyException {
		Result result=new Result();
		SysLiveUser user=new SysLiveUser();
		String account=request.getParameter("account");
		String password=request.getParameter("password");
		try {
			//判断是否注册
			int registered=liveservice.checkRegistered(account);
			if(registered==0) {
				result.setCode(-4);
				result.setMessage("此手机号尚未注册，请先注册！");
				JsonUtil.outputJson(response, result);
			}else {
				//验证是否已经登入
				int state=liveservice.checkLoginState(account);
				if(state==1) {
					try {
						HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
						//获取私钥    
						RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
						
						try {
							password = RSAUtils.decryptByPrivateKey(password, privateKey);
						} catch (Exception e) {
							throw new MyException("密码通过秘钥解密错误");
						} 
						
						PasswordEncoder passwordEncoder = new PasswordEncoder();
						password = passwordEncoder.encodePassword(password, account);
						
						user.setAccount(account);
						user.setPassword(password);
						String username=liveservice.moblielogin(user);
						
						SysUser sysuser=new SysUser();
						sysuser.setUsername(account);
						SysUserHelper.setCurrentUserInfo(request, sysuser);//把账号保存到session里
						
						result.getData().put("name", username);
						result.setCode(1);
						result.setMessage("登录成功！");
						JsonUtil.outputJson(response, result);
					} catch (Exception e) {
						result.setCode(-1);
						result.setMessage(e.getMessage());
						JsonUtil.outputJson(response, result);
					}
				}else {
					result.setCode(-3);
					result.setMessage("此用户已经登录！");
					JsonUtil.outputJson(response, result);
				}
			}
		} catch (Exception e) {
			result.setCode(-4);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 根据RSA算法，获取公钥、私钥
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/Live/getKey")
	public void getKey(HttpServletRequest request, HttpServletResponse response)
			throws MyException {
		HashMap<String, Object> map;
		Result result = new Result();
		try {
			map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
			if(map==null){
				map = RSAUtils.getKeys();
			}
			request.getSession().setAttribute("securityKey", map);
			//生成公钥和私钥    
	        RSAPublicKey publicKey = (RSAPublicKey) map.get("public");    
	        RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
	            
	        //模    
	        String modulus = publicKey.getModulus().toString(16);    
	        //System.out.println("pubkey modulus="+modulus);  
	        //公钥指数    
	        String public_exponent = publicKey.getPublicExponent().toString(16);  
	        //System.out.println("pubkey exponent="+public_exponent); 
	        
	        result.getData().put("exponent", public_exponent);
	        result.getData().put("modulus", modulus);
			JsonUtil.output(response, result);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
        
	}
	
	/**
	 * 获得在线用户
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/getonlineuser")
	public void getonlineuser(HttpServletRequest request, HttpServletResponse response){
		Result result=new Result();
		List<SysLiveUser> user=liveservice.getonlineuser();
		
		result.getData().put("user", user);
		
		JsonUtil.output(response, result);
	}
	
	/**
	 * 退出登录
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response){
		SysUser user=SysUserHelper.getCurrentUserInfo(request);
		if(user!=null) {
			String account=user.getUsername();
			liveservice.logout(account);
		}
		SysUserHelper.setCurrentUserInfo(request,null);
	}
	
	/**
	 * 检查此session上的登录信息
	 * @param request
	 * @param response
	 */
	@RequestMapping("/Live/checklogin")
	public void checklogin(HttpServletRequest request, HttpServletResponse response){
		Result result=new Result();
		
		SysUser user=SysUserHelper.getCurrentUserInfo(request);
		
		if(user!=null) {
			String account=user.getUsername();
			try {
				String name=liveservice.getnameForCheckLogin(account);
				result.getData().put("loginname", name);
				result.setCode(1);
				JsonUtil.outputJson(response, result);
			} catch (Exception e) {
				result.setCode(-2);
				result.setMessage(e.getMessage());
				JsonUtil.outputJson(response, result);
			}
		}else{
			result.setCode(-1);
			JsonUtil.outputJson(response, result);
		}
		
	}
	
}
