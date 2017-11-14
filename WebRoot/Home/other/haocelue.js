var appIndex = {
		base : location.href,
		urlWeixinCheck	:top.window.WXYH.base + "/weixin/check.do",	//微信校检
}
$(document).ready(function(){
	//微信校检
	var url=location.href.split(/[?&]/).toString();
	$.ajax({
		url:appIndex.urlWeixinCheck,
		type:"post",
		data:{"url":url},
		dataType:"json",
		success:function(res){
			 wx.config({
	                debug: false,////生产环境需要关闭debug模式
	                appId: res.appid,//appId通过微信服务号后台查看
	                timestamp: res.timestamp,//生成签名的时间戳
	                nonceStr: res.nonceStr,//生成签名的随机字符串
	                signature: res.signature,//签名
	                jsApiList: [//需要调用的JS接口列表
	                    'checkJsApi',//判断当前客户端版本是否支持指定JS接口
	                    'onMenuShareTimeline',//分享给好友
	                    'onMenuShareAppMessage',//分享到朋友圈
	                ]
	            });
		}
	});
});

//config参数加载完成以后进行
wx.ready(function(){
	//分享到朋友圈
	wx.onMenuShareTimeline({
	    title: '好策略', // 分享标题
	    link: 'http://www.niubila.top/CR/Home/other/910.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: 'http://www.niubila.top/CR/views/images/haocelueIcon.jpg', // 分享图标
	    success: function () {
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
	//分享给朋友
	wx.onMenuShareAppMessage({
	    title: '好策略', // 分享标题
	    desc: '低门槛八倍炒股资金增资，更有高手互动社区持仓共享！', // 分享描述
	    link: 'http://www.niubila.top/CR/Home/other/910.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: 'http://www.niubila.top/CR/views/images/haocelueIcon.jpg', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
});