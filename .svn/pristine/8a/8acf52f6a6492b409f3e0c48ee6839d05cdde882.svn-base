package com.zzx.sys.control.util;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

public class PasswordEncoder {

	public String encodePassword(String sourcePwd, String userSid)
	  {
	    Md5PasswordEncoder passwordEncoder = new Md5PasswordEncoder();
	    return passwordEncoder.encodePassword(sourcePwd, userSid);
	  }
	
	public static void main(String[] args) {
		PasswordEncoder passwordEncoder = new PasswordEncoder();
		System.out.println(passwordEncoder.encodePassword("admin", "admin"));
	}
}
