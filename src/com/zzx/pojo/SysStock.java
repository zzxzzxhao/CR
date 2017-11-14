package com.zzx.pojo;

import java.io.Serializable;

public class SysStock implements Serializable{
	private static final long serialVersionUID = 1L;
	private String stockid;//股票id
	
	private String code;//股票代码
	
	private String name;//股票名字
	
	private String stocknum;//股票数
	
	private String buyPrice;//买入价格
	
	private String buyTime;//买入时间
	
	private String sellTime;//卖出时间
	
	private String target;//目标价格
	
	private int disable;//持股/记录

	private String staffname;//业务员名字

	private String staffid;//业务员id
	
	private String sellPrice;//卖出价格
	
	private String takeprofit;//策略止盈
	
	private String stoploss;//策略止损
	
	private int positionday;//持仓天数
	
	private float profit;//盈利
	
	private String profitpre;//盈利率
	
	private String nowPrice;//现价

	private float cost;//成本
	
	public String getSellTime() {
		return sellTime;
	}

	public void setSellTime(String sellTime) {
		this.sellTime = sellTime;
	}

	public float getCost() {
		return cost;
	}

	public void setCost(float cost2) {
		this.cost = cost2;
	}

	public String getProfitpre() {
		return profitpre;
	}

	public void setProfitpre(String profitpre) {
		this.profitpre = profitpre;
	}

	public float getProfit() {
		return profit;
	}

	public void setProfit(float profit) {
		this.profit = profit;
	}

	public String getNowPrice() {
		return nowPrice;
	}

	public void setNowPrice(String nowPrice) {
		this.nowPrice = nowPrice;
	}

	public int getPositionday() {
		return positionday;
	}

	public void setPositionday(int positionday) {
		this.positionday = positionday;
	}

	public String getSellPrice() {
		return sellPrice;
	}

	public void setSellPrice(String sellPrice) {
		this.sellPrice = sellPrice;
	}

	public String getTakeprofit() {
		return takeprofit;
	}

	public void setTakeprofit(String takeprofit) {
		this.takeprofit = takeprofit;
	}

	public String getStoploss() {
		return stoploss;
	}

	public void setStoploss(String stoploss) {
		this.stoploss = stoploss;
	}

	public int getDisable() {
		return disable;
	}

	public void setDisable(int disable) {
		this.disable = disable;
	}

	public String getStockid() {
		return stockid;
	}

	public void setStockid(String stockid) {
		this.stockid = stockid;
	}

	public String getStaffid() {
		return staffid;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStocknum() {
		return stocknum;
	}

	public void setStocknum(String stocknum) {
		this.stocknum = stocknum;
	}

	public String getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getBuyTime() {
		return buyTime;
	}

	public void setBuyTime(String buyTime) {
		this.buyTime = buyTime;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getStaffname() {
		return staffname;
	}

	public void setStaffname(String staffname) {
		this.staffname = staffname;
	}
	
}
