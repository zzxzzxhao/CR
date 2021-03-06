package com.zzx.Weixin.Util.action;

import java.io.IOException;
import java.security.MessageDigest;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.Weixin.Util.service.WeixinService;
import com.zzx.pojo.AccessToken;
import com.zzx.pojo.JsapiTicket;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;

import net.sf.json.JSONObject;

/**
* @author 郑志欣
* @date 2017年10月7日
* 微信工具类，主要为微信校检信息服务
*/
@Controller
public class WeixinController {
	@Autowired
	private WeixinService wxservice;
	
	private static final String APPID="wx560e905a2be927d1";
	
	private static final String APPSECRET="bf679cc80eb3bf485a080670db0dc72e";
	
	private static final String ACCESS_TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

	private static final String JSAPI_URL="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";

	//微信参数
	private static String accessToken;
	private static String jsApiTicket;
	
	
	@RequestMapping("/weixin/check")
	public void getWechatParam(HttpServletRequest request, HttpServletResponse response){
		Result result =new Result();
		String rpr=request.getParameter("url");
		String url;
		String[] strs = rpr.split(",");
		if(strs.length==1) {
			url=strs[0];
		}else {
			url=strs[0]+"?"+strs[1]+"&"+strs[2];
		}
		long nowTime=System.currentTimeMillis();
		
		//获取数据库保存的access_token
		AccessToken token=wxservice.getAccessToken();
		accessToken=token.getToken();
		long tokenTime=token.getExpiresIn();
		
		//判断数据库中是否存在access_token或者是否过期
		if(StringUtils.isBlank(accessToken)||nowTime-tokenTime>0) {
			AccessToken tokenInfo=getAccessToken();
			if(tokenInfo!=null) {
				long getTokenTime=tokenInfo.getExpiresIn();
				long expiretime=nowTime+(getTokenTime*1000);
				String getToken=tokenInfo.getToken();
				
				//把accesstoken保存到数据库
				wxservice.setAccessToken(getToken,expiretime);
				accessToken=tokenInfo.getToken();
			}
		}
		
		//获取数据库中的JsapiTicket
		JsapiTicket ticket=wxservice.getJsapiTicket();
		jsApiTicket=ticket.getTicket();
		long ticketTime=ticket.getExpiresIn();
		
		//判断数据库中是否存在jsapi_ticket或者是否过期
		if(StringUtils.isBlank(jsApiTicket)||nowTime-ticketTime>0) {
			JsapiTicket ticketInfo=getJsapi_ticket();
			if(ticketInfo!=null) {
				long getTicketTime=ticketInfo.getExpiresIn();
				long expiretime=nowTime+(getTicketTime*1000);
				String getTicket=ticketInfo.getTicket();
				
				//把jsapi_ticket保存到数据库中
				wxservice.setJsapiTicket(getTicket,expiretime);
				jsApiTicket=ticketInfo.getTicket();
			}
		}
		
		//生成微信权限验证的参数
		String nonceStr = createNonceStr();
        String timestamp = createTimestamp();
        String string1;
        
        //注意这里参数名必须全部小写，且必须有序
        string1 = "jsapi_ticket=" + jsApiTicket +
                "&noncestr=" + nonceStr +
                "&timestamp=" + timestamp +
                "&url=" + url;
        
        //sha1加密
        String signature=getSha1(string1);
        
        result.getData().put("url",url);
        result.getData().put("jsapi_ticket",jsApiTicket);
        result.getData().put("nonceStr",nonceStr);
        result.getData().put("timestamp",timestamp);
        result.getData().put("signature",signature);
        result.getData().put("appid",APPID);
        
        JsonUtil.output(response, result);
	}
	
	/**
	 * get请求
	 * @param url
	 * @return
	 */
	public static JSONObject doGetStr(String url) {
		CloseableHttpClient httpClient=HttpClients.createDefault();
		HttpGet httpGet=new HttpGet(url);
		JSONObject jsonObject=null;
		try {
			HttpResponse response=httpClient.execute(httpGet);
			HttpEntity entity=response.getEntity();
			
			if(entity !=null) {
				String result=EntityUtils.toString(entity,"UTF-8");
				jsonObject=JSONObject.fromObject(result);
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	/**
	 * 获取access_token
	 * @return token
	 */
	public static AccessToken getAccessToken() {
		AccessToken token=new AccessToken();
		String url=ACCESS_TOKEN_URL.replace("APPID", APPID).replace("APPSECRET",APPSECRET);
		JSONObject jsonObject=doGetStr(url);
		if(jsonObject!=null) {
			token.setToken(jsonObject.getString("access_token"));
			token.setExpiresIn(jsonObject.getInt("expires_in"));
		}
		
		return token;
	}
	
	/**
	 * 获取jsapi_ticket
	 * @return 
	 */
	public static JsapiTicket getJsapi_ticket() {
		JsapiTicket jsapi=new JsapiTicket();
		String url=JSAPI_URL.replace("ACCESS_TOKEN",accessToken);
		JSONObject jsonObject=doGetStr(url);
		if(jsonObject!=null) {
			jsapi.setExpiresIn(jsonObject.getInt("expires_in"));
			jsapi.setTicket(jsonObject.getString("ticket"));
		}
		return jsapi;
	}
	
	//生成随机字符串
    private static String createNonceStr() {
        return UUID.randomUUID().toString();
    }
    //生成时间戳
    private static String createTimestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }
    //sha1加密方法
  	public static String getSha1(String str) {
  		if(str==null||str.length()==0) {
  			return null;
  		}
  		char hexDigits[]= {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
  		
  		try {
  			MessageDigest mdTemp=MessageDigest.getInstance("SHA1");
  			mdTemp.update(str.getBytes("UTF-8"));
  			
  			byte[] md=mdTemp.digest();
  			int j=md.length;
  			char buf[]=new char[j*2];
  			int k=0;
  			for (int i = 0; i < j; i++) {
  				byte byte0=md[i];
  				buf[k++]=hexDigits[byte0>>>4 & 0xf];
  				buf[k++]=hexDigits[byte0 & 0xf];
  			}
  			return new String(buf);
  		} catch (Exception e) {
  			return null;
  		}
  	}
}
