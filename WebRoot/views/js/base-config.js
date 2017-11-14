//base-config.js
window.WXYH = {};
window.WXYH.base =  "/CR";
app = {};
var regular = /^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\?\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\-\，\、\[\]\,]+.*)$/;
var reg = /^1[3|4|5|8|9]\d{9}$/;
/**
* 为grid添加自己重新加载方法,解决带条件查询的时候分页栏不能回到首页问题
*/
app.myreload = function(newposition){
               //显示第一页数据  
               $(newposition).datagrid("options").pageNumber = 1;  
               //分页栏上跳转到第一页  
               $(newposition).datagrid('getPager').pagination({pageNumber: 1});
               $(newposition).datagrid("reload");
			};
var winOpt = {resizeable:false,minimizable:false,maximizable:false,closable:false,draggable:false,collapsible:false};
function setupAjax(){
	$.ajaxSetup({cache:false
		,timeout:30000
		,beforeSend:function(xhr,opts){
			if(opts.url.indexOf("_=")>=0){
				return;
			}
			opts.url +="?_t="+(+(new Date()));				
		}
		,complete:function(xhr){				
			if(xhr.statusText!=undefined && xhr.status==0 && xhr.statusText=="timeout"){
				$.messager.alert("超时","操作超时！请返回重试！","info",function(){xhr.abort();});
			}		
		}			
	});	
}
setupAjax();
$(document).ajaxComplete(function(event, xhr, settings) {	
  	var data;	  	
  	if (settings.dataType=="script" || settings.dataType=="html"){
  		return;
  	}
  	if(   xhr.responseText){
  		data = $.parseJSON(xhr.responseText);
  		if(data && data.retcode==-1000){
  			top.location.reload();
  		}
  	}
});
function checkJsonData(data){
	if(typeof data === "string"){
		data = $.parseJSON(data);
	}
	return data;
}
function compareDateWithMs(ms1,ms2){	
	return (ms2>=ms1)
}
function getCookie(c_name){
	if(document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if(c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if(c_end==-1){
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}

function setCookie(c_name, value, expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

window.formatString = function(str, key,val){
	return str.replace(key,val);
};
window.queryString = (function(){
  		var m = window.location.search.replace(/.*\?/, "").split("&");
		var m2 = {};
		jQuery.map(m,function(v,idx){ var c = v.split("=");m2[c[0]] = c[1]; });
		return m2;
	})();

function loadbuttons(app){
	app.hasQuery = false;
	app.opers = [];
	//控制功能按钮
	$.ajax({
		url:window.WXYH.base+"/sys/menu/oper.do"
		,async:false
		,data:"menuid="+window.queryString["mid"]
		,success:function(data){
			var optbtnlist = $("*[data-oper]");
			optbtnlist.hide();
			app.oper_list = data.oper_list;
			$("a[class*=easyui-linkbutton][data-oper]").linkbutton("disable");
			$("input[type=button][data-oper],button[data-oper]").attr("disabled","disabled");
			if(data!=null&&data.oper_list!=null&&data.oper_list.length>0){
				$.each(data.oper_list,function(idx,val){
					var operkey = val.operkey;
					if(true){
						app.hasQuery = true;
					}
					app.opers[operkey] = 1;
					var $btn = $("*[data-oper="+operkey+"]");
					$btn.each(function(i){
						var btn=$(this);
						btn.show();
						if(btn.hasClass("easyui-linkbutton")){
							btn.linkbutton("enable");
						}else{
							btn.removeAttr("disabled");
						}
					});
					
				});
			}
		}
	});
}


var maskTemplate = "<div class='topMask' style=\"background:white;width: 10%; height: 10%;line-height:"+$(window).height()/2+"px;vertical-align:middle; text-align: center; background-color: white; position: absolute; top: 0px; left: 0px; z-index: 9999999;\">" + 
		   "<img style=\"\" src=\""+window.WXYH.base + "views/images/waiting.gif\" />" +
		   "</div>";
function showPageMask(){
	var bodyFirst = $("body").find("*").first();
	bodyFirst.before(maskTemplate);
}
function removePageMask(){
	$(".topMask").remove();
}
/*blockUI*/
function unblockUI(){
	$.unblockUI();
}
function blockUI(){
	$.blockUI({
		message:"<div style='margin-left:0px;width:100%;font-size:20px;'><center>加载中...请稍候</center></div>"
		,css:{
			"background":"none",
			"border":"none",
			"color":"#FFFFFF",
			"font-size":"36px",
			"margin":"0 0 0 0",
			"left":"0px",
			"width":"100%"
		}
	});
	// $("body").animate({
	// 	backgroundColor:"rgb(120,120,120)"},
	// 	0, function() {
	// 	$(this).animate({
	// 		backgroundColor: "rgb(225,85,9)"},
	// 		2000);
	// });
}
/*blockUI end */

///将menu_list的数组，递归构造成easyui tree控件可用的数据结构
/// [{id:1,text:"名称",state:"closed/open",children:[{子菜单集合},...{}] },...,{} ]
function parseToEasyUITreeNodeObject(data,menulevel){
	var arr = [];
	var item = null;
	for(var i = 0;i<data.length;i++){
		if(data[i]["menuid"]!=undefined && data[i].url!="" ){
			window.G.menu[data[i].menuid] = window.WXYH.base + "/" + data[i].url;
		}
		item = {id:data[i]["menuid"]==undefined?"0":data[i].menuid
			,text:data[i].menuitem
			,state:(menulevel==0&&i==0)?"open":"closed"
			,url:data[i]["url"]!=undefined?(window.WXYH.base + data[i].url):""
			,children:[]
			}
		if(data[i]["menu_list"]!=undefined&&data[i].menu_list.length>0){
			var c = parseToEasyUITreeNodeObject(data[i].menu_list,(menulevel+1));
			item.children=c;
		}else{
			item.state = "";
		}
		arr.push(item);
	}
	
	
	return arr;
}


if(window.G==undefined){
	var w = window;
	window.G = top.window.G||{};
	window.G.fillTemplate = function(tmpl,obj){
		var html = tmpl;
		for(var key in obj){
			var regexp = eval("/\{" + key + "\}/ig");			
			html = html.replace(regexp,obj[key]);
		}
		return html;
	};
	 
//	if(!window.G.alert){
		window.G.alert = function(msg,url){
			if(url!=null&&url!=''&&url!=undefined){
				$.messager.alert(window.msgs.msgtitle_alert,msg,'info',function(){
					location.replace(url);
				});
			}else{
				$.messager.alert(window.msgs.msgtitle_alert,msg);
			}
		};
		

//	}
	
}




function addTab(title, url,oldtitleprefix){  
	//只开一个tab
	var tabs = $("#mainregion").tabs("tabs");
    $.each(tabs,function(i,n){
        $("#mainregion").tabs('close', $(n).panel('options').title);
    })
	var content = "<iframe scrolling=\"auto\" frameborder=\"0\"  src=\""+url+"\" style=\"width:100%;height:99%;\"></iframe>"; 
    $('#mainregion').tabs('add',{ 
        title:title,  
        content:content, 
		closable:false , 
        toolPosition:'left',
        tools:[
			    {
//			    	iconCls:'icon-close',
					handler:function(){
						closeTab(title); 
					}

			    }
        ] 
    });
    
//	var choosedIdx = -1 ;
//	for(var ti = 0;ti<tabs.length;ti++){
//		var pOpts = $($("#mainregion").tabs('getTab',ti)).panel('options');
//		if(oldtitleprefix && pOpts.title!=undefined ){
//			if(pOpts.title.indexOf( oldtitleprefix )>=0 && title.indexOf(oldtitleprefix)>=0){
//				choosedIdx = ti;
//				break;
//			}
//		}else{
//			continue;
//		}
//	}
//	$width = $('#mainregion').tabs('options').width;
//	var content = "<iframe scrolling=\"auto\" frameborder=\"0\"  src=\""+url+"\" style=\"width:100%;height:99%;\"></iframe>"; 
//    // if ($('#mainregion').tabs('exists', title)){
//    // $('#mainregion').tabs('select', title);
//    if(choosedIdx>-1){	   	
//   		var tab = $("#mainregion").tabs('getTab',choosedIdx);   		
//   		$('#mainregion').tabs('update', {
//				tab: tab,
//				options: {
//					title: title,
//					content: content
//				}
//			});
//    	$('#mainregion').tabs('select', title);
//    } else {  
//    	if ($('#mainregion').tabs('exists', title)){ 
//	   		$('#mainregion').tabs('select', title);  
//	   	}else{       
//	        $('#mainregion').tabs('add',{ 
//	            title:title,  
//	            content:content, 
//				closable:false , 
//	            toolPosition:'left',
//	            tools:[
////	                   {  
////				        iconCls:'icon-reloadsmall',  
////				        handler:function(){  
////				        			refreshTab("");
////							    }  
////					    },
//					    {
//					    	iconCls:'icon-close',
//							handler:function(){
//								closeTab(title); 
//							}
//
//					    }
//	            ] 
//	        });
//    	}
//    }  
} 


function formatDateToYMD(t){
	var y=t.getFullYear();
	var m=t.getMonth()+1;
	if(m<10) m='0'+m;
	var d=t.getDate();
	if(d<10) d='0'+d;
	return y+"-"+m+"-"+d;
}
function formatDateToYMDHMS(t){
	var y=t.getFullYear();
	var m=t.getMonth()+1;
	if(m<10) m='0'+m;
	var d=t.getDate();
	if(d<10) d='0'+d;
	var h=t.getHours();
	if(h<10) h='0'+h;
	var mi=t.getMinutes();
	if(mi<10) mi='0'+mi;
	var s=t.getSeconds();
	if(s<10) s='0'+s;
	return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;
}


function closeTab(title){
	var pp = $('#mainregion').tabs('getTab',title);//$('#mainregion').tabs('getSelected');
	var index = $('#mainregion').tabs('getTabIndex',pp); 
	var tab =  $("#mainregion").tabs("getTab",index);
	$('#mainregion').tabs('close', index);
}

function refreshTab(title){
	var pp = $('#mainregion').tabs('getTab',title);//$('#mainregion').tabs('getSelected');
	var index = $('#mainregion').tabs('getTabIndex',pp);
	var tab =  $("#mainregion").tabs("getTab",index);
	var ifr = tab.find("iframe").get(0);
	var href = ifr.contentDocument.location.href;
	href = href.replace("#","");
	ifr.contentDocument.location.replace(href);
}

Array.prototype.pushAll=function(list){
	if($.isArray(list)){
		for(var i = 0 ;i<list.length;i++){
			this.push(list[i]);
		}
	}
}

$.extend($.fn.validatebox.defaults.rules, {  

    equals: {  
        validator: function(value,param){  
            return value == $(param[0]).val();  
        },  
        message: '两次输入的密码不相同。'  
    } 
    ,pwd:{
    	validator:function(value,param){
    		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
        	var mediumRegex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
        	var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 

        	/*if (enoughRegex.test(value)) { 
        		return false; 
        		 //密码小于六位的时候，密码强度图片都为灰色 
        	} 
        	else */if (strongRegex.test(value)) { 
        		return true; 
        		//密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
        	} 
        	else if (mediumRegex.test(value)) {
        		return true;  
        		//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
        	} 
        	else { 
        		return false;  
        		 //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
        	} 
        },  
        message: '密码强度弱，请输入6-16位密码，必须包括数字和字母!'  
    },
    mobile: {// 验证手机号码
        validator: function (value) {
        	 
            if(reg.test(value)&&!(regular.test(value))){
             	return true;
             } else{
             	return false;
             }
        },
        message: '手机号码格式不正确'
    },
    
    checkspecial:{
    	validator:function(value){
    		 if(value!=""){
        		 
     		    if(regular.test(value)){
     		    return false;
     		    }
     		    return true;
     		    }
     	},message:"输入的数据含有非法字符"
     },
     checkurl:{//检验输入url是否含有非法字符
      	validator:function(value){
      		var pattern  = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>?~！@#￥……&*（）——|{}【】’‘《》；：”“'。，、？]");
      		 if(value!=""){
       		    if(pattern.test(value)){
       		    return false;
       		    }
       		    return true;
       		    }
       	},message:"输入的数据含有非法字符"
     },
});

function checkUnnormal(value){  
    var patrn=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;  
    if(patrn.test(value)){  
        alert("提示信息：您输入的数据含有非法字符！");  
        return false;     
    }
    return true;  
} 
