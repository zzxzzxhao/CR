var appIndex = {
		base : location.href,
		urlGetDate: top.window.WXYH.base + "/index/index.do",	//显示首页信息
};
$(document).ready(function(){
	$.ajax({
		url:appIndex.urlGetDate,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
				for (var i = 0; i < res.allrate.length; i++) {
					$(".allrate").append("<dl class='am-accordion-item'>" +
							"<a href='../stockmore/start.html?staffid=" +
							res.allrate[i].staffid+
							"&rank=" +(i+1)+"'>" +
							"<dt class='am-accordion-title'>" +
							"<span class='rank'>" +(i+1) +"</span>" +
							"<img class='staffimg' src='" +res.allrate[i].url +"'>" +
							"<span>" +res.allrate[i].staffname+"</span>" +
							"<span class='rate'>总收益：<span>"+res.allrate[i].allrate+"</span></span>" +
							"</dt>" +
							"</a>" +
							"</dl>");
				}
				for (var j = 0; j < res.nowrate.length; j++) {
					$(".nowrate").append("<dl class='am-accordion-item'>" +
							"<a href='../stockmore/start.html?staffid=" +
							res.nowrate[j].staffid+
							"&rank=" +(j+1)+"'>" +
							"<dt class='am-accordion-title'>" +
							"<span class='rank'>" +(j+1) +"</span>" +
							"<img class='staffimg' src='" +res.nowrate[j].url +"'>" +
							"<span>" +res.nowrate[j].staffname+"</span>" +
							"<span class='rate'>日收益：<span>"+res.nowrate[j].nowrate+"</span></span>" +
							"</dt>" +
							"</a>" +
					"</dl>");
				}
			}
		});
});