package com.zzx.sys.control;


import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 调用接口响应结果类
 * 
 * @author 
 * @createTime 
 * @history 1.修改时间,修改;修改内容：
 * 
 */
@JsonObject
public class POResult implements Serializable {

	private static final long serialVersionUID = -6963503022738848863L;

	private int code;
	private String message;
	
	//其它数据项
	public Map<String,Object> data = new HashMap<String,Object>();
	
	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	/**
	 * 获取属性：返回码
	 * 
	 * @return
	 */
	@JsonProperty(name="retcode")
	public int getCode() {
		return code;
	}
	
	/**
	 * 设置属性： 返回码
	 * 
	 * @param
	 */
	public void setCode(int code) {
		this.code = code;
	}
	
	/**
	 * 获取属性：返回信息
	 * 
	 * @return
	 */
	@JsonProperty(name="retmsg")
	public String getMessage() {
		return message;
	}
	
	/**
	 * 设置属性：返回信息
	 * 
	 * @param
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	/**
	 * 获取属性：其它数据项
	 * 
	 * @return
	 */
	@JsonObjectProperty
	public Map<String, Object> getData() {
		return data;
	}
	
}
