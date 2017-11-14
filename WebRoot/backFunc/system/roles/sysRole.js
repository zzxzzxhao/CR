
var appRole = {
	base : location.href
	,urlRoleList :  top.window.WXYH.base + "/sys/role/list.do"
	,urlRoleListByPage :  top.window.WXYH.base + "/sys/role/listByPage.do"
	,pRoleList : {}
	,urlRoleSave :  top.window.WXYH.base + "/sys/role/save.do"
	,urlRoleDelete: top.window.WXYH.base + "/sys/user/deleteRoles.do"
	,urlRoleOperList : top.window.WXYH.base + "/sys/role/oper/list.do"
	,urlRoleOperSave : top.window.WXYH.base + "/sys/role/oper/save.do"
	,pModuleList:{}
	,selectedRole:null
	,pSysRoleList : {page_number:1,page_size:10}
	,selectedRoleid : -1
	,tmplModuleList:""
	,tmplUserToAdd : ""
	,tmplAddedUser : ""
	,grantFuncList : []
	,grantFuncMap : []
	,isSaving : false
	,roleFormStatus : "new"
};


function addRole(opts){
	if(opts["rolename"]==undefined || opts.rolename =="" ){
		top.G.alert(window.msgs.sysuser_role_please_type_role_name);
		$("#btnSave").attr("disabled",false);
		return;				
	}
	var map1 = $.map(opts,function(val,key){
		return key+"="+encodeURIComponent(val);
	});

	$.ajax({
		url: appRole.urlRoleSave
		,type:"post"
		,data: map1.join("&")
		,success:function(data,status,xhr){
			if(typeof data === "string"){
				data = $.parseJSON(data);
			}	
			if(data!=undefined){
				if(data.retcode==0){
					appRole.isSaving = false;
					top.G.alert(window.msgs.savesuccess,appRole.base);
					//location.replace(appRole.base);
				}else{
					top.G.alert(data.retmsg);
					appRole.isSaving = false;
					$("#btnSave").attr("disabled",false);
				}				
			}
		}
		,error:function(xhr){
			top.G.makeCommError();
			appRole.isSaving = false;
			$("#btnSave").attr("disabled",false);
		}
	});

}

function deleteRole(opts){
	if(appRole.isSaving){
		return;
	}
	appRole.isSaving = true;
	if(opts==undefined){
		top.G.alert(window.msgs.sysuser_role_before_op);		
		appRole.isSaving = false;
		return;
	}
	var postData = "id=" + opts;
	$.ajax({
		url: appRole.urlRoleDelete
		,type:"post"
		,data: postData
		,success:function(data,status,xhr){
			if(data!=undefined){
				if(data.retcode==0){
					appRole.isSaving = false;
					location.replace(appRole.base);
				}else{
					top.G.alert(data.retmsg);
					appRole.isSaving = false;
				}
			}
		}
		,error:function(xhr){
			top.G.makeCommError();
			appRole.isSaving = false;
		}
	});
}

function addUserToRole(opts){	
	if(opts==undefined){
		top.G.alert(window.msgs.sysuser_role_params_error);
		return;
	}
	if(opts["roleid"]==undefined || opts.roleid == 0||
		opts["userid"]==undefined || !$.isArray(opts.userid) ||
		opts.userid.length<=0
		){
		top.G.alert(window.msgs.sysuser_role_params_error);
		return;
	}
	var map1 = $.map(opts,function(val,key){
		var t = key+"="+encodeURIComponent(val);
		if(key=="userid"){
			t = "";
			var t1= [] ;
			var v1 = val;			
			for(var i =0;i<v1.length;i++){				
				t1.push(key+"="+v1[i]);
			}			
			t = t1.join("&");
		}
		return t;
	});
	$.ajax({
		url: appRole.urlAddUserToRole
		,type:"post"
		,data: map1.join("&")
		,success:function(data,status,xhr){
			if(data!=undefined){
				if(data.retcode==0){
					appRole.isSaving = false;
					top.G.alert(window.msgs.savesuccess,appRole.base);
					//location.replace(appRole.base);
				}else{
					top.G.alert(data.retmsg);
					appRole.isSaving = false;
				}
			}
		}
	});
}

var bodyOffset = {};
$("body").on("mousemove",function(e){	
	bodyOffset.top = e.pageY;
	bodyOffset.left = e.pageX;
});
function isSelectedOneRole(){
	if(appRole.selectedRole == null && appRole.selectedRoleid == -1 ){
			top.G.alert(window.msgs.sysuser_role_before_op);
			return false;
	}
	return true;
}
///将menu_list的数组，递归构造成easyui tree控件可用的数据结构
/// [{id:1,text:"名称",state:"closed/open",children:[{子菜单集合},...{}] },...,{} ]
function parseToEasyUITreeNodeObject(data,menulevel){
	var arr = [];
	var item = null;
	for(var i = 0;i<data.length;i++){
		if(data[i]["menuid"]!=undefined && data[i].oper_list!=undefined ){
			appRole.grantFuncMap[data[i].menuid] = data[i].oper_list;
		}
		item = {id:data[i]["menuid"]==undefined?"0":data[i].menuid
			,text:data[i].menuitem
			,state:(menulevel==0&&i==0)?"open":"closed"
			,url:data[i]["url"]!=undefined?(window.WXYH.base + data[i].url):""
			,children:[]
			};
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

function onRoleMappingClose(){
	
	setTimeout(function(){$("#funciddiv").html("");},500);
}

//构造功能列表
//<li data-id="1">功能</li>
var tmplFuncHolder = "<ul  class=\"funcid_holder\"><li><span class='func_name'></span></li></ul>";
var tmplFunc = "<li data-id=\"{funcid}\" data-isset=\"{isset}\" ><span><input type=\"checkbox\" name=\"funcid\" value=\"{funcid}\" /><span class=\"funcid_name\">{opername}</span></span></li>";
function buildAllFuncidList(list){
	//console.log("in",list);
	var tmpList = [];
	for(var i=0;i<list.length;i++){
		tmpList.pushAll(list[i].children);
	}
	for(var i=0;i<tmpList.length;i++){
		//console.log("in2",tmpList[i]);
		if(appRole.grantFuncMap[tmpList[i].id]!=undefined){
			var operlist = appRole.grantFuncMap[tmpList[i].id];
			//console.log(operlist);
			buildFuncidList(tmpList[i],operlist,"hidden");
		}
		
	}
}
function buildFuncidList(nodedata, operList,status){
	var existsHolder = $(".funcid_holder[id=ul"+nodedata.id+"]");
	
	if(existsHolder.length==1){
		$(".funcid_holder").stop(true,true);
		$(".funcid_holder").not(existsHolder).hide(0,function(){
		});
		existsHolder.show(0,function(){
			existsHolder.animate({
				left:"200px"
			},0,function(){
				existsHolder.animate({
					left:"0px"
				},600);
			});
		});
		return;
	}else{
		$(".funcid_holder").hide(90);
	}
	var holder = $(tmplFuncHolder);
	holder.attr("id","ul"+nodedata.id);
	holder.find(".func_name").html(nodedata.text);
	for(var i = 0;i<operList.length;i++){
		var html = window.G.fillTemplate(tmplFunc,operList[i]);
		var jHtml = $(html);
		if(operList[i].isset==1){
			//console.log("isset:",operList[i].isset);
			jHtml.find("input[type=checkbox]")
				.attr("checked","checked")
				.prop("checked","checked");
		}
		//add ppan 20140503
		if(operList[i].opername=='查看页面'){
			jHtml.attr('operkey','view');
			jHtml.find(".funcid_name").css({color:'green'});
		}
		//add ppan 20140503
		holder.append(jHtml);
	}
	
	//add ppan 20140503
	holder.find("input[type=checkbox]").on('click',function(){
		var checked=$(this).get(0).checked;
		if($(this).closest("li").attr('operkey')=='view'){
			if(!checked){
				$(this).closest("ul").find("input[name=funcid]")
				.attr("checked","")
				.prop("checked","");
			}
		}else{
			if(checked){
				$(this).closest("ul").find("li[operkey=view]").find('input[name=funcid]')
				.attr("checked","checked")
				.prop("checked","checked");
			}
		}
	});
	//add ppan 20140503
	
	$("#funciddiv").append(holder);
	if(status=="hidden"){
		holder.hide(0);
	}else{
		holder.animate({
			left:"200px"
		},0,function(){
			holder.animate({
				left:"0px"
			},600);
		});
	}
	
}

$(".funcid_name").live("click",function(e){
	var chk = $(this).closest("li").find("input[name=funcid]").get(0);
	chk.checked = !chk.checked;
	//add ppan 20140503
	if($(this).closest("li").attr('operkey')=='view'){
		if(!chk.checked){
			$(this).closest("ul").find("input[name=funcid]")
			.attr("checked","")
			.prop("checked","");
		}
	}else{
		if(chk.checked){
			$(this).closest("ul").find("li[operkey=view]").find('input[name=funcid]')
			.attr("checked","checked")
			.prop("checked","checked");
		}
	}
	//add ppan 20140503
});
//On ready
$(function() {
	blockUI();
	appRole.tmplModuleList = $("#tmplModuleList").html();
	appRole.tmplAddedUser = $("#tmplAddedUser").html();
	appRole.tmplUserToAdd = $("#tmplUserToAdd").html();

	//loadbuttons(appRole);
	if(appRole.hasQuery==false){
		$("body").html(window.msgs.no_query_right);
		unblockUI();
		return;
	}
	
//	$(window).on("resize",function(e){
//		$("#tbRole").datagrid("resize",{width:$(window).width()});
//	});
	//清除mask
	unblockUI();
	$(".topMask").remove();
	
	var loader = function(that,params,success,loadError){
		var opts = that.datagrid("options");
		var pager = that.datagrid('getPager');
		appRole.pSysRoleList.page_number = params.page,appRole.pSysRoleList.page_size=params.rows;
		$.ajax({
			url:opts.url,
			type:"post",
			data: appRole.pSysRoleList,
			dataType:"json",
			success:function (data,status,xhr) {				
				if(typeof data === "string"){
					data = $.parseJSON(data);
				}				
				if(data.retcode==0){					
					var list = data.sysrole_list;	
					that.data().datagrid["cache"] = data;					
					success({
						"total":data.total_count==undefined?0:data.total_count,
						"rows":list
						});	
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
				if(data.retcode == -2000){
					top.G.alert(data.retmsg);
					return true;
				}
			},
			error:function (err) {
				loadError.apply(this,arguments);
			}
			});
	};
	
	//角色模块关系
	$("#addRoleModule").bind("click",function(e){		
		var opt = $(this).linkbutton("options");
		if(opt.disabled==true){
			return;
		}
		if(appRole.selectedRoleid == -1 ){
			top.G.alert(window.msgs.sysuser_role_before_op);
			return;
		}		 
		$(".module_select").removeAttr("checked");
		$.post(appRole.urlRoleOperList,"roleid="+appRole.selectedRoleid,function(data){
			if(typeof data === "string"){
				data = $.parseJSON(data);
			}
			if(data.retcode==0){
				var list = data.menu_list;
				var list2 = parseToEasyUITreeNodeObject(list);
				appRole.grantFuncList = list;
				$(".module_root").tree({
					data : list2,
					onClick:function(node){ //点击功能树某项
						$(this).tree("toggle",node.target);
						var data = $(this).tree("getData",node.target);
						//console.log(appRole.grantFuncMap[data.id]);
						var operlist = appRole.grantFuncMap[data.id];
						if(operlist != undefined && operlist.length>0){
							buildFuncidList(data,operlist,"");
						}
						
					}
				});
				buildAllFuncidList(list2);
			}
			$(".wrapperMapPanel").window("open").window("center").window("move",{top:0});
		});
		
	});

	//用户角色关系
	$("#addRoleUser").click(function(){
		var opt = $(this).linkbutton("options");
		if(opt.disabled==true){
			return;
		}
		if(appRole.selectedRoleid == -1){
			top.G.alert(window.msgs.sysuser_role_before_op);
			return;
		}
		var rid = appRole.selectedRoleid;
		$.ajax({
			url:appRole.urlFindRoleUserList
			,type:"post"
			,data:"roleid=" + rid
			,success:function(data,status,xhr){
				if(data!=undefined){
					var list = data.sysuser_list;
					var root = $(".user_root");
					var tmpRoot = $("<div></div>");
					delete appRole.adduserList;
					appRole.adduserList = [];
					appRole.UserNotInRole = [];
					appRole.orgUserList = list;
					$(".userRole_root").html("");
					for(var i=0;i<list.length;i++){
						if(list[i].has_role==1){
							var name1 = list[i].realname+"("+list[i].username+")";
							appRole.adduserList[name1] = ({id:list[i].id,name:name1 });
							var n = $( appRole.tmplAddedUser);
			             	n.find(".nameHolder").html(name1);
			             	n.find(".nameHolder").data("uid",list[i].id);
			             	$(".userRole_root").append(n);
						}else{
							appRole.UserNotInRole.push(list[i]);
							var html = top.G.fillTemplate(appRole.tmplUserToAdd,list[i]);
							tmpRoot.append(html);
						}
					}
					root.html(tmpRoot.html());
					initDragable();
					$(".wrapperRoleUser").window("open").window("center");
				}
			}
		});
	});
	
	$("#saveRoleUser").click(function(e){
		if(appRole.selectedRoleid==-1){
			top.G.alert(window.msgs.sysuser_role_before_op);
			return;			
		}
		var opts = {"roleid":appRole.selectedRoleid};
		opts.userid = [];
		for(var k in appRole.adduserList){
			opts.userid.push(appRole.adduserList[k].id);
		}		
		addUserToRole(opts);
	});
	$("#cancelRoleUser").click(function(e){
		$(".wrapperRoleUser").window("close");
	});
	
	//初始化表格
	$("#tbRole").datagrid({
		url: appRole.urlRoleListByPage,
		idField:"roleid",
		toolbar:"#tb",
		autoRowHeight:true,
		fitColumns:true,
		showFooter:true,
		pagination:true,
		pageNumber:1,
		pageSize:10,
		singleSelect:true,
		rownumbers:true,
		selectOnCheck:false,
	    columns:[[  
	        {field:'checkbox',title:'选择',width:30,checkbox:true},
	        {field:'rolename',title:window.msgs.sysuser_role_name,width:200},
	        {field:"disable",title:window.msgs.sysuser_role_status,width:200,formatter:function(val,row,idx){
	        	var txt = (val==0?window.msgs.sysuser_userstate_actived:window.msgs.sysuser_userstate_disabled);
	        	var color = (val==0?window.msgs.green:window.msgs.red);
	        	return "<span style='color:"+color+"'>"+txt+"</span>";
	        }}
	        
	    ]],
	    loader:function (params,success,loadError) {	
	    	var that = $(this);
	    	appRole.selectedRoleid=-1;
	    	loader(that,params,success,loadError);
	    },
	    onClickRow:function(rowIndex, rowData){	
	    	appRole.selectedRole = rowData;
	    	appRole.selectedRoleid = rowData.roleid;
	    	
	    }
	});
	
	//添加角色
	$("#addRoleBtn").click(function(e){
		var opt = $(this).linkbutton("options");
		if(opt.disabled==true){
			return;
		}
		$("#roleNameEdit").val("");
		$("#roleid").val("0");
		$(".wrapperAddPanel").panel({
			title:'新增角色'
		});
		$(".wrapperAddPanel").window("open").window("center");
		//使切入的table居中
		var $c = $(".wrapperAddPanel");
		var $ch = $c.height();
		var $cw = $c.width();
		 
		var $b = $("#tb_role");
		var $bh = $b.height();
		var $bw = $b.width();
		 
		$b.css({
		    position:'absolute',
		    left:($cw/2-$bw/2)+'px',
		    top:($ch/2-$bh/2)+'px'
		});
		appRole.roleFormStatus = "new";
		$("#btnSave,#roleNameEdit").removeAttr("disabled");
		$("#roleStatusEdit").combobox("enable");
	});
	//显示详细
	$("#detailRoleBtn").on("click",function(e){
		var opt = $(this).linkbutton("options");
		if(opt.disabled==true){
			return;
		}
		if(!isSelectedOneRole()){
			
			return;
		}
		$("#roleNameEdit").val("");
		$("#roleid").val(appRole.selectedRoleid);
		$("#roleNameEdit").val(appRole.selectedRole.rolename);
		$("#roleStatusEdit").combobox("setValue",appRole.selectedRole.disable);
		$(".wrapperAddPanel").window("open");
		//使切入的table居中
		var $c = $(".wrapperAddPanel");
		var $ch = $c.height();
		var $cw = $c.width();
		 
		var $b = $("#tb_role");
		var $bh = $b.height();
		var $bw = $b.width();
		 
		$b.css({
		    position:'absolute',
		    left:($cw/2-$bw/2)+'px',
		    top:($ch/2-$bh/2)+'px'
		});
		$("#btnSave,#roleNameEdit").attr("disabled","disabled");
		$("#roleStatusEdit").combobox("disable");
		
	});
	$("#editRoleBtn").on("click",function(e){
		var opt = $(this).linkbutton("options");
		if(opt.disabled==true){
			return;
		}
		if(appRole.selectedRoleid==-1){
			top.G.alert("请先选择一个角色再操作！");
			return;
		}
		$("#roleNameEdit").val("");

		$("#roleid").val(appRole.selectedRoleid);
		$("#roleNameEdit").val(appRole.selectedRole.rolename);
		$("#roleStatusEdit").combobox("setValue",appRole.selectedRole.disable);
		$(".wrapperAddPanel").panel({
			title:'修改角色'
		});
		$(".wrapperAddPanel").window("open");
		//使切入的table居中
		var $c = $(".wrapperAddPanel");
		var $ch = $c.height();
		var $cw = $c.width();
		 
		var $b = $("#tb_role");
		var $bh = $b.height();
		var $bw = $b.width();
		 
		$b.css({
		    position:'absolute',
		    left:($cw/2-$bw/2)+'px',
		    top:($ch/2-$bh/2)+'px'
		});
		appRole.roleFormStatus = "edit";
		$("#btnSave,#roleNameEdit").removeAttr("disabled");
		$("#roleStatusEdit").combobox("enable");
	});
	//禁用角色
	$("#delRole").click(function(e){
		if(appRole.isSaving){
			return;
		}		
		if(isSelectedOneRole() ){
			appRole.isSaving = true;
			var d = window.confirm(window.msgs.sysuser_role_del_confirm);
			if(!d){
				appRole.isSaving = false;
				return;				
			}
			addRole({roleid:appRole.selectedRoleid,rolename:appRole.selectedRole.rolename,disable:1});
			
		}
	});
	
	
	//删除角色
	$("#roleDelete").click(function(e){
		var List= new Array();
		var rows=$("#tbRole").datagrid('getChecked');
		for(var i=0;i<rows.length;i++){
		List.push(rows[i].roleid);
		}
			
		if(List==null||List.length==0){	
		top.G.alert("请选择角色!");
		return;
	}
		if(List!=null||List.length!=0 ){
			appRole.isSaving = true;
			$.messager.confirm("确认","确认删除选中角色?",function(r){
				if(!r){
				appRole.isSaving = false;
				$('#tbRole').datagrid('clearSelections');
				$("#tbRole").datagrid("reload");
				return;
			}
			$.ajax({
			url:appRole.urlRoleDelete
			,data:"roleid="+List 
			,type:"post"
			,success:function(data,status,xhr){
				if(typeof data === "string"){
					data = $.parseJSON(data);
				}	
				if(data!=undefined){
					if(data.retcode==0){
						top.G.alert("删除成功!");
						//location.replace(appRole.base);
						$('#tbRole').datagrid('clearSelections');
						$("#tbRole").datagrid("reload");
					}else{
						top.G.alert(data.retmsg);
						$('#tbRole').datagrid('clearSelections');
						$("#tbRole").datagrid("reload");
						appRole.isSaving = false;
					}
				}
			}
		});
       });
		}
	});
	
	//保存角色功能
	$("#saveMapping").click(function(e){
		if(appRole.isSaving){
			return;
		}
		appRole.isSaving = true;
		if(appRole.selectedRole == null && appRole.selectedRoleid == -1 ){
			top.G.alert(window.msgs.sysuser_role_before_op);
			appRole.isSaving = false;
			return;
		}
		var postdata = $("#funcidForm").serialize();
		
		$.ajax({
			url:appRole.urlRoleOperSave
			,data:postdata+"&roleid="+appRole.selectedRoleid 
			,type:"post"
			,success:function(data,status,xhr){
				if(data!=undefined){
					if(data.retcode==0){
						top.G.alert(window.msgs.savesuccess);
						appRole.isSaving = false;
						top.G.alert(window.msgs.savesuccess,appRole.base);
						//location.replace(appRole.base);
					}else{
						top.G.alert(data.retmsg);
						appRole.isSaving = false;
					}
				}
			}
			,error:function(xhr){
				top.G.makeCommError();
				appRole.isSaving = false;
			}
		});
	});
	//关闭角色模块
	$("#cancelMapping").click(function(e){
		$(".wrapperMapPanel").window("close");
		onRoleMappingClose();
	});

	//保存角色
	$("#btnSave").click(function(e){
		e.preventDefault();
		if(appRole.isSaving){
			return;
		}
		appRole.isSaving = true;
		
		var name=$("#roleNameEdit").val();
		name = $.trim(name);
		if(name==""){
			top.G.alert(window.msgs.sysuser_role_please_type_role_name);
			appRole.isSaving = false;
			return;
		}else{
			var length = name.length;
			var lenTemp = 0;
			var i;
			for(i=0; i<length; i++)
			{
				if(/[^x00-xff]/.test(name.charAt(i)))//判断双字节字符
					lenTemp+=2;
				else
					lenTemp++;
			}
			if(lenTemp > 20){
				top.G.alert("角色名称不能超过20个字母或10个汉字.");
				appRole.isSaving = false;
				return;	
			}
		}
		var opts = { rolename:name,disable:$("#roleStatusEdit").val()};
		if($("#roleid").val()!=""&&$("#roleid").val()!="0"){ 
			opts.roleid = appRole.selectedRoleid;
		}
		opts.disable = $("#roleStatusEdit").combobox("getValue");
		$(this).attr("disabled",true);
		addRole(opts);
	});
	$("#btnCancel").click(function(e){
		$("#roleNameEdit").val("");
		$("#roleid").val("0");
		$(".wrapperAddPanel").window("close");
	});

});