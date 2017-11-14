package com.zzx.test.stockmore.dao;
/**
* @author 郑志欣
* @date 2017年8月15日
*/

import org.apache.ibatis.annotations.Param;

import com.zzx.pojo.SysStar;

public interface SysStockMoreDao {
	public SysStar getStar(@Param("id")String id);
}
