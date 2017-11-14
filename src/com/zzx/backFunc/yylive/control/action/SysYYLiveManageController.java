package com.zzx.backFunc.yylive.control.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.interfaces.RSAPrivateKey;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.zzx.backFunc.yylive.control.service.SysYYLiveManageService;
import com.zzx.pojo.SysLivePic;
import com.zzx.pojo.SysWapAddress;
import com.zzx.pojo.SysYYLiveUser;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.RSAUtils;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PasswordEncoder;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.WebSocketTest;

/**
* @author 郑志欣
* @date 2017年9月19日
*/
@Controller
public class SysYYLiveManageController {
	@Autowired
	SysYYLiveManageService yyservice;
	
	/**
	 * 用户列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/yylive/list")
	public void getLiveUser(HttpServletRequest request,HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		String keyword = request.getParameter("keyword");
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		
		WebSocketTest socket=new WebSocketTest();
		int onlineNum=socket.getOnlineCount();
		
		PojoDomain<SysYYLiveUser> pojoDomain = yyservice.getLiveUser(page_number,page_size,keyword);
		
		result.getData().put("live_list", pojoDomain.getPojolist());
		result.getData().put("onlineNum", onlineNum);
		
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());
		JsonUtil.output(response, result);
	}

	/**
	 * 直播列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/yylive/wap/addresslist")
	public void getAddress(HttpServletRequest request,HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		
		PojoDomain<SysWapAddress> pojoDomain = yyservice.getAddress(page_number,page_size);
		
		result.getData().put("wap_list", pojoDomain.getPojolist());
		
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());
		JsonUtil.output(response, result);
	}
	
	/**
	 * 删除
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/yylive/delete")
	public void delete(HttpServletRequest request,HttpServletResponse response) throws MyException {
		Result result = new Result();
		String id = request.getParameter("id");
		String[] ids=id.split(",");
		try{
			for (int i = 0; i < ids.length; i++) {
				if(ids[i]!=null) {
					yyservice.delete(ids[i]);
				}else {
					result.setCode(1);
					result.setMessage("选择的内容为空！");
				}
			}
		}catch(Exception e){
			result.setCode(-2);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
		JsonUtil.outputJson(response, result);
	}
	
	@RequestMapping("/yylive/enable")
	public void enable(HttpServletRequest request,HttpServletResponse response)throws MyException{
		Result result = new Result();
		String account=request.getParameter("account");
		try {
			yyservice.saveEnable(account);
			result.setCode(0);
			result.setMessage("启用成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	@RequestMapping("/yylive/disable")
	public void disable(HttpServletRequest request,HttpServletResponse response)throws MyException{
		Result result = new Result();
		String account=request.getParameter("account");
		try {
			yyservice.saveDisable(account);
			result.setCode(0);
			result.setMessage("禁用成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 重置登录状态
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/yylive/changeState")
	public void updateState(HttpServletRequest request,HttpServletResponse response)throws MyException{
		Result result = new Result();
		String account=request.getParameter("account");
		try {
			yyservice.updateState(account);
			result.setCode(0);
			result.setMessage("重置成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 更新手机直播地址
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/yylive/changeAddress")
	public void updateAddress(HttpServletRequest request,HttpServletResponse response)throws MyException{
		Result result = new Result();
		String address=request.getParameter("address");
		try {
			yyservice.updateAddress(address);
			result.setCode(0);
			result.setMessage("重置直播地址成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 更新pc直播地址
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/yylive/changePCAddress")
	public void updatePCAddress(HttpServletRequest request,HttpServletResponse response)throws MyException{
		Result result = new Result();
		String address=request.getParameter("address");
		try {
			yyservice.updatePCAddress(address);
			result.setCode(0);
			result.setMessage("重置直播地址成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 重置密码
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/yylive/reset")
	public void reset(HttpServletRequest request,HttpServletResponse response) throws MyException {
		Result result=new Result();
		String account=request.getParameter("account");
		String password=request.getParameter("password");
		
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
		
		try {
			yyservice.updatePassword(account,password);
			result.setCode(1);
			result.setMessage("重置密码成功！");
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(-1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 获取所有直播图片
	 * @param request
	 * @param response
	 */
	@RequestMapping("/yylive/picList")
	public void getPic(HttpServletRequest request,HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		
		PojoDomain<SysLivePic> pojo=yyservice.getLivePicList(page_number,page_size);
		result.getData().put("piclist", pojo.getPojolist());
		result.setPageNumber(pojo.getPage_number());
		result.setPageSize(pojo.getPage_size());
		result.setPageTotal(pojo.getPage_total());
		result.setTotalCount(pojo.getTotal_count());
		JsonUtil.output(response, result);
	}
	
	/**
	 * 保存图片事件
	 * picname，换了电脑之类的需要更新地址，还有数据库数据也要更新
	 * @param request
	 * @param response
	 */
	@RequestMapping("/yylive/picsave")
	public void savePic(HttpServletRequest request,HttpServletResponse response){
		Result result=new Result();
		try{
			String picname = "../../../views/images/livepic/"+getImgByteList(request);
			String picid=request.getParameter("picid");
			SysLivePic pic=new SysLivePic();
			if(picid!=null&&!"".equals(picid)){
				pic.setPicid(Integer.valueOf(picid));
				pic.setUrl(picname);
				yyservice.updateLivePic(pic);
			}else{
				result.setCode(-8);
				result.setMessage("保存出错");
			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	private String getImgByteList(HttpServletRequest request){
		String filename=null;
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
		
		//获取服务器的路径，再加上我的保存图片的文件夹路径
//		String url="D:/workspace/CR/WebRoot/views/images/livepic";//直接把工程相应的图片目录写下来
		
		String url="C:/Users/Administrator/Desktop/apache-tomcat-7.0.79/webapps/CR/views/images/livepic";//这个是部署到tomcat的
		
		//判断 request 是否有文件上传,即多部分请求
		if(multipartResolver.isMultipart(request)){
			//转换成多部分request  
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
			//取得request中的所有文件名
			Iterator<String> iter = multiRequest.getFileNames();
			while(iter.hasNext()){
				//取得上传文件
				MultipartFile file = multiRequest.getFile(iter.next());
				if(file != null){
					try {
						filename=file.getOriginalFilename();
						//保存文件到服务器上
						File targetfile=new File(url,filename);
						InputStream ins=file.getInputStream();
						FileOutputStream fos=new FileOutputStream(targetfile);
						byte b[]=new byte[1024];
						int temp=0;
						
						while((temp=ins.read(b))!=-1){
							fos.write(b,0,temp);
						}
						fos.close();
						ins.close();
					} catch (IOException e) {
						System.out.println(e);
					}
				}
			}
		}
		return filename;
	}
}
