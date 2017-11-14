var appIndex = {
		base : location.href,
		urlGetDate	:top.window.WXYH.base + "/live/date.do",	//显示用户名
};

$(document).ready(function(){
	var time=new Date();
	var live=time.toLocaleDateString();
	$("#livetime").html(live);
	
	$.ajax({
		url:appIndex.urlGetDate,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			for (var i = 0; i < res.List.length; i++) {
				if(res.List[i].state==0){
					$(".content").append("<li class='am-comment'>" +
							"<div class='am-comment-main' style='background: white;'>" +
							"<header class='am-comment-hd'>" +
							"<div class='am-comment-meta'style='font-size:20px;'>" +
							"发表于" +
							"<time>" +
							res.List[i].time+
							"</time>" +
							"</div>" +
							"</header>" +
							"<div class='am-comment-bd'>" +
							"<p>" +
							res.List[i].content+
							"</p>" +
							"</div>" +
							"</div>" +
							"</li>");
				}else if(res.List[i].state==1){
					$("#redtime").html(res.List[i].time);
					$("#redcontent").html(res.List[i].content);
				}else if(res.List[i].state==2){
					$(".content").append("<li class='am-comment'>" +
							"<div class='am-comment-main' style='background: white;'>" +
							"<header class='am-comment-hd'>" +
							"<div class='am-comment-meta'style='font-size:20px;'>" +
							"发表于" +
							"<time>" +
							res.List[i].time+
							"</time>" +
							"</div>" +
							"</header>" +
							"<div class='am-comment-bd'>" +
							"<p style='color:blue'>" +
							res.List[i].content+
							"</p>" +
							"</div>" +
							"</div>" +
							"</li>");
				}
			}
		}
	});
	
});
function ask() {
	$('.img').show();
}

$(".img").click(function() {
	$('.img').hide();
});