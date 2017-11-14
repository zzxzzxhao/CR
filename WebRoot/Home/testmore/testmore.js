var appIndex = {
		base : location.href,
		urlGetUser: top.window.WXYH.base + "/stock/more.do",	//显示首页信息
};

$(document).ready(function(){
	var id=GetQueryString("id");
	//获取用户名，加上读取各类图片
	$.ajax({
		url:appIndex.urlGetUser,
		type:"post",
		data:{"id":id},
		dataType:"json",
		success:function(res){
			$("#url").attr("src",res.star.url);//头像
			$("#starname").html(res.star.starname);//明星名字
			$("#sign").html(res.star.sign);
			$("#name").html(res.star.name);
			$("#code").html(res.star.code);
			$("#buyPrice").html(res.star.buyPrice);
			$("#nowPrice").html(res.star.nowPrice);
			$("#rate").html(res.star.rate);
			$("#target").html(res.star.target);
			$("#date").html(res.star.time);
			$("#dotime").html(res.star.dodatetime);
			$("#doname").html(res.star.doname);
			$("#dorate").html(res.star.dorate);
			$("#dorate").append("%");
		}
	});
});

// rem格式切换 //
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 360) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function ask() {
	var label=document.getElementById("starname");
	var name=label.innerText;
	if(name=="李通宝"){
		$('#tongbao').show();
	}else {
		$('#others').show();
	}
}

$("#tongbao").click(function() {
	$('#tongbao').hide();
});

$("#others").click(function() {
	$('#others').hide();
});