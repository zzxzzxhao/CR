package com.zzx.backFunc.live.ask.message.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.live.ask.message.dao.SysStockLiveAskMessageDao;
import com.zzx.backFunc.live.ask.message.service.SysStockLiveAskMessageService;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Service
public class SysStockLiveAskMessageServiceImpl implements SysStockLiveAskMessageService {
	@Autowired
	private SysStockLiveAskMessageDao ask;
	
	@Override
	public void saveAskMessage(String reply, String name,String id) throws MyException {
		try {
			ask.saveAskMessage(reply,name,id);
		} catch (Exception e) {
			throw new MyException("保存问答内容失败！");
		}
	}

	@Override
	public PojoDomain<SysStockLive> querySysStockLiveAskList(int page_number, int page_size, String keyword) {
		List<SysStockLive> list=ask.querySysStockLiveAskList((page_number-1)*page_size, page_size,keyword);
		PojoDomain<SysStockLive> livePojo=new PojoDomain<>();
		livePojo.setPojolist(list);
		int totle=ask.count();
		livePojo.setPage_number(page_number);
		livePojo.setPage_size(page_size);
		livePojo.setTotal_count(totle);
		return livePojo;
	}
	
	@Override
	public void delete(String id) throws MyException {
		try {
			ask.delete(id);
		} catch (Exception e) {
			if(e instanceof MyException){
				try {
					throw e;
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}else{
				throw new MyException("删除内容异常");
			}
		}
	}
}
