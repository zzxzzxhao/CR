package com.zzx.sys.control.filter;

import java.io.IOException;
import java.util.Enumeration;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.PropsUtil;
import com.zzx.sys.control.Result;


/**
 * 非法字符判断过滤器
 * @author zzxin9
 *
 */
public class IllegalCharacterFilter implements Filter {

	private static String IllegalChars = "";
	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;    
        HttpServletResponse res=(HttpServletResponse)response;    
        //获得所有请求参数名       
        Enumeration params = req.getParameterNames();    
        String sql = "";    
        while (params.hasMoreElements()) {    
            //得到参数名
            String name = params.nextElement().toString();
            if(isNumber(name)){
            	continue;
            }
            //得到参数对应值    
            String[] value = req.getParameterValues(name);    
            for (int i = 0; i < value.length; i++) {    
                sql = sql + value[i];   
            }    
        }    
        if (sqlValidate(sql)) {
        	Result result = new Result();
        	result.setCode(1);
			result.setMessage("请求参数中含有非法字符");
			JsonUtil.outputJson(res, result);
        } else {    
            chain.doFilter(request,response);    
        }    

	}
	
	public boolean isNumber(String name){
		char[] charArray = name.toCharArray();
		for(int i=0;i<charArray.length;i++){
			if(!Character.isDigit(charArray[i])){
				return false;
			}
		}
		return true;
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		IllegalChars = PropsUtil.getProperty("IllegalChars");
	}
	
	//效验     
    protected static boolean sqlValidate(String str) {    
        str = str.toLowerCase();//统一转为小写 
        if(IllegalChars!=null&&!"".equals(IllegalChars)){
        	String[] badStrs = IllegalChars.split("\\|");    
            for (int i = 0; i < badStrs.length; i++) {    
                if (str.indexOf(badStrs[i]) >= 0) {    
                    return true;    
                }    
            } 
        }
        return false;    
    }    

}
