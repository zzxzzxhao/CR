package com.zzx.backFunc.staffmanage.stock.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
public interface SysStockDao {
	public List<SysStock> queryStockList(@Param("start_number")int start_number,@Param("page_size")int page_size,@Param("keyword")String keyword);

	public int count();

	public String getStaffName(@Param("staffid")String staffid);
	
	public List<SysStaff> findTopMenu();
	
	public void updateStock(@Param("sysStock")SysStock stock);
	
	public void saveStock(@Param("sysStock")SysStock stock);
	
	public void deleteStock(@Param("stockid") String stockid);
}
