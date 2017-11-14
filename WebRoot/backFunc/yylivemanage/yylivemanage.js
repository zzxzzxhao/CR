var appLive = {
	base : location.href,
	urlLiveList : top.window.WXYH.base + "/yylive/list.do" ,//列表
	urlLiveDel  : top.window.WXYH.base + "/yylive/delete.do" ,//删除
	urlReset  : top.window.WXYH.base + "/yylive/reset.do" ,//重置密码
	urlGetKey : top.window.WXYH.base + "/Live/getKey.do",//加密
	urlEnable  : top.window.WXYH.base + "/yylive/enable.do" ,//启用
	urlDisable  : top.window.WXYH.base + "/yylive/disable.do" ,//禁用
	urlChangeState  : top.window.WXYH.base + "/yylive/changeState.do" ,//重置登录状态
	urlParma : {
		page_number : 1,
		page_size : 10,
		companyid : null,
		keyword  : null,
	},
	selectedRow : {},
	selectedIndex : -1,
};

var publicKeyExponent;
var publicKeyModulus;

app = {};
app.myreload = function(newposition) {
	// 显示第一页数据
	$(newposition).datagrid("options").pageNumber = 1;
	// 分页栏上跳转到第一页
	$(newposition).datagrid('getPager').pagination({
		pageNumber : 1
	});
	$(newposition).datagrid("reload");
};

$(function() {
	$.getJSON(appLive.urlGetKey, function(data){
		publicKeyExponent = data.exponent;
		publicKeyModulus = data.modulus;
	});
	
	$("#doSearch").html(window.msgs.common_search);
	$("#doSearch").on("click", function(e) {
		appLive.urlParma.keyword=$("#keyword").val();
		$("#tbLive").datagrid("reload");
	});

	$(window).on("resize", function(e) {
		$("#tbLive").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});
	
	// 重置密码
	$("#reset").on("click", function(e) {
		if(appLive.selectedIndex==-1){
			top.G.alert("请选择一个用户！");
			return;
		}
		var rows = $("#tbLive").datagrid('getChecked');
		var account=rows[0].account;
		var password=rows[0].password;
		$("#newPwd").val("");
		$("#account").val(account);
		
		$("#chgPwdWin").window("open").window("center");
		$(".window-mask").height($("body").height());
	});
	
	// 重置密码
	$("#savepwd").on("click", function(e) {
		var s = $("#newPwd").val();
		
		RSAUtils.setMaxDigits(200);  
		var key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
		var encrypedPwd = RSAUtils.encryptedString(key,s.split("").reverse().join(""));
		var form = {
	   			account:$("#account").val()
				,password : encrypedPwd
			};
		
		$.ajax({
			url:appLive.urlReset,
			type:"post",
			data:form,
			dataType:"json",
			success:function(res){
				var retcode = res.retcode;
				if(retcode==1){
					top.G.alert(res.retmsg);
					$("#account").val("");
					$("#newPwd").val("");
					$("#chgPwdWin").window("close");
				}else{
					top.G.alert(res.retmsg);
					$("#account").val("");
					$("#newPwd").val("");
				}
			}
		});
	});
	
	// 重置登录状态：重置为未登录
	$("#changeState").on("click", function(e) {
		if(appLive.selectedIndex==-1){
			top.G.alert("请选择一个用户！");
			return;
		}
		
		var rows = $("#tbLive").datagrid('getChecked');
		var account=rows[0].account;
		$.ajax({
			url:appLive.urlChangeState,
			type:"post",
			data:{"account":account},
			dataType:"json",
			success:function(res){
				if(res.retcode==0){
					top.G.alert(res.retmsg);
					$('#tbLive').datagrid('clearSelections');
					$("#tbLive").datagrid("reload");
				}else{
					top.G.alert(res.retmsg);
					$("#tbLive").datagrid("reload");
					$("#tbLive").datagrid('unselectAll');
					appLive.selectedRow = {};
				}
			}
		});
	});
	
	// 启用
	$("#enable").on("click", function(e) {
		if(appLive.selectedIndex==-1){
			top.G.alert("请选择一个用户！");
			return;
		}
		
		var rows = $("#tbLive").datagrid('getChecked');
		var account=rows[0].account;
		$.ajax({
			url:appLive.urlEnable,
			type:"post",
			data:{"account":account},
			dataType:"json",
			success:function(res){
				if(res.retcode==0){
					top.G.alert(res.retmsg);
					$('#tbLive').datagrid('clearSelections');
					$("#tbLive").datagrid("reload");
				}else{
					top.G.alert(res.retmsg);
					$("#tbLive").datagrid("reload");
					$("#tbLive").datagrid('unselectAll');
					appLive.selectedRow = {};
				}
			}
		});
	});
	
	// 禁用
	$("#disable").on("click", function(e) {
		if(appLive.selectedIndex==-1){
			top.G.alert("请选择一个用户！");
			return;
		}
		
		var rows = $("#tbLive").datagrid('getChecked');
		var account=rows[0].account;
		$.ajax({
			url:appLive.urlDisable,
			type:"post",
			data:{"account":account},
			dataType:"json",
			success:function(res){
				if(res.retcode==0){
					top.G.alert(res.retmsg);
					$('#tbLive').datagrid('clearSelections');
					$("#tbLive").datagrid("reload");
				}else{
					top.G.alert(res.retmsg);
					$("#tbLive").datagrid("reload");
					$("#tbLive").datagrid('unselectAll');
					appLive.selectedRow = {};
				}
			}
		});
	});
	
	$("#tbLive").datagrid({
		url : appLive.urlLiveList,
		idField:"id",
		toolbar : "#tb",
		autoRowHeight : true,
		fitColumns : true,
		showFooter : true,
		pagination : true,
		pageNumber : 1,
		pageSize : 10,
		nowrap : false,
		singleSelect : true,
		selectOnCheck : false,
		columns : [ [   
		{
			field : 'userid',
			title : 'id',
			width : 10,
			checkbox:true
		}, {
			field : 'account',
			title : '用户登录账号',
			width : 20,
		}, {
			field : 'name',
			title : '用户昵称',
			width : 20
		}, {
			field : 'password',
			title : '原始密码',
			width : 20,
			hidden:true
		}, {
			field : 'state',
			title : '已登录状态',
			width : 20,
			formatter:function(val,row,idx){
				var txt;
				var color;
				if(val==0){
					txt="已登录";
					color="blue";
				}else if(val==1){
					txt="未登录";
					color="green";
				}
				return "<span style='color:"+color+"'>"+txt+"</span>";
			}
		}, {
			field : 'disable',
			title : '禁言状态',
			width : 20,
			formatter:function(val,row,idx){
				var txt;
				var color;
				if(val==0){
					txt="正常发言";
					color="black";
				}else if(val==1){
					txt="已禁言";
					color="red";
				}
				return "<span style='color:"+color+"'>"+txt+"</span>";
			}
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appLive.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onClickRow : function(rowIndex, rowData) {
			appLive.selectedRow = rowData;
			appLive.selectedIndex = rowData.id;
		}
	});
	
	// 删除
	$("#Delete").on("click", function(e) {
		var List = new Array();
		var rows = $("#tbLive").datagrid('getChecked');
		for (var i = 0; i < rows.length; i++) {
			List.push(rows[i].userid);
		}
		if (List == null || List.length == 0) {
			top.G.alert("请选择一个用户!");
			return;
		}
		$.messager.confirm("确认", "确认删除此用户？", function(r) {
			if (r) {
				var parms = "id=" + List;
				$.ajaxSetup({
					beforeSend : function(xhr, opts) {
						opts.url += "?_t=" + (new Date()).getTime();
					},
					complete : function() {
					}
				});
				$.post(appLive.urlLiveDel, parms, function(data) {
					if (typeof data === "string") {
						data = $.parseJSON(data);
					}
					top.window.setupAjax();
					if (data.retcode == 0) {
						top.G.alert("删除成功！");
						$('#tbLive').datagrid('clearSelections');
						$("#tbLive").datagrid("reload");
						appLive.selectedRow = {};
					} else {
						top.G.alert(data.retmsg);
						$("#tbLive").datagrid("reload");
						$("#tbLive").datagrid('unselectAll');
						appLive.selectedRow = {};
					}
				});
			} else {
				top.G.alert("操作已取消!");
				$('#tbLive').datagrid('clearSelections');
				$("#tbLive").datagrid("reload");
				return;
			}
		});
	});

	$(".topMask").remove();

});

function loader(that, params, success, loadError) {
	var opts = that.datagrid("options");
	var pager = that.datagrid('getPager');
	appLive.urlParma.page_number = params.page;
	appLive.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appLive.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {
				$("#onlineNum").html(data.onlineNum);
				
				var list = data.live_list; 
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

