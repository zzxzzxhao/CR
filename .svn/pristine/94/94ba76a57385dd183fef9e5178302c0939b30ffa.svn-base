var appStock = {
	base : location.href,
	urlStockList : top.window.WXYH.base + "/stock/stockList.do" ,//列表
	urlStockSave : top.window.WXYH.base + "/stock/save.do", // 保存
	urlStockDel  : top.window.WXYH.base + "/stock/delete.do" ,//删除
	urlStockGetparentmenu  : top.window.WXYH.base + "/stock/getParentMenu.do" ,//删除
	urlParma : {
		page_number : 1,
		page_size : 10,
		keyword  : null,
	},
	selectedRow : {},
	selectedIndex : -1,
};
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
	
	$("#doSearch").html(window.msgs.common_search);
	$("#doSearch").on("click", function(e) {
		appStock.urlParma.keyword=$("#keyword").val();
		$("#tbStock").datagrid("reload");
	});

	$(window).on("resize", function(e) {
		$("#tbStock").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});

	// 弹出新增框
	$("#addstock").on("click", function(e) {
		$("#stockid").val("");
		$("#staffid").val("");
		$("#stockname").val("");
		$("#code").val("");
		$("#stocknum").val("");
		$("#buyPrice").val("");
		$("#buyTime").val("");
		$("#sellTime").val("");
		$("#target").val("");
		$("#stockState").val("");
		
		$("#staffid_form").val("0");
		$("#addUserWin").window({title : '新增股票'}).window("open");
		
		show_topMenu("add");
		$("#btnSave").focus();
	});
	
	$("#tbStock").datagrid({
		url : appStock.urlStockList,
		idField : "stockid",
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
		rownumbers : true,
		columns : [ [   {
			field : 'stockid',
			title : '股票id',
			width : 10,
			hidden:true
		},{
			field : 'staffid',
			title : '业务员id',
			width : 10,
			hidden:true
		},{
			field : 'staffname',
			title : '业务员名字',
			width : 10,
		},{
			field : 'name',
			title : '股票名字',
			width : 10
		}, {
			field : 'code',
			title : '股票代码',
			width : 10
		}, {
			field : 'stocknum',
			title : '股票数',
			width : 10
		}, {
			field : 'buyPrice',
			title : '买入价格',
			width : 10
		}, {
			field : 'target',
			title : '目标价格',
			width : 10
		}, {
			field : 'sellPrice',
			title : '卖出价格',
			width : 10
		}, {
			field : 'takeprofit',
			title : '策略止盈',
			width : 10
		},{
			field : 'stoploss',
			title : '策略止损',
			width : 10
		},{
			field : 'buyTime',
			title : '买入时间',
			width : 10
		},{
			field : 'sellTime',
			title : '卖出时间',
			width : 10
		},{
			field : 'positionday',
			title : '持仓天数',
			width : 10
		}, {
			field : 'disable',
			title : '股票状态',
			width : 10,
			formatter:function(val,row,idx){
	        	var txt = (val==0?"持仓":"记录");
	        	var color = (val==0?window.msgs.green:window.msgs.red);
	        	return "<span style='color:"+color+"'>"+txt+"</span>";
			}
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appStock.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onLoadSuccess : function(data) {
			$('#tbStock').datagrid('unselectAll');
		},
		onClickRow : function(rowIndex, rowData) {
			appStock.selectedRow = rowData;
			appStock.selectedIndex = rowData.id;
		}
	});

	// 保存事件
	$("#btnSave").click(function(e) {
		if (!$("#uploadImgForm").form("validate")) {
			top.G.alert('表单验证不通过');
			return false;
		}
		
		$(this).attr("disabled",true);
		
		var form = $("form[name=uploadImgForm]"); 
		var options  = {    
				url:appStock.urlStockSave,
				type:'post', 
				dataType:'json',
				data:form.serialize(),
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						$("#stockname").val("");
						top.G.alert("操作成功!");
						$("#addUserWin").window("close");
						$("#tbStock").datagrid("reload");
						location.replace(appStock.base);
					} else {
						top.G.alert(res.retmsg);
					}
				},
				complete:function(){
					$('.uploadOne_btn').removeAttr("disabled");
					$("#addUserWin").window("close");
					removePageMask();
				}
		}; 
		form.ajaxSubmit(options);
		return false;
	});
	
	$("#btnCancel").click(function(e) {
		$("#addUserWin").window("close");
	});
	
	// 弹出编辑框
	$("#editstock").click(function(e) {
		if (appStock.selectedIndex == -1) {
			top.G.alert('未选中记录!');
			return;
		}
		$("#menuForm").form("load",appStock.selectedRow);
		$("#stockid").val(appStock.selectedRow.stockid);
		$("#staffid").val(appStock.selectedRow.staffid);
		$("#stockname").val(appStock.selectedRow.name);
		$("#code").val(appStock.selectedRow.code);
		$("#stocknum").val(appStock.selectedRow.stocknum);
		$("#buyPrice").val(appStock.selectedRow.buyPrice);
		$("#buyTime").val(appStock.selectedRow.buyTime);
		$("#sellTime").val(appStock.selectedRow.sellTime);
		$("#target").val(appStock.selectedRow.target);
		$("#sellPrice").val(appStock.selectedRow.sellPrice);
		$("#takeprofit").val(appStock.selectedRow.takeprofit);
		$("#stoploss").val(appStock.selectedRow.stoploss);
		$("#stockState").combobox("setValue",appStock.selectedRow.disable);
		$("#addUserWin").window({title:'股票编辑'}).window("open").window("center");
		show_topMenu("edit");
	});
	
	// 删除
	$("#Delete").on("click", function(e) {
		var List = new Array();
		var rows = $("#tbStock").datagrid('getChecked');
		for (var i = 0; i < rows.length; i++) {
			List.push(rows[i].stockid);
		}
		if (List == null || List.length == 0) {
			top.G.alert("请选择一支股票!");
			return;
		}
		$.messager.confirm("确认", "确认删除此股票？", function(r) {
			if (r) {
				var parms = "stockid=" + List;
				$.ajaxSetup({
					beforeSend : function(xhr, opts) {
						opts.url += "?_t=" + (new Date()).getTime();
					},
					complete : function() {
					}
				});
				$.post(appStock.urlStockDel, parms, function(data) {
					if (typeof data === "string") {
						data = $.parseJSON(data);
					}
					top.window.setupAjax();
					if (data.retcode == 0) {
						top.G.alert("删除成功！");
						$('#tbStock').datagrid('clearSelections');
						$("#tbStock").datagrid("reload");
						appStock.selectedRow = {};
						location.replace(appStock.base);
					} else {
						top.G.alert(data.retmsg);
						$("#tbStock").datagrid("reload");
						$("#tbStock").datagrid('unselectAll');
						appStock.selectedRow = {};
						location.replace(appStock.base);
					}
				});
			} else {
				top.G.alert("操作已取消!");
				$('#tbStock').datagrid('clearSelections');
				$("#tbStock").datagrid("reload");
				return;
			}
		});
	});

	$(".topMask").remove();

});

function loader(that, params, success, loadError) {
	var opts = that.datagrid("options");
	var pager = that.datagrid('getPager');
	appStock.urlParma.page_number = params.page;
	appStock.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appStock.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {				
				var list = data.stocklist; 
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

//顶级菜单下拉选项
function show_topMenu(type){
	$.ajax({
		url:appStock.urlStockGetparentmenu,
		type:"post",
		data:{},
		dataType:"json",
		success:function(data){
			$('#staffid_form').html("");
			if(type == 'add'){
				for(var i=0;i<data.topMenuList.length;i++){
					$('#staffid_form').append('<option value="'+data.topMenuList[i].staffid+'">'+data.topMenuList[i].staffname+'</option>');
				}
			}else if(type=='edit'){
				for(var i=0;i<data.topMenuList.length;i++){
					var selected = "";
					var menuid_parnet = $("#staffid").val();
					if(data.topMenuList[i].staffid == menuid_parnet){
						selected = "selected='selected'";
					}
					$('#staffid_form').append('<option value="'+data.topMenuList[i].staffid+'"'+selected+'>'+data.topMenuList[i].staffname+'</option>');
				}
			}
			          
			 
		}
	});
}
