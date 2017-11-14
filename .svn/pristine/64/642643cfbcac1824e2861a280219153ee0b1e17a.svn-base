package com.zzx.backFunc.staffmanage.staff.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.zzx.backFunc.staffmanage.staff.service.SysStaffService;
import com.zzx.pojo.SysStaff;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
@Controller
public class SysStaffController {
	@Autowired
	private SysStaffService staffservice;
	
	/**
	 * 获取业务员列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/staff/staffList")
	public void getStaff(HttpServletRequest request,HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		String keyword = request.getParameter("keyword");
		
		PojoDomain<SysStaff> pojo=staffservice.getStaffList(page_number,page_size,keyword);
		result.getData().put("stafflist", pojo.getPojolist());
		result.setPageNumber(pojo.getPage_number());
		result.setPageSize(pojo.getPage_size());
		result.setPageTotal(pojo.getPage_total());
		result.setTotalCount(pojo.getTotal_count());
		JsonUtil.output(response, result);
		
	}
	
	/**
	 * 保存事件
	 * picname，换了电脑之类的需要更新地址，还有数据库数据也要更新
	 * @param request
	 * @param response
	 */
	@RequestMapping("/staff/save")
	public void saveStaff(HttpServletRequest request,HttpServletResponse response){
		Result result=new Result();
		try{
			String picname = "../../views/images/staff/"+getImgByteList(request);
			String id=request.getParameter("id");
			SysStaff staff =new SysStaff();
			if(id!=null&&!"".equals(id)){
				staff.setStaffid(id);
				staff.setStaffname(request.getParameter("staffname"));
				staff.setUrl(picname);
				staffservice.updateStaff(staff);
			}else{
				staff.setStaffname(request.getParameter("staffname"));
				staff.setUrl(picname);
				staffservice.saveStaff(staff);
			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 物理删除角色
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/staff/delete")
	public void deleteStaff(HttpServletRequest request,HttpServletResponse response) throws Exception {
		Result result = new Result();
		try{
			String staffid = request.getParameter("staffid");
			staffservice.deleteStaffById(staffid);
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
//		String url="D:/workspace/CR/WebRoot/views/images/staff";//直接把工程相应的图片目录写下来
		
		String url="C:/Users/Administrator/Desktop/apache-tomcat-7.0.79/webapps/CR/views/images/staff";//这个是部署到tomcat的
		
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
