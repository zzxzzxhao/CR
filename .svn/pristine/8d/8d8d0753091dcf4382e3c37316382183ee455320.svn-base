package com.zzx.backFunc.staffmanage.stock.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zzx.backFunc.staffmanage.stock.dao.SysStockDao;
import com.zzx.backFunc.staffmanage.stock.service.SysStockService;
import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.util.MyException;
import com.zzx.sys.control.util.PojoDomain;

/**
 * @author 郑志欣
 * @date 2017年8月31日
 */
@Service
public class SysStockServiceImpl implements SysStockService {
	@Autowired
	private SysStockDao stockdao;

	@Override
	public PojoDomain<SysStock> queryStockList(int page_number, int page_size, String keyword) throws MyException {
		try {
			List<SysStock> stocklist = stockdao.queryStockList((page_number - 1) * page_size, page_size, keyword);
			PojoDomain<SysStock> sysStockDomain = new PojoDomain<SysStock>();

			for (int i = 0; i < stocklist.size(); i++) {
				String staffid = stocklist.get(i).getStaffid();
				String staffname = stockdao.getStaffName(staffid);
				String buyTime = stocklist.get(i).getBuyTime();
				Date date = new Date();
				stocklist.get(i).setStaffname(staffname);

				// 计算持仓天数
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String now = sdf.format(date);

				stocklist.get(i).setPositionday(daysBetween(buyTime, now));
			}

			sysStockDomain.setPojolist(stocklist);
			int totle = stockdao.count();
			sysStockDomain.setPage_number(page_number);
			sysStockDomain.setPage_size(page_size);
			sysStockDomain.setTotal_count(totle);
			return sysStockDomain;
		} catch (Exception e) {
			throw new MyException("读取列表异常");
		}
	}

	@Override
	public List<SysStaff> findTopMenu() {
		return this.stockdao.findTopMenu();
	}

	@Override
	public void updateStock(SysStock stock) throws MyException {
		try {
			this.stockdao.updateStock(stock);
		} catch (Exception e) {
			/*if (e instanceof MyException) {
				throw e;
			} else {
				throw new MyException("更新股票异常");
			}*/
			e.printStackTrace();
		}
	}

	@Override
	public void saveStock(SysStock stock) throws MyException {
		try {
			String stockname = stock.getName();
			String code = stock.getCode();
			String stocknum = stock.getStocknum();
			String buyPrice = stock.getBuyPrice();
			String buyTime = stock.getBuyTime();
			String target = stock.getTarget();
			if (stockname == null || "".equals(stockname)) {
				throw new MyException("股票名字不能为空");
			}
			if (code == null || "".equals(code)) {
				throw new MyException("股票代码不能为空");
			}
			if (stockname == null || "".equals(stockname)) {
				throw new MyException("股票名字不能为空");
			}
			if (stocknum == null || "".equals(stocknum)) {
				throw new MyException("股票数不能为空");
			}
			if (buyPrice == null || "".equals(buyPrice)) {
				throw new MyException("买入价格不能为空");
			}
			if (buyTime == null || "".equals(buyTime)) {
				throw new MyException("买入时间不能为空");
			}
			if (target == null || "".equals(target)) {
				throw new MyException("目标价格不能为空");
			}
			this.stockdao.saveStock(stock);
		} catch (Exception e) {
			if (e instanceof MyException) {
				throw e;
			} else {
				throw new MyException("新增股票异常");
			}
		}
	}

	@Override
	public void deleteStock(String stockid) throws MyException {
		try {
			this.stockdao.deleteStock(stockid);
		} catch (Exception e) {
			if (e instanceof MyException) {
				throw e;
			} else {
				throw new MyException("删除股票异常");
			}
		}
	}

	public static int daysBetween(String buytime, String now) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(sdf.parse(buytime));
		long time1 = cal.getTimeInMillis();
		cal.setTime(sdf.parse(now));
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);
		return Integer.parseInt(String.valueOf(between_days));
	}
}
