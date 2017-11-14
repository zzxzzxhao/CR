var appSysUser = {
	base : location.href
	,urlSysUserList : top.window.WXYH.base + "/sys/user/list.do"
	,urlSysUserSave : top.window.WXYH.base + "/sys/user/add.do"
	,urlSysUserEdit : top.window.WXYH.base + "/sys/user/edit.do"
	,urlGetKey : top.window.WXYH.base + "/sys/user/getKey.do"
	,urlSysUserResetPwd : top.window.WXYH.base + "/sys/user/password/reset.do"
	,urlRoleList: top.window.WXYH.base + "/sys/role/list.do"
	,urlSysUserDelete : top.window.WXYH.base + "/sys/user/disable.do"
	,urlDeleteSysUserByUserId : top.window.WXYH.base + "/sys/user/deleteSysUser.do"
	,urlIsUserExist : top.window.WXYH.base + "/sys/user/isUserExist.do"
	,pSysUserList : {page_number:1,page_size:10,roleid:null,keyword:null}
	,selectedId:-1
	,selectedRoleData : {}
	,tmplMapRoleItem : ""
	,roleList : []
	,formStatus : "new"
};

var publicKeyExponent;
var publicKeyModulus;

function submitForm(){
	if( ! $("#ff").form("validate") ){
		top.G.alert(window.msgs.sysuser_please_check_form_detail);
		return false;
	}
	var roles = $("input[name=roleid]");
	for(var i = 0;i<roles.length;i++){
		if(roles[i].checked == true){
			
		}
	}
	$.ajaxSetup({
		beforeSend:function(xhr,opts){
			opts.url += "?_t=" + (new Date()).getTime();
		}
		,complete:function(){
		}
	});
    var parms;
    if($("#id").val()==0){
    	var p1 = $("#password").val();
    	var p2 = $("#passwordcfm").val();
    	RSAUtils.setMaxDigits(200);  
    	var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
    	$("#password").val( RSAUtils.encryptedString(key,p1.split("").reverse().join("")));
    	$("#passwordcfm").val( RSAUtils.encryptedString(key,p2.split("").reverse().join("")));
    	parms = $("#ff").serialize();    
    }else{
    	var p1 = $("#password").val();
    	var p2 = $("#passwordcfm").val();
    	RSAUtils.setMaxDigits(200);  
    	var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
    	$("#password").val( RSAUtils.encryptedString(key,p1.split("").reverse().join("")));
    	$("#passwordcfm").val( RSAUtils.encryptedString(key,p2.split("").reverse().join("")));
    	parms = $("#ff").serialize();    
    }
    
    var url = appSysUser.formStatus == "edit"?appSysUser.urlSysUserEdit:appSysUser.urlSysUserSave;
    $.post(url,parms,function(data){
		if(typeof data === 'string'){
			try{
				data = $.parseJSON(data);
			}catch(e0){
				top.G.alert(window.msgs.return_json_error);
				return;
			}					
		}
		if(data.retcode==0){
			top.G.alert(window.msgs.savesuccess,appSysUser.base);
		}else{
			top.G.alert(data.retmsg);
			
		}
	}) ;
}  
function clearForm(){  
    $('#ff').find("input[type=text],input[type=password]").val(""); 
    $("#ff").find("input[type=checkbox]").removeAttr("checked");
    $("#bankname").val("-");
}  

function beforeInitRole(callbacks){
	$.post(appSysUser.urlRoleList,"",function(data){
		if(data!=undefined){
			if(data.retcode==0){
				appSysUser.roleList = data.role_list;
				for(var k in callbacks){
					if(typeof callbacks[k] === "function"){
						callbacks[k](appSysUser.roleList);
					}
				}
			}
		}
	});
}
function iniRolePane(data){
	var list = data;
	var tmpDiv = $("<div></div>");
	var holder = $(".roleHolder1");	
	for(var i = 0;i<list.length;i++){
		var html = top.G.fillTemplate(appSysUser.tmplMapRoleItem,list[i]);
		tmpDiv.append(html);
	}
	holder.html( tmpDiv.html());
}

function initRoleFilter(rolelist){
	$("#lblroles").html(window.msgs.sysuser_filter_roles_label);
	var datas = [{id:-1,text:window.msgs.list_all,selected:true}];
	var roles = $.map(rolelist,function(item,idx){
					return {id:item.roleid,text:item.rolename};
				});
	datas.pushAll(roles);
	$("#rolesfilter").combobox({
		required:true
		,multiple:false
		,width:180
		,editable:false
		,valueField:"id"
		,textField:"text"
		,data:datas
		,onSelect:function(re){
		}
	});
}
//ready
$(document).ready(function() {
	blockUI();
	if(appSysUser.hasQuery==false){
		$("body").html(window.msgs.no_query_right);
		unblockUI();
		return;
	}

	unblockUI();


	$(window).on("resize",function(e){
		$("#tbsysuser").datagrid("resize",{width:$(window).width()});
	});
	appSysUser.tmplMapRoleItem = $("#tmplMapRoleItem").html();
	$("#doSearch").html(window.msgs.common_search);
	$("#keyword").attr("placeholder",'登录账户/用户名');
	beforeInitRole([iniRolePane,initRoleFilter]);
	 
	//setup 公众帐号下拉框 
	//setupAccidx();

	$("#doSearch").on("click",function(e){
		$("#tbsysuser").datagrid("reload");
	});
	$("#userid").on("focus",function(e){
		$("#checkIcon").hide();
	});
	
	$.getJSON(appSysUser.urlGetKey, function(data){
		publicKeyExponent = data.exponent;
		publicKeyModulus = data.modulus;
		});
	
	$("#userid").on("blur",function(e){
		var userid = $(this).val();
		if(userid==null||userid==''||userid==undefined){
			return false;
		}
		$.ajax({
			url:appSysUser.urlIsUserExist,
			type:"post",
			data: {"userid" : userid},
			dataType:"json",
			success:function (data,status,xhr) {
				if(typeof data === "string"){
					data = $.parseJSON(data);
				}				
				if(data.retcode==0){		
					$("#checkIcon").attr("src","../../../views/images/xx.gif");
					top.G.alert("用户已存在");
					$("#userid").val("");
				} else if(data.retcode==-1) {
					$("#checkIcon").attr("src","../../../views/images/yy.gif");
					$("#userid").attr("pass","1");
				}
				$("#checkIcon").show();
			},
			error:function (err) {
				loadError.apply(this,arguments);
			}
		});
	});
	 //点击树以外部分隐藏树
	 $(document).click(function(){
		 $('#sysDeptTree').hide();
	 });
	 //点击选择部门树时阻止隐藏事件
	//form
	 
	$('#ff').form({  
	    url:appSysUser.urlSysUserSave
	    ,onSubmit: function(){  
	        // do some check  
	        // return false to prevent submit;  
	    },  
	    success:function(data){  
	    	if(typeof data === "string"){
	    		data = $.parseJSON(data);
	    	}
	    	if(data.retcode == 0){
	    		top.G.alert(window.msgs.savesuccess,appSysUser.base);
	    		//location.replace(appSysUser.base)	
	    	}else{
	    		top.G.alert(data.retmsg);
	    	} 
	    }  
	});
	
	//loader
	var loader = function(that,params,success,loadError){
		var opts = that.datagrid("options");
		var pager = that.datagrid('getPager');
		appSysUser.pSysUserList.page_number = params.page,appSysUser.pSysUserList.page_size=params.rows;
		var roleId = $("#rolesfilter").combobox("getValue");
		var keyword = $("#keyword").val();
		if(roleId!=-1&&roleId!=""){
			appSysUser.pSysUserList.roleid = roleId;
		}else{
			delete appSysUser.pSysUserList.roleid ;
		}
		if(keyword!=""){
			appSysUser.pSysUserList.keyword = keyword;
		}else{
			delete appSysUser.pSysUserList.keyword;
		}
		$.ajax({
			url:opts.url,
			type:"post",
			data: appSysUser.pSysUserList,
			dataType:"json",
			success:function (data,status,xhr) {
				if(typeof data === "string"){
					data = $.parseJSON(data);
				}				
				if(data.retcode==0){					
					var list = data.sysuser_list;	
					that.data().datagrid["cache"] = data;					
					success({"total":data.total_count,"rows":list});	
					pager.pagination({
						total : data.total_count,
						pageNumber : data.page_number,
						beforePageText : "显示第",
						afterPageText : "页 共" + data.page_total + "页",
						/*displayMsg :"当前显示从{from}到{to},共{total}记录"*/
					});
					removePageMask();
					return true;
				}
				if(data.retcode==-2000){
					top.G.alert(data.retmsg);
					return true;
				}
			},
			error:function (err) {
				loadError.apply(this,arguments);
			}
		});
	};

	//初始化表格
	$("#tbsysuser").datagrid({
		url: appSysUser.urlSysUserList,
		idField:"id",
		toolbar:"#tb",
		autoRowHeight:true,
		fitColumns:true,
		showFooter:true,
		pagination:true,
		pageNumber:1,
		pageSize:10,
		nowrap : false,
		singleSelect:true,
		selectOnCheck: false,
		rownumbers:true,
	    columns:[[  
	        {field:'userid',title:'登录账户',width:150},
	        {field:'username',title:'用户名',width:200},
	        {field:'role_list',title:window.msgs.sysuser_roles ,width:240,formatter:function(v,r,i){
	        	var v2 ;
	        	if(v.length != undefined){
	        		v2 = $.map(v,function(itm,idx){
	        			return itm.rolename;
	        		});
	        		return v2.join(",");
	        	}else{
	        		if(v.rolename!=undefined){
	        			return v.rolename;
	        		}
	        	}

	        }},
	        {field:"disable",title:window.msgs.sysuser_userstate,width:100,formatter:function(val,row,idx){
	        	var txt = (val==0?window.msgs.sysuser_userstate_actived:window.msgs.sysuser_userstate_disabled);
	        	var color = (val==0?window.msgs.green:window.msgs.red);
	        	return "<span style='color:"+color+"'>"+txt+"</span>";
	        }}
	    ]],
	    loader:function (params,success,loadError) {		    	
	    	var that = $(this);
	    	loader(that,params,success,loadError);
	    },
	    onClickRow:function(rowIndex, rowData){		    	
	    	appSysUser.selectedRoleData = rowData;
	    	appSysUser.selectedId = rowData.userid;
	    	
	    },
		onLoadSuccess:function(data){
			$("#tbsysuser").datagrid('unselectAll');
			appSysUser.selectedRoleData = {};
		}
	});
	

	//添加用户
	$("#addNewUser").on("click",function(e){
		$("#password,#passwordcfm").closest("tr").show();
		clearForm();		
		$("input[name=roleid]").removeAttr("checked");		
		$(".addUserWin").window({title:window.msgs.sysuser_panel_createuser}).window("open").window("center");
		$("#id").val(0);
		$("#userid").removeAttr('readonly');
		$("#userid").css("background-color","white");
		$("btnSaveUser").focus();
		appSysUser.formStatus = "new";
	});
	$("#btnSaveUser").click(function(e){
		submitForm();
	});
	//编辑用户
	$("#editForm").click(function(e){
		if(appSysUser.selectedId==-1){
			top.G.alert(window.msgs.sysuser_before_op);
			return;
		}		
		$("#password,#passwordcfm").removeClass();
		clearForm();
		$("#ff").form("load",appSysUser.selectedRoleData);
		$("#password,#passwordcfm").closest("tr").hide();
		$("#userid").attr("readonly","readonly");
		$("#userid").css("background-color","rgb(235, 235, 228)");
		//$("#password").val("123456");
		//$("#passwordcfm").val("123456");
		$("#id").val(1);
		$(".addUserWin").window({title:window.msgs.sysuser_panel_edituser}).window("open").window("center");
		var hasError = false;
		
		
		list = appSysUser.selectedRoleData.role_list;
		$.map(list,function(itm,idx){
			var id = itm.roleid;
			$("#chkRole"+id).attr("checked",true);
		});
		appSysUser.formStatus = "edit";
		$("#orgcode").val(appSysUser.selectedRoleData.orgcode);
	});

	//重置密码
	$("#resetPwd").click(function(e){
		if(appSysUser.selectedId==-1){
			top.G.alert(window.msgs.sysuser_before_op);
			return;
		}
		$("#newPwd").val("");
		$("#chgPwdWin").window("open").window("center");
		$(".window-mask").height($("body").height());
	});

	$("#cancelRoles").click(function(e){
		$(".mapRoleWin").window("close");
	});
	$("#btnCanceluser").on("click",function(e){
		$("#addUserWin").window("close");		
		$(".tooltip").hide();
	});
});

//禁用系统用户
$("#delUser").on("click",function(e){

	if(appSysUser.selectedId==-1){	
		top.G.alert(window.msgs.sysuser_before_op);
		return;
	}
	$.messager.confirm("确认","请确认是否禁用此用户!",function(r){
		if(r){
			var parms = "userid="+appSysUser.selectedId + "&disable=1";
			
			$.ajaxSetup({
				beforeSend:function(xhr,opts){
					opts.url += "?_t=" + (new Date()).getTime();
				}
				,complete:function(){
				}
			});
			$.post(appSysUser.urlSysUserDelete,parms,function(data){
				
				top.window.setupAjax();
				
				if(data.retcode==0){
					top.G.alert("禁用成功！");
					$("#tbsysuser").datagrid("reload");
				}else{
					top.G.alert(data.retmsg);
					$("#tbsysuser").datagrid("reload");
				}				
			});
		}else{
			top.G.alert("操作已取消!");
			return;
		}
	});
});

//删除系统用户
$("#deleteUser").on("click",function(e){

	if(appSysUser.selectedId==-1){	
		top.G.alert(window.msgs.sysuser_before_op);
		return;
	}
	$.messager.confirm("确认","请确认是否删除此用户!",function(r){
		if(r){
			var parms = "userid="+appSysUser.selectedId + "&disable=1";
			
			$.ajaxSetup({
				beforeSend:function(xhr,opts){
					opts.url += "?_t=" + (new Date()).getTime();
				}
				,complete:function(){
				}
			});
			$.post(appSysUser.urlDeleteSysUserByUserId,parms,function(data){
				top.window.setupAjax();
				if(data.retcode==0){
					top.G.alert("删除成功！");
					$("#tbsysuser").datagrid("reload");
				}else{
					top.G.alert(data.retmsg);
					$("#tbsysuser").datagrid("reload");
				}				
			});
		}else{
			top.G.alert("操作已取消!");
			return;
		}
	});
});



$("#savepwd").on("click",function(e){
		var s = $("#newPwd").val();
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
		var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 

		if (strongRegex.test(s)) { 
		} 
		else if (mediumRegex.test(s)) { 
		} 
		else {
			top.G.alert(window.msgs.sysuser_form_passwordvalid);
			return false;
		} 
	    RSAUtils.setMaxDigits(200);  
		var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
		var encrypedPwd = RSAUtils.encryptedString(key,s.split("").reverse().join(""));
		var postData = "userid="+appSysUser.selectedId + "&newpassword=" + encrypedPwd;
		$.ajaxSetup({
			beforeSend:function(xhr,opts){
				opts.url += "?_t=" + (new Date()).getTime();
			}
			,complete:function(){
			}
		});		
		$.post(appSysUser.urlSysUserResetPwd,postData,function(data){
			if(data!=undefined){
				if(data.retcode == 0){
					top.G.alert("修改成功!");
					$("#chgPwdWin").window("close");
					$("#newPwd").val("");
					setupAjax();
				}else{
					top.G.alert(data.retmsg);
	
				}
			}
		});
			
	
		removePageMask();		
		
});