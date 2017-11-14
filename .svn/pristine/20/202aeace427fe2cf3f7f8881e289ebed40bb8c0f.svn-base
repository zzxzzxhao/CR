package com.zzx.sys.control;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * config工具类
 * 读取config.properties
 * @author zzxin9
 *
 */
public class PropsUtil {
	private static Properties props = new Properties();
	private static final Logger logger = Logger.getLogger(PropsUtil.class);
	static{
		InputStream in = PropsUtil.class.getClassLoader().getResourceAsStream("config.properties");
		try {
			props.load(in);
		} catch (IOException e) {
			logger.error("IOException ", e);
		}
	}
	
	public static String getProperty(String key){
		return props.getProperty(key);
	}
}
