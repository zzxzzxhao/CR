package com.zzx.backFunc.staffmanage.staff.service;

import com.zzx.pojo.SysStaff;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
public interface SysStaffService {
	public PojoDomain<SysStaff> getStaffList(int page_number,int page_size,String keyword);

	public void saveStaff(SysStaff sysstaff) throws MyException;
	
	public void updateStaff(SysStaff sysstaff) throws MyException;
	
	public void deleteStaffById(String staffid)  throws MyException;
	
}
