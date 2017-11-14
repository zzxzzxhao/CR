package com.zzx.backFunc.staffmanage.stock.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zzx.backFunc.staffmanage.stock.service.SysStockService;
import com.zzx.pojo.SysStaff;
import com.zzx.pojo.SysStock;
import com.zzx.sys.control.JsonUtil;
import com.zzx.sys.control.Result;
import com.zzx.sys.control.util.PaginationResult;
import com.zzx.sys.control.util.PojoDomain;

/**
 * @author 郑志欣
 * @date 2017年8月31日
 */
@Controller
public class SysStockController {
	@Autowired
	private SysStockService stockservice;

	/**
	 * 获取股票列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/stock/stockList")
	public void getStockList(HttpServletRequest request, HttpServletResponse response) {
		PaginationResult result = new PaginationResult();
		try {
			int page_number = Integer.parseInt(request.getParameter("page_number"));
			int page_size = Integer.parseInt(request.getParameter("page_size"));
			String keyword = request.getParameter("keyword");
			PojoDomain<SysStock> pojoDomain = stockservice.queryStockList(page_number, page_size, keyword);
			result.getData().put("stocklist", pojoDomain.getPojolist());
			result.setPageNumber(pojoDomain.getPage_number());
			result.setPageSize(pojoDomain.getPage_size());
			result.setPageTotal(pojoDomain.getPage_total());
			result.setTotalCount(pojoDomain.getTotal_count());
			JsonUtil.output(response, result);
		} catch (Exception e) {
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}

	}

	/**
	 * 获取业务员列表
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/stock/getParentMenu")
	public void findTopMenu(HttpServletRequest request, HttpServletResponse response) {
		Result result = new Result();
		List<SysStaff> list = this.stockservice.findTopMenu();
		result.getData().put("topMenuList", list);
		JsonUtil.output(response, result);
	}

	/**
	 * 保存事件
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/stock/save")
	public void saveStaff(HttpServletRequest request, HttpServletResponse response) {
		Result result = new Result();
		try {
			String stockid = request.getParameter("stockid");
			String staffid = request.getParameter("staffid_form");
			String stockname = request.getParameter("stockname");
			String code = request.getParameter("code");
			String stocknum = request.getParameter("stocknum");
			String buyPrice = request.getParameter("buyPrice");
			String buyTime = request.getParameter("buyTime");
			String sellTime=request.getParameter("sellTime");
			String target = request.getParameter("target");
			String sellPrice = request.getParameter("sellPrice");
			String takeprofit = request.getParameter("takeprofit");
			String stoploss = request.getParameter("stoploss");
			int disable = Integer.parseInt(request.getParameter("stockState"));

			SysStock stock = new SysStock();
			if (stockid != null && !"".equals(stockid)) {
				stock.setStockid(stockid);
				stock.setStaffid(staffid);
				stock.setCode(code);
				stock.setName(stockname);
				stock.setStocknum(stocknum);
				stock.setBuyPrice(buyPrice);
				stock.setBuyTime(buyTime);
				stock.setSellTime(sellTime);
				stock.setTarget(target);
				stock.setSellPrice(sellPrice);
				stock.setTakeprofit(takeprofit);
				stock.setStoploss(stoploss);
				stock.setDisable(disable);

				stockservice.updateStock(stock);
			} else {
				stock.setStaffid(staffid);
				stock.setCode(code);
				stock.setName(stockname);
				stock.setStocknum(stocknum);
				stock.setBuyPrice(buyPrice);
				stock.setBuyTime(buyTime);
				stock.setSellTime(sellTime);
				stock.setTarget(target);
				stock.setSellPrice(sellPrice);
				stock.setTakeprofit(takeprofit);
				stock.setStoploss(stoploss);
				stock.setDisable(disable);

				stockservice.saveStock(stock);
			}
			JsonUtil.outputJson(response, result);
		} catch (Exception e) {
			result.setCode(1);
			result.setMessage(e.getMessage());
			JsonUtil.outputJson(response, result);
		}
	}

	@RequestMapping("/stock/delete")
	public void deleteMenuById(HttpServletRequest request, HttpServletResponse response) {
		Result result = new Result();
		String stockid = request.getParameter("stockid");
		String[] stockids = stockid.split(",");
		try {
			for (int i = 0; i < stockids.length; i++) {
				if (stockids[i] != null) {
					this.stockservice.deleteStock(stockids[i]);
				} else {
					result.setCode(1);
					result.setMessage("该股票不存在！");
				}
			}
		} catch (Exception e) {
			result.setCode(-2);
			result.setMessage(e.getMessage());
		}
		JsonUtil.outputJson(response, result);
	}

}
