var appIndex = {
		base : location.href,
		urlSaveToDesktop	:top.window.WXYH.base + "/Live/down.do",	//保存到桌面
		urlLogin	:top.window.WXYH.base + "/Live/moblie/login.do",	//登录
		urlRegister	:top.window.WXYH.base + "/Live/register.do",	//注册
		urlGetKey : top.window.WXYH.base + "/Live/getKey.do",//加密
		urllogout	:top.window.WXYH.base + "/Live/logout.do",	//退出登录
		urlCheckLogin	:top.window.WXYH.base + "/Live/checklogin.do",	//检查登录状态
		urlWeixinCheck	:top.window.WXYH.base + "/weixin/check.do",	//微信校检
		urlGetAddress	:top.window.WXYH.base + "/Live/getAddress.do",	//获取直播间地址
};
var publicKeyExponent;
var publicKeyModulus;
$(document).ready(function(){
	//pc端手机端判断
/*	var mobileurl="http://www.niubila.top/CR/Live/mobile/mobileindex.html";
	var pcurl="http://www.niubila.top/CR/Live/index/haocelue.html";
	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		if(location.href!=mobileurl){
			window.location.href =mobileurl;
		}
	}else{
		if(location.href!=pcurl){
			window.location.href =pcurl;
		}
	}*/
	
	//加载直播间地址
	$.ajax({
		url:appIndex.urlGetAddress,
		type:'post',
		date:{},
		dataType:'json',
		success:function(res){
			$('#studio').attr('src',res.address);
		}
	})
	
	
	//微信校检
	var url=location.href.split('?').toString();
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
	                    'closeWindow',//窗口关闭
	                ]
	            });
		}
	});
	
	$.getJSON(appIndex.urlGetKey, function(data){
		publicKeyExponent = data.exponent;
		publicKeyModulus = data.modulus;
	});
	
	//登录注册选项卡
	$("#my-login").on("click", function(e) {
		showBlack();
		$("#login-tabs").show();
	});
	
	//登录验证
	$("#loginButton").on("click", function(e) {
		login();
	});
	
	//注册验证
	$("#registerButton").on("click", function(e) {
		register();
	});
	
	//发送消息
	$("#sendButton").on("click", function(e) {
		send();
	});

	//退出登录
	$("#my-out").on("click", function(e) {
		logout();
	});
	
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		
		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var height=$(window).height();
			var width=$(window).width();
			
			var top = offset.top ;
			var lf=offset.left;
			var outerHeigth=$('#emotion').outerHeight();
			var lo=top-height;
			var asd=Math.abs(lo);
			$('#'+id).css('bottom',asd);
			$('#'+id).css('right',width-lf);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};
});

//config参数加载完成以后进行
wx.ready(function(){
	//分享到朋友圈
	wx.onMenuShareTimeline({
	    title: '好策略课堂', // 分享标题
	    link: 'http://www.niubila.top/CR/Live/mobile/mobileindex.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: 'http://www.niubila.top/CR/views/images/livepic.jpg', // 分享图标
	    success: function () { 
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
	//分享给朋友
	wx.onMenuShareAppMessage({
	    title: '好策略课堂', // 分享标题
	    desc: '好策略在线直播', // 分享描述
	    link: 'http://www.niubila.top/CR/Live/mobile/mobileindex.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: 'http://www.niubila.top/CR/views/images/livepic.jpg', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
});

var websocket = null;
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
	websocket = new WebSocket("ws://niubila.top/CR/websocket");
} else {
	alert('当前浏览器版本过低，请更新或者更换浏览器！')
}

// 连接发生错误的回调方法
websocket.onerror = function() {
	setMessageInnerHTML("WebSocket连接发生错误");
};

// 连接成功建立的回调方法
websocket.onopen = function() {
	setMessageInnerHTML("欢迎来到聊天室！");
	checklogin();
}

// 接收到消息的回调方法
websocket.onmessage = function(event) {
	setMessageInnerHTML(event.data);
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
	closeWebSocket();
}

// 将消息显示在网页上
//后期要修改！！
function setMessageInnerHTML(innerHTML) {
	var str=innerHTML;
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../../views/emotion/$1.gif" border="0"/>');
	str = str.replace(/\[bg_([0-9]*)\]/g,'<img src="../../views/banners/$1.gif" border="0" style="width:100%"/>');
	
	$("#saytext").append(str);
	$(".area-wrap").scrollTop($(".area-wrap")[0].scrollHeight);
	$("#text_area").val("");
}

// 关闭WebSocket连接
function closeWebSocket() {
	websocket.close();
}

//jquery自适应全屏   
/**
 * @top: number 全局高度百分比
 * @middle: number 全局高度百分比
 * @footer: number 全局高度百分比
 */
function initHeight(top, middle, footer){
    var WINDOW_HEIGHT = $(window).height();
    $('.black-wrap').css('height',WINDOW_HEIGHT );
	$('.wrap').css('height', WINDOW_HEIGHT);
	$('.top').css('height', WINDOW_HEIGHT*top);
	$('.middle').css('height', WINDOW_HEIGHT*middle);
}

// 发送消息
function send() {
	var myDate=new Date();
	var time=myDate.getHours()+":"+myDate.getMinutes();
	$.ajax({
		url:appIndex.urlCheckLogin,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			if(res.retcode==1){
				var message = $("#text_area").val();
				message=message.replace(/\n/g,'');
				if(message==null||message==""){
					alert("消息不能为空！");
					$("#text_area").val("");
				}else{
					var name=$("#user").html();
					var str="<li>" +
					"<div class='chat-info fl mt-12'>" +
					"<span class='c-074e7b mr-10'>" +
					time +
					"</span>" +
					"<span class='c-074e7b mr-10'>" +
					name +
					"</span></div>" +
					"<div class='chat-con fl'>" +
					message +
					"</div></li>";
					websocket.send(str);
				}
			}else if(res.retcode==-1){
				var message = $("#text_area").val();
				message=message.replace(/\n/g,'');
				if(message==null||message==""){
					myalert("消息不能为空！");
					$("#text_area").val("");
				}else{
					var name=$("#user").html();
					var str="<li>" +
					"<div class='chat-info fl mt-12'>" +
					"<span class='c-074e7b mr-10'>" +
					time +
					"</span>" +
					"<span class='c-074e7b mr-10'>" +
					"游客" +
					"</span></div>" +
					"<div class='chat-con fl'>" +
					message +
					"</div></li>";
					websocket.send(str);
				}
			}else if(res.retcode==-2){
				alert(res.retmsg);
			}
		}
	});
}

//弹窗控制
function showBlack(){
    $('.black-wrap').toggle();
}

$('.black-wrap').click(function(){
    $('.black-wrap').toggle();
    $('#login-tabs').hide();//每个弹窗都来这里销毁
})

//新加入客户连接，刷新在线客户列表
function reloadUserlist(){
}

//检查此session上的登录信息
function checklogin(){
	$.ajax({
		url:appIndex.urlCheckLogin,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			if(res.retcode==1){
				$("#my-out").show();
				$("#my-login").hide();
				$("#user").html(res.loginname);
			}
		},
	});
}

//登录事件
function login(){
	RSAUtils.setMaxDigits(200);  
		var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
		var encrypedPwd = RSAUtils.encryptedString(key,$("#loginPassword").val().split("").reverse().join(""));
		var form = {
			account:$("#loginAccount").val()
		,password : encrypedPwd
	};
	$.ajax({
		url:appIndex.urlLogin,
		type:"post",
		data:form,
		dataType:"json",
		success:function(res){
			var retcode = res.retcode;
			if(retcode==1){
				alert(res.retmsg);
				$("#loginAccount").val("");
				$("#loginPassword").val("");
				
				$("#my-out").show();
				$("#my-login").hide();
				
				$("#user").html(res.name);
				$("#login-tabs").hide();
				$('.black-wrap').hide();
			}else{
				alert(res.retmsg);
				$("#loginAccount").val("");
				$("#loginPassword").val("");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert(XMLHttpRequest.status);  
			alert(XMLHttpRequest.readyState);  
			alert(textStatus);
		}
	});
}

//注册事件
function register(){
	var p=$("#registerPassword").val();
	var rp=$("#replypassword").val();
	var phonenum=$("#registerAccount").val();
	
	 if(!(/^1[1|2|3|4|5|6|7|8|9|0][0-9]\d{4,8}$/.test(phonenum))){ 
	        alert("请输入正确的手机号码！"); 
	        $("#replypassword").val("");
			$("#registerPassword").val("");
			$("#registerAccount").val("");
			$("#registerName").val("");
	        return; 
	   } 
	
	if(p!=rp){
		alert("两次输入密码不一致！");
		$("#replypassword").val("");
		$("#registerPassword").val("");
		$("#registerAccount").val("");
		$("#registerName").val("");
		return;
	}
	
	RSAUtils.setMaxDigits(200); 
	var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
	$("#registerPassword").val( RSAUtils.encryptedString(key,p.split("").reverse().join("")));
	
	var form = $("form[name=sign_form]"); 
	$.ajax({
		url:appIndex.urlRegister,
		type:"post",
		data:form.serialize(),
		dataType:"json",
		success:function(res){
			var retcode = res.retcode;
			if(retcode==1){
				alert(res.retmsg);
				$("#registerAccount").val("");
				$("#registerName").val("");
				$("#registerPassword").val("");
				$("#replypassword").val("");
				
				$("#login-tabs").hide();
				$('.black-wrap').hide();
			}else{
				alert(res.retmsg);
				$("#registerAccount").val("");
				$("#registerName").val("");
				$("#registerPassword").val("");
				$("#replypassword").val("");
			}
		}
	});
}

//退出登录
function logout(){
	$.ajax({
		url:appIndex.urllogout,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			window.location.reload(); 
		},
	});
}

jQuery.extend({ 
	unselectContents: function(){ 
		if(window.getSelection) 
			window.getSelection().removeAllRanges(); 
		else if(document.selection) 
			document.selection.empty(); 
		} 
	}); 
	jQuery.fn.extend({ 
		selectContents: function(){ 
			$(this).each(function(i){ 
				var node = this; 
				var selection, range, doc, win; 
				if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
					range = doc.createRange(); 
					range.selectNode(node); 
					if(i == 0){ 
						selection.removeAllRanges(); 
					} 
					selection.addRange(range); 
				} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
					range.moveToElementText(node); 
					range.select(); 
				} 
			}); 
		}, 

		setCaret: function(){ 
			if(!$.browser.msie) return; 
			var initSetCaret = function(){ 
				var textObj = $(this).get(0); 
				textObj.caretPos = document.selection.createRange().duplicate(); 
			}; 
			$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
		}, 

		insertAtCaret: function(textFeildValue){ 
			var textObj = $(this).get(0); 
			if(document.all && textObj.createTextRange && textObj.caretPos){ 
				var caretPos=textObj.caretPos; 
				caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
				textFeildValue+'' : textFeildValue; 
			} else if(textObj.setSelectionRange){ 
				var rangeStart=textObj.selectionStart; 
				var rangeEnd=textObj.selectionEnd; 
				var tempStr1=textObj.value.substring(0,rangeStart); 
				var tempStr2=textObj.value.substring(rangeEnd); 
				textObj.value=tempStr1+textFeildValue+tempStr2; 
				textObj.focus(); 
				var len=textFeildValue.length; 
				textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
				textObj.blur(); 
			}else{ 
				textObj.value+=textFeildValue; 
			} 
		} 
	});