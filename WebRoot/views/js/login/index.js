var appIndex = {
		urlGetFunctions:top.window.WXYH.base + "/sys/user/menu.do"
		,urlLogout : top.window.WXYH.base + "/sys/user/logout.do" 
};

$('#mainregion').tabs({
		headerWidth:200
		,toolPosition:"left"		
});

var startCheckImgCode = function () {
	 $.post(appImgCode.urlgetcode,function(data){
	 	data = checkJsonData(data);
	 	if(data.fileName!=undefined && data.fileName!=""){
	 		appImgCode.fileName = data.fileName;
	 		$("#imgcode_pic").attr("src",data.imgcode_url);
	 		$("#imgDialog").dialog("open").dialog("center");
	 		window.clearTimeout(appImgCode.timeoutID) ;
	 		appImgCode.timeoutID = -1;
	 	}else{
	 	}
	 });
};


$(function(){

});


var G = {
	config:{}
	,menu:{
	
 	}
};
(function(w,g){

	w.W = {};
	W.upload = {};

	W.upload.suc = function(msg, type, formId, fileid){
		var pp = $('#mainregion').tabs('getSelected');
		var index = $('#mainregion').tabs('getTabIndex',pp);
		var tab =  $("#mainregion").tabs("getTab",index);
		var ifr = tab.find("iframe").get(0);
		var href = ifr.contentDocument.location.href;		
		if(fileid!=undefined){
			ifr.contentWindow.W.upload.suc("",type,formId,fileid);
			top.G.alert("上传成功！");	
		}else{
			
		}
		
	};

	W.upload.err = function(msg,type,formId){
		var pp = $('#mainregion').tabs('getSelected');
		var index = $('#mainregion').tabs('getTabIndex',pp);
		var tab =  $("#mainregion").tabs("getTab",index);
		var ifr = tab.find("iframe").get(0);
		ifr.contentWindow.W.upload.err();
		top.G.alert("上传失败！");
	};
	
	 

 
})(window,G);
function getTemplate(name){
	return $("#"+name).html();
}
$.ajaxSetup({
	beforeSend:function(){}
});

$.getScript(appIndex.urlGetFunctions).done(function(script, textStatus) {
	
		G.config = config;
		
		if(config ==undefined || config.sysuser == undefined || config.sysuser.userid.length<=0){
			G.sysuser = "grgtest";//config.sysuser;
		}else{
			G.sysuser = config.sysuser;
		}
		var sysuser = G.sysuser;
		$("#user").html(sysuser.username);
		if(sysuser.role_list!=undefined){
			var roleslist = $.map(sysuser.role_list,function(v,i){
				return v.rolename;
			}).join("|");
			$("#roles").html(roleslist);
		}		 

 		 
}).complete(function(xhr,errorMsg){ 
	
	if(xhr.responseText.indexOf("{")==0){
		var body = xhr.responseText ;
		var respObj = eval("("+body+")");
		
		
		if(respObj.retcode==-1000){
 
			 alert("用户已经超时或未登录，请重新登录");
			top.location.replace("/login.html");
			return;
		}else if(respObj.retcode==-2000){
			alert("用户没有权限，请联系管理设置");
			return;
		}
	} 
	 
	addmenu();
		
});




function logout(){
	$.messager.confirm('确认','确认退出系统？',function(r){    
	    if (r){    
	    	window.location.href="sys/user/logout.do?method=add"; 
	    }    
	});
}
 
function addmenu(){
var m = window.G.config.menu_list; 
	 
					delete G.menu;
					G.menu = {};
					var html = "";
					$(".mainmenu").html("");3
					//重构树控件需要的数据结构，并将菜单ID与链接保存到 window.G.menu 对象中
					//格式：{"menuid":"url","menuid","url"}
					var menuArr = parseToEasyUITreeNodeObject(m,0);
					var item = null;
					//alert(appIndex.urlLogout)
					item = {id:'8E4073E0CCE54F02B661B0F5C45BEEE6'
								,text:'退出系统'
								,state:"closed"
								,url:'/'
								
								};
						
					 $(".mainmenu").tree({
									data:menuArr
									,onClick:function(node){
										//点击菜单后，判断节点数据的id是否为0，
										//只有大于0才是子叶菜单，有相关链接数据，然后调用addTab方法添加
										//一个Tab页在index.html的主区域中。
										var data = $(this).tree("getData",node.target);
										//alert("1="+data.id);
										if(data.id!=null&&data.id!=''){
											if(G.menu[data.id]!=undefined){
												addTab(data.text,G.menu[data.id]+"?mid="+data.id +"&t="+(new Date().getTime())	);
											}else{
												if(data.id=='8E4073E0CCE54F02B661B0F5C45BEEE6'){
													$.messager.confirm('确认','您确认退出系统？',function(r){    
													    if (r){    
													    	window.location.href="sys/user/logout.do?method=add"; 
													    }    
													});  
												}
												$(this).tree("toggle",node.target);
											}
										}
										
									}	
								});	
}
$("<div class='winBFS' style='width:72px;height:72px;text-align:center;' ><img style='width:72px;height:72px;' src='./views/images/waiting.gif'/></div>").appendTo("body");
$(".winBFS").window({modal:true,title:"加载中...",width:150,height:150,doSize:true	})
				.window(top.window.winOpt).window("close")
				.window("center");