package com.zzx.Home.stock.detail.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;

/**
* @author 郑志欣
* @date 2017年9月1日
*/
public interface SysStockDetailDao {
	public List<SysStock>getStockDate(@Param("staffid")String staffid);

	public SysStaff getStaff(@Param("staffid")String staffid);
	
	public void savePraise(@Param("num")String num,@Param("staffid")String staffid);
}
