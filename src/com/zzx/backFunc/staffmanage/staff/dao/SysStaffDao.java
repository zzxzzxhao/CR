package com.zzx.backFunc.staffmanage.staff.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStaff;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
public interface SysStaffDao {
	public List<SysStaff> getStaffList(@Param("start_number")int start_number,@Param("page_size")int page_size,@Param("keyword")String keyword);

	public int count();

	public Integer getStaffByName(@Param("staffname")String staffname);

	public void saveStaff(@Param("staffname")String staffname);
	
	public void updateStaff(@Param("staffname")String staffname,@Param("staffid")String staffid,@Param("url")String url);
	
	public void deleteStaffById(@Param("staffid")String staffid);
	
}
