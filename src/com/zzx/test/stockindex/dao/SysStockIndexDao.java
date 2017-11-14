package com.zzx.test.stockindex.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStock;

public interface SysStockIndexDao {
	public List<SysStock> getList();
	
	public void savenum(@Param("num")String num,@Param("code")String code);
}
