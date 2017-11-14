package com.zzx.backFunc.staffmanage.stock.service;

import java.util.List;

import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
public interface SysStockService {
	public PojoDomain<SysStock> queryStockList(int page_number,int page_size,String keyword)throws MyException;
	
	public List<SysStaff> findTopMenu();
	
	public void updateStock(SysStock stock) throws MyException;
	
	public void saveStock(SysStock stock) throws MyException;
	
	public  void deleteStock(String stockid)  throws MyException;
}
