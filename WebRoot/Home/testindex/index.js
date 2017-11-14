var appIndex = {
		base : location.href,
		urlGetUser: top.window.WXYH.base + "/stock/index.do",	//显示首页信息
		urlSaveNum: top.window.WXYH.base + "/stock/savenum.do",	//保存已点赞数
};
$(document).ready(function(){
	//获取用户名，加上读取各类图片
	$.ajax({
		url:appIndex.urlGetUser,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			for (var i = 0; i < res.List.length; i++) {
				//头像加载
				var urlid="#url"+i;
				$(urlid).attr("src",res.List[i].url);
				
				//头像加载
				var starnameid="#starname"+i;
				$(starnameid).html(res.List[i].starname);
				
				//股票名字加载
				var nameid="#name"+i;
				$(nameid).html(res.List[i].name);
				
				//股票代码
				var codeid="#code"+i;
				$(codeid).html(res.List[i].code);
				
				//持股时间
				var dayid="#day"+i;
				$(dayid).html(res.List[i].day);
				
				//点赞数
				var numid="#num"+i;
				$(numid).html(res.List[i].num);
				
				//按钮参数
				var buid="#bu"+i;
				$(buid).attr("value",res.List[i].id);
				
				//涨幅
				var rateid="#rate"+i;
				$(rateid).html(res.List[i].rate);
				var rate=res.List[i].rate;
				var result=rate.replace("%","");
				if(result>0){
					$(rateid).css("color","red");
				}else{
					$(rateid).css("color","green");
				}
			}
		}
	});
	
	//1
	$("#praise0").click(function(){
		var praise_img = $("#img0");
		var text_box = $("#add0");
		var praise_txt = $("#num0");
		var code_text=$("#code0");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img0' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
	//2
	$("#praise1").click(function(){
		var praise_img = $("#img1");
		var text_box = $("#add1");
		var praise_txt = $("#num1");
		var code_text=$("#code1");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img1' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
	//3
	$("#praise2").click(function(){
		var praise_img = $("#img2");
		var text_box = $("#add2");
		var praise_txt = $("#num2");
		var code_text=$("#code2");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img2' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
	//4
	$("#praise3").click(function(){
		var praise_img = $("#img3");
		var text_box = $("#add3");
		var praise_txt = $("#num3");
		var code_text=$("#code3");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img3' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
	//5
	$("#praise4").click(function(){
		var praise_img = $("#img4");
		var text_box = $("#add4");
		var praise_txt = $("#num4");
		var code_text=$("#code4");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img4' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
	//6
	$("#praise5").click(function(){
		var praise_img = $("#img5");
		var text_box = $("#add5");
		var praise_txt = $("#num5");
		var code_text=$("#code5");
		var code=parseInt(code_text.text());
		var num=parseInt(praise_txt.text());
		if(praise_img.attr("src") == ("../../views/images/yizan.png")){
			alert("请勿重复点赞！");
		}else{
			$(this).html("<img src='../../views/images/yizan.png' id='img5' class='animation' />");
			praise_txt.addClass("hover");
			text_box.show().html("<em class='add-animation'>+1</em>");
			$(".add-animation").addClass("hover");
			num +=1;
			praise_txt.text(num);
			$.ajax({
				url:appIndex.urlSaveNum,
				type:"post",
				data:{"num":num,"code":code},
				dataType:"json",
				success:function(res){
					
				}
			})
		}
	});
	
});


function more(th) {
	var buid=th.value;
	window.location.href="../testmore/testmore.html?id="+buid;
}
