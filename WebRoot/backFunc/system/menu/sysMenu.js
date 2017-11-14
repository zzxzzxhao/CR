var appSysmenuInfo = {  
	base : location.href  
	,urlSysmenuList : top.window.WXYH.base + "/sysMenu/list.do" //列表
	,urlSysmenuSave : top.window.WXYH.base + "/sysMenu/saveMenu.do" //保存
	,urlSysmenuDel : top.window.WXYH.base + "/sysMenu/delMenu.do" //删除
	,urlGetmenuById : top.window.WXYH.base + "/sysMenu/findMenuById.do" //
	,urlGetparentmenu : top.window.WXYH.base + "/sysMenu/findTopMenu.do" //查询父类
	,urlParma : {
		page_number : 1,
		page_size : 10,	
		menuid : null,
		parentid : '0',	
		menuitem : null,
		url : null,		
	},
	selectedRow : {},
	selectedIndex : -1,  
	formStatus : "new"
};

app = {};
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
			
function submitForm(){ 
	if( ! $("#menuForm").form("validate") ){
		top.G.alert('表单验证不通过');
		return false;
	}		
	
	var parms = $("#menuForm").serialize();;
	
	var url = appSysmenuInfo.urlSysmenuSave;
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
			top.G.alert(window.msgs.savesuccess,appSysmenuInfo.base);
			//location.replace(appSysmenuInfo.base);
		}else{
			top.G.alert(data.retmsg);
			
		}
	}) ;
    
    
}

$(function() {
	
	$("#search").html(window.msgs.common_search);	
	$("#search").on("click",function(e){
		appSysmenuInfo.urlParma.menuitem = $("#menuitem").val();
		appSysmenuInfo.urlParma.url = $("#menuUrl").val();
		app.myreload("#tbMenuList");
	});
	
	$(window).on("resize",function(e){
		$("#tbMenuList").datagrid("resize",{width:$(window).width()});//修复调整窗口时，内容表格不会随窗伸缩；
	});

	//弹出新增框
	$("#add").on("click",function(e){
		$('#menuid').val("");
		$('#par_id').val("");
		$("#menuitem_form").val("");
		$("#url_form").removeAttr('readonly');
		$("#url_form").val("");
		//$("#parentidAdd").removeAttr('disabled');
		$("#parentid_form").val("0");
		$("#sort_form").val("0");
		$(".addWin").window({title:'新增菜单'}).window("open");
		//appSysmenuInfo.urlParma.menuid = $("#parentidAdd").val();
		//初始化下拉选项框
		show_topMenu("add");
		$("#btnSave").focus();
		
	});
	
	$("#tbMenuList").datagrid({
		url : appSysmenuInfo.urlSysmenuList,
		title : "菜单管理列表",
		idField : "menuid",
		toolbar : "#tb",
		autoRowHeight : true,
		fitColumns : true,
		showFooter : true,
		pagination : true,
		pageNumber : 1,
		pageSize : 10,
		nowrap : false,
		singleSelect : true,
		selectOnCheck: false,
		rownumbers : true,
		columns : [ [
		             {field:'checkbox',
			title:'选择',
			width:30,
			checkbox:true
			},{
			field : 'menuid',
			title : 'ID',
			hidden:true,
			width : 100
		},{
			field : 'sort',
			title : 'sort',
			hidden:true,
			width : 100
		},{
			field : 'parentid',
			hidden:true,
			title : '父ID',
			width : 100
		}, {
			field : 'menuitem',
			title : '菜单名',
			width : 100
		},{
			field : 'url',
			title : '菜单URL',
			width : 100
		} ,{
			field : 'parentItem',
			title : '父菜单',
			width : 100
		} ] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appSysmenuInfo.selectedIndex=-1;
			loader(that, params, success, loadError);
		},
		onLoadSuccess:function(data){
		    $('#tbMenuList').datagrid('unselectAll');
		  },
		onClickRow : function(rowIndex, rowData) {
			appSysmenuInfo.selectedRow = rowData;
			appSysmenuInfo.selectedIndex = rowData.id;		
		}
	});

	//保存事件
	$("#btnSave").click(function(e){
		
		var flag = true;
		if(flag){
			submitForm();
		} else{
			return false;
		}
	});
	
	$("#btnCancel").click(function(e){
		$(".addWin").window("close");
	});
	
	//弹出编辑框
	$("#edit").click(function(e){
		if(appSysmenuInfo.selectedIndex==-1){
			top.G.alert('未选中记录!');
			return;
		}		
		
		//$("#parentidAdd").attr("disabled","disabled");
		$("#menuForm").form("load",appSysmenuInfo.selectedRow);
		$("#par_id").val(appSysmenuInfo.selectedRow.parentid);
		$(".addWin").window({title:'菜单编辑'}).window("open").window("center");
		show_topMenu("edit");
	});

	
	//删除
	$("#del").on("click",function(e){
//		test
		var List= new Array();
		var rows=$("#tbMenuList").datagrid('getChecked');
		for(var i=0;i<rows.length;i++){
			List.push(rows[i].menuid);
		}
		if(List==null||List.length==0){	
			top.G.alert("请选择一个菜单!");
			return;
		}
		$.messager.confirm("确认","确认删除此菜单？",function(r){
			if(r){
//				var parms = {"id":appSysmenuInfo.selectedRow.menuid}
				var parms ="id="+List;
				$.ajaxSetup({
					beforeSend:function(xhr,opts){
						opts.url += "?_t=" + (new Date()).getTime();
						window.showWait();
					}
					,complete:function(){
						window.hideWait();
					}
				});
				$.post(appSysmenuInfo.urlSysmenuDel,parms,function(data){
					if(typeof data === "string"){
						data = $.parseJSON(data);
					}	
					top.window.setupAjax();
					if(data.retcode==0){
						top.G.alert("删除成功！");
						$('#tbMenuList').datagrid('clearSelections');
						$("#tbMenuList").datagrid("reload");
						appSysmenuInfo.selectedRow = {};
					}else{
						top.G.alert(data.retmsg);
						$("#tbMenuList").datagrid("reload");
						$("#tbMenuList").datagrid('unselectAll');
						appSysmenuInfo.selectedRow = {};
					}				
				});
			}else{
				top.G.alert("操作已取消!");
				$('#tbMenuList').datagrid('clearSelections');
				$("#tbMenuList").datagrid("reload");
				return;
			}
		});
	});

	$(".topMask").remove();
	
});


function loader(that, params, success, loadError) {
	var opts = that.datagrid("options");
	var pager = that.datagrid('getPager');
	appSysmenuInfo.urlParma.page_number = params.page;
	appSysmenuInfo.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appSysmenuInfo.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {				
				var list = data.menuList;
				that.data().datagrid["cache"] = data;
				success({
					"total" : data.total_count==undefined?0:data.total_count,
					"rows" : list
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
			} else {
				top.window.G.alert(data.retmsg);
				success({
					"total" : 0,
					"rows" : []
				});
			}
		},
		error : function(err) {
			loadError.apply(this, arguments);
		}
	});
};

//顶级菜单下拉选项
function show_topMenu(type){
	
	
	$.ajax({
		url:appSysmenuInfo.urlGetparentmenu,
		type:"post",
		data:{},
		dataType:"json",
		success:function(data){
			$('#parentid_form').html("");
			//$('#parentid_form').append('<option value="0">菜单</option>');
			if(type == 'add'){
				for(var i=0;i<data.topMenuList.length;i++){
					$('#parentid_form').append('<option value="'+data.topMenuList[i].menuid+'">'+data.topMenuList[i].menuitem+'</option>');
					//appSysmenuInfo.urlParma.id = data.topMenuList[i].id;
				}
			}else if(type=='edit'){
				for(var i=0;i<data.topMenuList.length;i++){
					var selected = "";
					var menuid_parnet = $("#par_id").val();
					if(data.topMenuList[i].menuid == menuid_parnet){
						selected = "selected='selected'";
					}
					$('#parentid_form').append('<option value="'+data.topMenuList[i].menuid+'"'+selected+'>'+data.topMenuList[i].menuitem+'</option>');
					//appSysmenuInfo.urlParma.id = data.topMenuList[i].id;
				}
			}
			          
			 
		}
	});
}
