package com.zzx.backFunc.staffmanage.staff.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.staffmanage.staff.dao.SysStaffDao;
import com.zzx.backFunc.staffmanage.staff.service.SysStaffService;
import com.zzx.pojo.SysStaff;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月31日
*/
@Service
public class SysStaffServiceImpl implements SysStaffService {
	@Autowired
	private SysStaffDao staffdao;
	
	@Override
	public PojoDomain<SysStaff> getStaffList(int page_number, int page_size, String keyword) {
		List<SysStaff> stafflist=staffdao.getStaffList((page_number-1)*page_size, page_size,keyword);
		PojoDomain<SysStaff> sysStaffDomain=new PojoDomain<SysStaff>();
		sysStaffDomain.setPojolist(stafflist);
		int totle=staffdao.count();
		sysStaffDomain.setPage_number(page_number);
		sysStaffDomain.setPage_size(page_size);
		sysStaffDomain.setTotal_count(totle);
		return sysStaffDomain;
	}

	@Override
	public void saveStaff(SysStaff sysstaff)throws MyException {
		try{
			String staffname=sysstaff.getStaffname();
			if(staffname==null||"".equals(staffname)){
				throw new MyException("业务员姓名不能为空");
			}
			Integer count=staffdao.getStaffByName(staffname.trim());
			if(count!=null&&count>0){
				throw new MyException("此业务员已经存在");
			}
			staffdao.saveStaff(staffname);
		}catch(Exception e){
			throw new MyException("保存业务员异常");
		}
	}
	
	@Override
	public void updateStaff(SysStaff sysstaff)throws MyException {
		try{
			String staffname=sysstaff.getStaffname();
			String staffid=sysstaff.getStaffid();
			String url=sysstaff.getUrl();
			staffdao.updateStaff(staffname,staffid,url);
		}catch(Exception e){
			throw new MyException("更新业务员异常");
		}
	}
	
	@Override
	public void deleteStaffById(String staffid) throws MyException{
		try{
			staffdao.deleteStaffById(staffid);
		}catch(Exception e){
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("删除业务员异常");
			}
		}
	}
	
}
