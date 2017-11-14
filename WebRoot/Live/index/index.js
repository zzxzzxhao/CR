var appIndex = {
		base : location.href,
		urlSaveToDesktop	:top.window.WXYH.base + "/Live/down.do",	//保存到桌面
		urlLogin	:top.window.WXYH.base + "/Live/login.do",	//登录
		urlRegister	:top.window.WXYH.base + "/Live/register.do",	//注册
		urlGetKey : top.window.WXYH.base + "/Live/getKey.do",//加密
		urllogout	:top.window.WXYH.base + "/Live/logout.do",	//退出登录
		urlCheckLogin	:top.window.WXYH.base + "/Live/checklogin.do",	//检查登录状态
		urlReloadUserlist	:top.window.WXYH.base + "/Live/getonlineuser.do",	//获得在线用户
};
var publicKeyExponent;
var publicKeyModulus;
$(document).ready(function(){
	/*//pc端手机端判断
	var mobileurl="http://www.niubila.top/CR/Live/mobile/mobileindex.html";
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
	
	
	$.ajax({
		url:appIndex.urlReloadUserlist,
		type:"post",
		data:{},
		dataType:"json",
		success:function(res){
			for (var i = 0; i < res.user.length; i++) {
				$("#userlist").append("<li>" +
						"<span>【贵宾】</span><span class='c-074e7b'>" +
						res.user[i].name +
						"</span>" +
						"</li>");
			}
		}
	})
	
	$.getJSON(appIndex.urlGetKey, function(data){
		publicKeyExponent = data.exponent;
		publicKeyModulus = data.modulus;
	});
	
	//清屏
	$("#cleanscreen").on("click", function(e) {
		$("#saytext").html("");
	});
	
	//登录验证
	$("#loginButton").on("click", function(e) {
		login();
	});
	
	//登录回车
	$("#loginAccount").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			login(); 
		}  
	}); 
	//登录回车
	$("#loginPassword").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			login(); 
		}  
	}); 
	
	//注册验证
	$("#registerButton").on("click", function(e) {
		register();
	});
	
	//注册回车
	$("#registerName").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			register(); 
		}  
	}); 
	//注册回车
	$("#registerAccount").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			register(); 
		}  
	}); 
	//注册回车
	$("#registerPassword").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			register();
		}  
	}); 
	//注册回车
	$("#replypassword").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			register();
		}  
	}); 
	
	//发送消息
	$("#sendButton").on("click", function(e) {
		send();
	});
	//发送消息回车
	$("#text_area").bind('keydown',function(event){  
		if(event.keyCode == "13"){  
			send();
		}  
	});
	
	
	$("#down").on("click", function(e) {
		$.ajax({
			url:appIndex.urlSaveToDesktop,
			type:"post",
			data:{},
			dataType:"json"
		});
	});
	
	$("#out").on("click", function(e) {
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
			myalert('缺少表情赋值对象。');
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
			$('#'+id).css('top',offset.top +$(".tool-wrap").outerHeight());
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};
	
	$.fn.bannerGif = function(options){
		var defaults = {
			id : 'bannersbox',
			path : 'face/',
			assign : 'content',
			tip : 'bg_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		
		if(assign.length<=0){
			myalert('缺少表情赋值对象。');
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=3; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 1 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $('.tool-wrap').outerHeight();
			$('#'+id).css('top',top);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};
});
var websocket = null;
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
	websocket = new WebSocket("ws://niubila.top/CR/websocket");
} else {
	myalert('当前浏览器版本过低，请更新或者更换浏览器！')
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
	logout();
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
				myalert(res.retmsg);
			}
		}
	});
}

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
				$(".logout-btn").show();
				$(".login-btn").hide();
				$(".register-btn").hide();
				$("#user").html(res.loginname);
			}
		},
	});
}

//自定义alert框
function myalert(message){
	var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3>提示</h3></div><div class="body-panel"><p class="content"></p><p class="btns"><button class="w-btn" tabindex="1" onclick="alertclose();">确定</button></p></div></div></div>';
	var jq = $(html);
	var width=$(window).width() * 0.3;
	var height=172;
	jq.find(".window-panel").width(width).css("margin-left", -width / 2).css("margin-top", -height / 2 - 36);
	jq.find(".content").html(message.replace('\r\n', '<br/>'));
	jq.appendTo('body').fadeIn("fast");
	$(".win .w-btn:first").focus();
}

//alert关闭
function alertclose(){
	$('.win iframe').fadeOut();
	$('.win').fadeOut("fast");
	setTimeout(function() {
		$('.win iframe').remove();
		$('.win').remove();
	}, 200);
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
				myalert(res.retmsg);
				$("#loginAccount").val("");
				$("#loginPassword").val("");
				
				$(".logout-btn").show();
				$(".login-btn").hide();
				$(".register-btn").hide();
				
				$("#user").html(res.name);
				$(".gologin").hide();
				$('.black-wrap').hide();
			}else{
				myalert(res.retmsg);
				$("#loginAccount").val("");
				$("#loginPassword").val("");
			}
		}
	});
}

//注册事件
function register(){
	var p=$("#registerPassword").val();
	var rp=$("#replypassword").val();
	var phonenum=$("#registerAccount").val();
	
	 if(!(/^1[1|2|3|4|5|6|7|8|9|0][0-9]\d{4,8}$/.test(phonenum))){ 
	        myalert("请输入正确的手机号码！"); 
	        $("#replypassword").val("");
			$("#registerPassword").val("");
			$("#registerAccount").val("");
			$("#registerName").val("");
	        return; 
	   } 
	
	if(p!=rp){
		myalert("两次输入密码不一致！");
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
				myalert(res.retmsg);
				$("#registerAccount").val("");
				$("#registerName").val("");
				$("#registerPassword").val("");
				$("#replypassword").val("");
				$(".gologin").hide();
				$('.black-wrap').hide();
			}else{
				myalert(res.retmsg);
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