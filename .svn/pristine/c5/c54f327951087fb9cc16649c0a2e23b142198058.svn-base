package com.zzx.Home.stock.second.dao;
/**
* @author 郑志欣
* @date 2017年8月30日
*/

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;

public interface SysStockSecondDao {
	public List<SysStaff> getstaff();
	
	public List<SysStaff> getstaffall();
	
	public List<SysStaff> getstaffnow();
	
	public List<SysStock>getStock(@Param("staffid")String staffid);
	
	public void setStockForStaff(@Param("allpre")String allpre,@Param("nowpre")String nowpre,@Param("staffid")String staffid);
	
}
