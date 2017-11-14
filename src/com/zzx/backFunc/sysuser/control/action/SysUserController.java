package com.zzx.backFunc.sysuser.control.action;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.geom.Line2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.backFunc.sysuser.control.service.SysUserService;
import com.zzx.pojo.SysMenu;
import com.zzx.pojo.SysRole;
import com.zzx.pojo.SysUser;
import com.zzx.sys.control.ConstDefine.PeopleState;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.PropsUtil;
import com.zzx.sys.control.RSAUtils;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PasswordEncoder;
import com.zzx.sys.control.util.PojoDomain;
import com.zzx.sys.control.util.SysUserHelper;
/**
 * 系统用户控制器处理类
 * @author zzxin9
 *
 */
@Controller
public class SysUserController {
	@Autowired
	private SysUserService sysUserService = null;
	
	
	/**
	 * 获取验证码
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/getVerifyCode")
	public void getVerifyCode(HttpServletRequest request, HttpServletResponse response)
			throws MyException {
		//设置不缓存图片  
        response.setHeader("Pragma", "No-cache");  
        response.setHeader("Cache-Control", "No-cache");  
        response.setDateHeader("Expires", 0);  
        //指定生成的响应图片,一定不能缺少这句话,否则错误.    
        response.setContentType("image/jpeg");  
        int width=86,height=42;     //指定生成验证码的宽度和高度  
        BufferedImage image=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);   
        Graphics g=image.getGraphics();     //创建Graphics对象,其作用相当于画笔    
        Graphics2D g2d=(Graphics2D)g;       //创建Grapchics2D对象  
        Random random=new Random();  
        Font mfont=new Font("����",Font.BOLD,30); //定义字体样式   
        g.setColor(getRandColor(200,250));  
        g.fillRect(0, 0, width, height);    //绘制背景
        g.setFont(mfont);                   //设置字体 
        g.setColor(getRandColor(180,200));  
          
        //绘制100条颜色和位置全部为随机产生的线条,该线条为2f  
        for(int i=0;i<100;i++){  
            int x=random.nextInt(width-1);  
            int y=random.nextInt(height-1);  
            int x1=random.nextInt(6)+1;  
            int y1=random.nextInt(12)+1;  
            BasicStroke bs=new BasicStroke(2f,BasicStroke.CAP_BUTT,BasicStroke.JOIN_BEVEL); //定制线条样式  
            Line2D line=new Line2D.Double(x,y,x+x1,y+y1);  
            g2d.setStroke(bs);  
            g2d.draw(line);     //绘制直线   
        }  
        //输出由英文，数字，和中文随机组成的验证文字，具体的组合方式根据生成随机数确定。  
        String sRand="";  
        String ctmp="";  
        int itmp=0;  
        //制定输出的验证码为四位
        for(int i=0;i<4;i++){  
            switch(random.nextInt(3)){  
                case 1:     //生成A-Z的字母  
                     itmp=random.nextInt(26)+65;  
                     ctmp=String.valueOf((char)itmp);  
                     break;  
                default:  
                     itmp=random.nextInt(10)+48;  
                     ctmp=String.valueOf((char)itmp);  
                     break;  
            }  
            sRand+=ctmp;  
            Color color=new Color(20+random.nextInt(110),20+random.nextInt(110),random.nextInt(110));  
            g.setColor(color);  
            //将生成的随机数进行随机缩放并旋转制定角度 PS.建议不要对文字进行缩放与旋转,因为这样图片可能不正常显示  
            /*将文字旋转制定角度*/ 
            Graphics2D g2d_word=(Graphics2D)g;  
            AffineTransform trans=new AffineTransform();  
            trans.rotate((45)*3.14/180,15*i+8,7);  
            /*缩放文字*/  
            float scaleSize=random.nextFloat()+0.8f;  
            if(scaleSize>1f) scaleSize=1f;  
            trans.scale(scaleSize, scaleSize);  
            g2d_word.setTransform(trans);  
            g.drawString(ctmp, 15*i+18, 14);  
        }  
        HttpSession session=request.getSession(true);  
        session.setAttribute("randCheckCode", sRand);  
        g.dispose();    //释放g所占用的系统资源  
        try {
			ImageIO.write(image,"JPEG",response.getOutputStream());//输出图片 
		} catch (IOException e) {
			throw new MyException("输出验证码图片异常");
		} 
        
	}
	
	/*该方法主要作用是获得随机生成的颜色*/   
    public Color getRandColor(int s,int e){  
        Random random=new Random ();  
        if(s>255) s=255;  
        if(e>255) e=255;  
        int r,g,b;  
        r=s+random.nextInt(e-s);    //随机生成RGB颜色中的r值  
        g=s+random.nextInt(e-s);    //随机生成RGB颜色中的g值  
        b=s+random.nextInt(e-s);    //随机生成RGB颜色中的b值   
        return new Color(r,g,b);  
    } 
	
	/**
	 * 根据RSA算法，获取公钥、私钥
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/getKey")
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
	 * 登录
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/login")
	public void login(HttpServletRequest request, HttpServletResponse response)
			throws MyException {
		Result result = new Result();
		try{
			String imgcode = request.getParameter("imgcode");
			String sRand = (String)request.getSession().getAttribute("randCheckCode");
			if(imgcode==null&&"".equals(imgcode)){
				throw new MyException("请输入验证码");
			}
			if(sRand!=null&&!"".equals(sRand)){
				if(!sRand.equalsIgnoreCase(imgcode)){
					throw new MyException("验证码错误");
				}
			}else{
				throw new MyException("验证码错误");
			}
			
			String userid = request.getParameter("userid");
			String password = request.getParameter("password");
			
			//System.out.println("---"+password);
			HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
			//��ȡ˽Կ    
	        RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
	        
			try {
				password = RSAUtils.decryptByPrivateKey(password, privateKey);
				//System.out.println("---"+password);
			} catch (Exception e) {
				throw new MyException("用户名或密码错误");
			}  
	        
	        PasswordEncoder passwordEncoder = new PasswordEncoder();
	        password = passwordEncoder.encodePassword(password, userid);
	        //System.out.println("---"+password);
	        
	        
			//setAttribute(USER_SESSION_KEY, u);
			SysUser sysuser = null;
			sysuser = SysUserHelper.getCurrentUserInfo(request);
			if(sysuser!=null){
				if(!sysuser.getUserid().equals(userid)){
					throw new MyException("该浏览器上已存在已经登录的其他用户("+ sysuser.getUserid() + ")!");
				}
			}
			Map<String, Object> resultMap = null;
			resultMap = this.sysUserService.login(userid,password);
			String res = (String)resultMap.get("result");
			if(res!=null&&!"".equals(res)){
				result.setCode(1);
				result.setMessage(res);
				JsonUtil.outputJson(response, result);
			}else{
				sysuser = (SysUser)resultMap.get("sysuser");
				if (sysuser != null) {
					sysuser.setPassword("");
					SysUserHelper.setCurrentUserInfo(request, sysuser);
					JsonUtil.output(response, result);
				} else {
					throw new MyException("用户名或密码不正确");
				}
			}
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
		
	}
	
	/**
	 * 获取用户能查询的菜单
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/sys/user/menu")
	public void getUserMenu(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Result result = new Result();
		SysUser sysuser = SysUserHelper.getCurrentUserInfo(request);
		SysMenu sysMenu = sysUserService.getSysMenuTree(sysuser.getUserid());
		if (sysMenu != null)
			result.getData().put("menu_list", sysMenu.getChildMenu());
			result.getData().put("sysuser",SysUserHelper.getCurrentUserInfo(request));
			String script = "var config=" + JsonUtil.object2json(result);
			JsonUtil.output(response, script);
	}
	
	
	/**
	 * 注销
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/sys/user/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.getSession().invalidate();
		response.sendRedirect(request.getContextPath() + "/login.html");
	}
	
	/**
	 * 获取用户列表
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/sys/user/list")
	public void getSysUserList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		PaginationResult result = new PaginationResult();
		String[] roleids = request.getParameterValues("roleid");
		String keyword = request.getParameter("keyword");
		int page_number = Integer.parseInt(request.getParameter("page_number"));
		int page_size = Integer.parseInt(request.getParameter("page_size"));
		PojoDomain<SysUser> pojoDomain = sysUserService.querySysUserList(
				page_number, page_size, roleids, keyword);
		result.getData().put("sysuser_list", pojoDomain.getPojolist());
		result.setPageNumber(pojoDomain.getPage_number());
		result.setPageSize(pojoDomain.getPage_size());
		result.setPageTotal(pojoDomain.getPage_total());
		result.setTotalCount(pojoDomain.getTotal_count());
		JsonUtil.output(response, result);
	}
	
	/**
	 * 新增用户
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/add")
	public void sysUserAdd(HttpServletRequest request,
			HttpServletResponse response) throws MyException {
		Result result = new Result();
		try{
			String userId = request.getParameter("userid");
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String[] roleids = request.getParameterValues("roleid");
			SysUser sysUser = sysUserService.getSysUserById(userId);
			if (sysUser != null) {
				throw new MyException("用户已存在");
			} else {
				HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
				//获取私钥    
				RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
				
				try {
					password = RSAUtils.decryptByPrivateKey(password, privateKey);
				} catch (Exception e) {
					throw new MyException("密码通过秘钥解密错误");
				}  
				PasswordEncoder passwordEncoder = new PasswordEncoder();
				password = passwordEncoder.encodePassword(password, userId);
				sysUser = new SysUser(userId, username, password);
				sysUser.setPeopleState(PeopleState.ENABLE);
				sysUser.setPasswordErrCount(0);
				SysUser admin = SysUserHelper.getCurrentUserInfo(request);
				sysUserService.saveSysUser(admin.getUserid(), sysUser, roleids);
			}
			JsonUtil.output(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 编辑用户
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/edit")
	public void sysUserEdit(HttpServletRequest request,
			HttpServletResponse response) throws MyException {
		Result result = new Result();
		try{
			String userId = request.getParameter("userid");
			String username = request.getParameter("username");
			String[] roleidsStr = request.getParameterValues("roleid");
			SysUser sysUser = sysUserService.getSysUserById(userId);
			if (sysUser == null) {
				throw new MyException("用户不存在");
			} else {
				sysUser = new SysUser(userId, username,"");
				SysUser admin = SysUserHelper.getCurrentUserInfo(request);
				sysUserService.updateSysUser(admin.getUserid(), sysUser, roleidsStr);
			}
			JsonUtil.output(response, result);
		}catch(Exception e){
			result.setCode(1);
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
	@RequestMapping("/sys/user/password/reset")
	public void passwordReset(HttpServletRequest request,
			HttpServletResponse response) throws MyException {
		Result result = new Result();
		try{
			String userid = request.getParameter("userid");
			String newpassword = request.getParameter("newpassword");
			HashMap<String, Object> map = (HashMap<String, Object>)request.getSession().getAttribute("securityKey");
			//获取私钥    
	        RSAPrivateKey privateKey = (RSAPrivateKey) map.get("private");    
	        
			try {
				newpassword = RSAUtils.decryptByPrivateKey(newpassword, privateKey);
			} catch (Exception e) {
				throw new MyException("密码通过秘钥解密错误");
			}  
	        
	        PasswordEncoder passwordEncoder = new PasswordEncoder();
	        newpassword = passwordEncoder.encodePassword(newpassword, userid);
			SysUser sysUser = sysUserService.getSysUserById(userid);
			if (sysUser == null) {
				throw new MyException("用户不存在");
			} else {
				String rpr =  sysUser.getRecentPasswordRecord();
				if(rpr!=null&&!"".equals(rpr)){
					String[] strs = rpr.split(";");
					for(int i=0;i<strs.length;i++){
						if(newpassword.equals(strs[i])){
							throw new MyException("新密码不能与最近修改过的密码相同");
						}
					}
					String passwordRecordsLength = PropsUtil.getProperty("passwordRecordsLength").trim();
					if(strs.length>Integer.valueOf(passwordRecordsLength)){
						StringBuffer sb = new StringBuffer();
						for(int i=1;i<strs.length;i++){
							sb.append(";"+strs[i]);
						}
						if(sb.length()>0){
							rpr = sb.substring(1)+";"+newpassword;
						}
					}else{
						rpr +=";"+newpassword;
					}
				}else{
					rpr = newpassword;
				}
				sysUser.setPassword(newpassword);
				sysUser.setPasswordErrCount(0);
				sysUser.setPeopleState(PeopleState.ENABLE);
				sysUser.setRecentPasswordRecord(rpr);
				sysUserService.updateSysUser(sysUser);

			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
		
	}
	
	/**
	 * 获取角色列表
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sys/role/list")
	public void getSysRoleList(HttpServletRequest request,
			HttpServletResponse response) {
		Result result = new Result();
		List<SysRole> role_list = sysUserService.querySysRoleList();
		result.getData().put("role_list", role_list);
		JsonUtil.outputJson(response, result);
	}
	
	/**
	 * 禁用用户
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/disable")
	public void sysUserDisable(HttpServletRequest request,
			HttpServletResponse response) throws MyException {
		Result result = new Result();
		try{
			String userId = request.getParameter("userid");
			String disable = request.getParameter("disable");
			SysUser sysUser = sysUserService.getSysUserById(userId);
			if (sysUser == null) {
				throw new MyException("用户不存在");
			} else {
				sysUser.setDisable(Integer.parseInt(disable));
				sysUser.setPeopleState(PeopleState.DISABLE);
				sysUserService.updateSysUser(sysUser);
			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}
	
	/**
	 * 物理删除用户
	 * @param request
	 * @param response
	 * @throws Exception
	 * 修改：不能删除当前用户
	 */
	@RequestMapping("/sys/user/deleteSysUser")
	public void deleteUserByUserId(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Result result = new Result();
		try{
			String userId = request.getParameter("userid");
			SysUser sysUser = sysUserService.getSysUserById(userId);
			if (sysUser == null) {
				throw new MyException("用户不存在");
			} else {
				SysUser sysUser1=SysUserHelper.getCurrentUserInfo(request);
				if(userId.equals(sysUser1.getUserid())){
					throw new MyException("不能删除当前用户！");
				}
				sysUserService.deleteUserByUserId(userId);
			}
			JsonUtil.outputJson(response, result);
		}catch(Exception e){
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);

		}
	}
	
	/**
	 * 检验用户id是否存在于通讯录中
	 * @param request
	 * @param response
	 * @throws MyException
	 */
	@RequestMapping("/sys/user/isUserExist")
	public void isUserExist(HttpServletRequest request,
			HttpServletResponse response) throws MyException {
		Result result = new Result();
		String userid = request.getParameter("userid");
		SysUser sysUser = sysUserService.getSysUserById(userid);
		if (sysUser == null) {
			result.setCode(-1);
			result.setMessage("校验失败，用户ID不存在");
		} else{
			result.getData().put("userinfo", sysUser);
		}
		JsonUtil.output(response, result);
	}
}
