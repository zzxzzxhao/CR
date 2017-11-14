var appIndex = {
		base : location.href,
		urlSave: top.window.WXYH.base + "/live/save.do",	//显示首页信息
};
$(document).ready(function(){
	$("#sub").click(function(){
		var content = $("#content").val();
		$.ajax({
			url:appIndex.urlSave,
			type:"post",
			data:{"content":content},
			dataType:"json",
			success:function(res){
				var retcode= res.retcode;
				if(retcode==0){
					window.location.reload();
				}else{
					alert(res.retmsg);
				}
			}
		})
	});
});