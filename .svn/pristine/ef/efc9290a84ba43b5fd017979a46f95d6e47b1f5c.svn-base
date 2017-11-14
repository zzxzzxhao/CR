package com.zzx.backFunc.live.message.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.live.message.dao.SysStockLiveMessageDao;
import com.zzx.backFunc.live.message.service.SysStockLiveMessageService;
import com.zzx.pojo.SysStockLive;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
* @author 郑志欣
* @date 2017年8月16日
*/
@Service
public class SysStockLiveMessageServiceImpl implements SysStockLiveMessageService {
	@Autowired
	private SysStockLiveMessageDao messageDao;
	
	@Override
	public void saveMessage(String content,int state) throws MyException{
		try {
			messageDao.saveMessage(content,state);
		} catch (Exception e) {
			throw new MyException("保存直播内容失败！");
		}
	}

	@Override
	public PojoDomain<SysStockLive> querySysStockLiveList(int page_number, int page_size, String keyword) {
		List<SysStockLive> list=messageDao.querySysStockLiveList((page_number-1)*page_size, page_size,keyword);
		PojoDomain<SysStockLive> livePojo=new PojoDomain<>();
		livePojo.setPojolist(list);
		int totle=messageDao.count();
		livePojo.setPage_number(page_number);
		livePojo.setPage_size(page_size);
		livePojo.setTotal_count(totle);
		return livePojo;
	}
	
	@Override
	public void delete(String id) throws MyException {
		try {
			messageDao.delete(id);
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

	@Override
	public void setStateBlue(String id,int state) {
		this.messageDao.setStateBlue(id,state);
	}

	@Override
	public String getStateId(int state) {
		return this.messageDao.getStateId(state);
	}
}
