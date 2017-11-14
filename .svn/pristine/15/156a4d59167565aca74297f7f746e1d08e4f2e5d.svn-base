var appStart = {
		base : location.href,
		urlGetDate: top.window.WXYH.base + "/detail/list.do",	//显示首页信息
		urlGetStaff: top.window.WXYH.base + "/detail/staff.do",	//加载业务员信息
		urlSavePraise: top.window.WXYH.base + "/detail/savepraise.do",	//加载业务员信息
};
$(document).ready(function(){
	var staffid=GetQueryString("staffid");
	var rank=GetQueryString("rank");
	
	$.ajax({
		url:appStart.urlGetDate,
		type:"post",
		data:{"staffid":staffid},
		dataType:"json",
		success:function(res){
					for (var i = 0; i < res.list.length; i++) {
						if(res.list[i].disable==0){
						$("#first").append("<div class='jl_list'>" +
								"<ul><li>" +
								"<div class='list_tit'>" +
								res.list[i].name +
								"(" +
								res.list[i].code +
								")" +
								"<span id='" +
								res.list[i].code +
								"'>" +
								res.list[i].profit +
								"</span>" +
								"</div><div class='list_wz'><ul>" +
								"<li>信用金 <span>" +
								res.list[i].cost +
								"</span></li>" +
								"<li>买入价 <span>" +
								res.list[i].buyPrice +
								"</span></li>" +
								"<li>股票数 <span>" +
								res.list[i].stocknum +
								"</span></li>" +
								"<li>现价 <span>" +
								res.list[i].nowPrice +
								"</span></li>" +
								"<li>策略止盈 <span>" +
								res.list[i].takeprofit +
								"</span></li>" +
								"<li>策略止损 <span>" +
								res.list[i].stoploss +
								"</span></li>" +
								"<li>买入时间 <span>" +
								res.list[i].buyTime +
								"</span></li>" +
								"<li>持仓天数 <span>" +
								res.list[i].positionday +
								"</span></li>");
						
						var profit=res.list[i].profit;
						var profitid="#"+res.list[i].code;
						if(profit<0){
							$(profitid).css("color","green");
						}
					}else{
						$("#second").append("<div class='jl_list'>" +
								"<ul><li>" +
								"<div class='list_tit'>" +
								res.list[i].name +
								"(" +
								res.list[i].code +
								")" +
								"<span id='" +
								res.list[i].code +
								"'>" +
								res.list[i].profit +
								"</span>" +
								"</div><div class='list_wz'><ul>" +
								"<li>买入价 <span>" +
								res.list[i].buyPrice +
								"</span></li>" +
								"<li>卖出价 <span>" +
								res.list[i].sellPrice +
								"</span></li>" +
								"<li>股票数 <span>" +
								res.list[i].stocknum +
								"</span></li>" +
								"<li>盈利率 <span>" +
								res.list[i].profitpre +
								"</span></li>" +
								"<li>策略止盈 <span>" +
								res.list[i].takeprofit +
								"</span></li>" +
								"<li>策略止损 <span>" +
								res.list[i].stoploss +
								"</span></li>" +
								"<li>买入时间 <span>" +
								res.list[i].buyTime +
								"</span></li>" +
								"<li>卖出时间 <span>" +
								res.list[i].sellTime +
								"</span></li>");
						var profit=res.list[i].profit;
						var profitid="#"+res.list[i].code;
						if(profit<0){
							$(profitid).css("color","green");
						}
					}
			}
		}
	});
	
	$.ajax({
		url:appStart.urlGetStaff,
		type:"post",
		data:{"staffid":staffid},
		dataType:"json",
		success:function(res){
			$(".price").html(res.staff.allrate);
			$(".dayprice").html(res.staff.nowrate);
			$(".monthprice").html(res.staff.allrate);
			$("#praise-txt").html(res.staff.praisenum);
			$("#rank").html(rank);
			$("#staffname").html(res.staff.staffname);
			$("#url").attr("src",res.staff.url);
		}
	});
	
	$("#praise").click(function(){
		var praise_img = $("#praise-img");
		var text_box = $("#add-num");
		var praise_txt = $("#praise-txt");
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/hadpraise.jpg")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/hadpraise.jpg' id='praise-img' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appStart.urlSavePraise,
				type:"post",
				data:{"staffid":staffid,"num":num},
				dataType:"json"
			})
		}
	});
});
//采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}