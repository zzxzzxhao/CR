var appLogin = {
	urlLogin : top.window.WXYH.base + "/sys/user/login.do",
	urlGetKey : top.window.WXYH.base + "/sys/user/getKey.do",
	urlVerifyImg : top.window.WXYH.base + "/sys/user/getVerifyCode.do"
};
	var needCode =false;
	function login(e){
		try{
			e.preventDefault();
			e.stopPropagation();
		}catch(e00){
		}
		if(!($("#ff1").form("validate")) ){
			$.messager.alert(window.msgs.msgtitle_alert,window.msgs.login_input_namepwd,"error",function(){
				if($.trim($("#userid").val())==""){
					document.getElementById("userid").focus();
					return;
				}
				if($.trim($("#password").val())==""){
					document.getElementById("password").focus();	
					return;
				}
				return;
			});
			return false;
		}
		if($.trim($("#imgcode").val())==""){
			$.messager.alert(window.msgs.msgtitle_alert,window.msgs.login_input_imgcode,"error",function(){
				document.getElementById("imgcode").focus();	
				return false;
			});
			return false;
		}
		var publicKeyExponent;
		var publicKeyModulus;
		$.ajaxSettings.async = false;
		$.getJSON(appLogin.urlGetKey, function(data){
			publicKeyExponent = data.exponent;
			publicKeyModulus = data.modulus;
			});
		$.ajaxSettings.async = true;
		RSAUtils.setMaxDigits(200);  
   		var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
   		var encrypedPwd = RSAUtils.encryptedString(key,$("#password").val().split("").reverse().join(""));
   		var p = {
			userid:$("#userid").val()
			,password : encrypedPwd
			,imgcode : $("#imgcode").val()
		};
		$.ajax({
			url: appLogin.urlLogin,
			data:p,
			type:"post",
			success:function(data,status,xhr){
				if(typeof data === "string"){
					data = $.parseJSON(data);
				} 
				if(data.retcode==0){
					location.replace("index.html");
				}else{
					$.messager.alert(window.msgs.msgError_Tips_Title,data.retmsg);
					myReload(e);
					return false;
				}
			}
			,error:function (xhr) {
				$.messager.alert(window.msgs.msgError_Tips_Title,window.msgs.communication_error);
			}
		});
		return;
	}

//����س�
function onKey(){
	if(window.event.keyCode == 13){
		if(document.activeElement.id == "userid"){//�������û����س�������Ϊ���������
			if(document.activeElement.value!=null&&document.activeElement.value!=''){
				document.getElementById("password").focus();
				return false;
			}
		}else if(document.activeElement.id == "password"){//��������������򣬰��س�������Ϊ��֤�������
			if(document.activeElement.value!=null&&document.activeElement.value!=''){
				document.getElementById("imgcode").focus();
				return false;
			}
		}else if(document.activeElement.id == "imgcode"){//��������������򣬰��س�������Ϊ��֤�������
			if(document.activeElement.value!=null&&document.activeElement.value!=''){
				$(".loginbtn").focus();
				return false;
			}
		} else {//����������λ�ã����ύ
			login(e);
		}
	}
}
$(function(){
	$(".verifyimg").attr('src',appLogin.urlVerifyImg);
	document.getElementById("userid").focus();
	checkNeedRestoreCookie();
});
function checkNeedRestoreCookie(){
	var cookieName = "";
	if(getCookie){
		cookieName = getCookie("pn");
		if(cookieName && cookieName!=""){
			$("#userid").val(cookieName);
			$("#rememberme").get(0).checked = true;
			$("#password").focus();
		}else{
			$("#userid").focus();
		}
	}
}

function myReload(e){
	$(".verifyimg").attr('src',appLogin.urlVerifyImg+ "?nocache=" + new Date().getTime());
	if(document.all){ //�ж�IE�����
	  	window.event.returnValue = false;
	}
	else{
		e.preventDefault();
		e.stopPropagation();
	};
}
