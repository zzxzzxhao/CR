var appIndex = {
		base : location.href,
		urlGetDate	:top.window.WXYH.base + "/ask/date.do",	//显示过往问答
		urlSave		:top.window.WXYH.base + "/ask/save.do",	//保存问答
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
				var name=res.List[i].name;
				if(name==0){
					$(".content").append("<li class='am-comment'>" +
							"<div class='am-comment-main' style='background: white;'>" +
							"<header class='am-comment-hd'>" +
							"<div class='am-comment-meta'style='font-size:20px;'>" +
							"游客 发表于" +
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
				}else{
					$(".content").append("<li class='am-comment'>" +
							"<div class='am-comment-main' style='background: white;'>" +
							"<header class='am-comment-hd'>" +
							"<div class='am-comment-meta'style='font-size:20px;'>" +
							"游客 发表于" +
							"<time>" +
							res.List[i].time+
							"</time>" +
							"</div>" +
							"</header>" +
							"<div class='am-comment-bd'>" +
							"<p>" +
							res.List[i].content+
							"</p>" +
							"</div>"+
							"<div style='border: 1px solid #dedede;background: #f8f8f8'>"+
							"<div style='margin-left: 2%'>"+
							"<div style='font-size:20px;color: red'>"+
							res.List[i].name+
							":&nbsp;&nbsp;<span>"+
							res.List[i].reply+
							"</span></div>"+
							"<div class='am-comment-meta' style='padding-left: 0px;'>"+
							"回复于&nbsp;<time>"+
							res.List[i].replytime+
							"</time></div></div></div>"+
							"</div>" +
							"</li>");
				}
			}
		}
	});
	
	/*$("#sub").click(function(){
		var content = $("#askcontent").val();
		$.ajax({
			url:appIndex.urlSave,
			type:"post",
			data:{"content":content},
			dataType:"json",
			success:function(res){
				var retcode = res.retcode;
				if(retcode==0){
					window.location.roload;
				}else{
					alert(res.retmsg);
				}
			}
		})
	});*/
	
});
function ask() {
	var content = $("#askcontent").val();
	$.ajax({
		url:appIndex.urlSave,
		type:"post",
		data:{"content":content},
		dataType:"json",
		success:function(res){
			var retcode = res.retcode;
			if(retcode==0){
				window.location.reload();
			}else{
				alert(res.retmsg);
			}
		}
	})
}
