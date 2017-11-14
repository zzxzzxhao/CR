package com.zzx.pojo;

import java.util.Date;

/**
* @author 郑志欣
* @date 2017年8月15日
*/
public class SysStar {
	private String id;//明星id
	
	private String starname;//明星名字
	
	private String url;//明星头像url
	
	private String sign;//个人简介
	
	private String code;//股票代码
	
	private String name;//股票名字
	
	private String buyPrice;//购买价格
	
	private String nowPrice;//现价
	
	private String cost;//成本价
	
	private String target;//目标价位
	
	private Date date;//购买时间
	
	private String rate;//累计涨跌幅
	
	private String time;//
	
	private Date dotime;//操作记录买入时间
	
	private String doname;//操作记录公司名字
	
	private String dorate;//操作记录收益
	
	private String dodatetime;//

	private String day;//持股时间

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getDodatetime() {
		return dodatetime;
	}

	public void setDodatetime(String dodatetime) {
		this.dodatetime = dodatetime;
	}

	public Date getDotime() {
		return dotime;
	}

	public void setDotime(Date dotime) {
		this.dotime = dotime;
	}

	public String getDoname() {
		return doname;
	}

	public void setDoname(String doname) {
		this.doname = doname;
	}

	public String getDorate() {
		return dorate;
	}

	public void setDorate(String dorate) {
		this.dorate = dorate;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNowPrice() {
		return nowPrice;
	}

	public void setNowPrice(String nowPrice) {
		this.nowPrice = nowPrice;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStarname() {
		return starname;
	}

	public void setStarname(String starname) {
		this.starname = starname;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}
}
