var appStock = {
	base : location.href,
	urlStockSave : top.window.WXYH.base + "/live/save.do", // 保存
	urlStockList : top.window.WXYH.base + "/live/list.do" ,//列表
	urlStockDel  : top.window.WXYH.base + "/live/delete.do" ,//删除
	urlParma : {
		page_number : 1,
		page_size : 10,
		companyid : null,
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

	$("#tbStock").datagrid({
		url : appStock.urlStockList,
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
		rownumbers : true,
		columns : [ [   
		{
			field : 'id',
			title : 'id',
			width : 10,
			hidden:true
		},{
			field : 'url',
			title : '达人头像',
			align :	'center',
			width : 50,
			formatter:function(value,row,idx){
				var str="";
				if(value!=""||value!=null){
					str="<img style=\"height:100px;width:150px;\"src=\""+value+"\"/>";
					return str;
				}
			}
		},{
			field : 'starname',
			title : '达人名字',
			width : 50
		}, {
			field : 'content',
			title : '简介内容',
			width : 200
		}, {
			field : 'code',
			title : '股票代码',
			width : 50
		}, {
			field : 'name',
			title : '股票名字',
			width : 50
		}, {
			field : 'cost',
			title : '成本价位',
			width : 50
		}, {
			field : 'target',
			title : '目标价位',
			width : 50
		}, {
			field : 'date',
			title : '买入时间',
			width : 50
		}, {
			field : 'day',
			title : '持股时间',
			width : 50
		}, {
			field : 'dotime',
			title : '操作时间',
			width : 50
		}, {
			field : 'doname',
			title : '操作公司',
			width : 50
		}, {
			field : 'dorate',
			title : '操作收益',
			width : 50
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appStock.selectedIndex = -1;
			loader(that, params, success, loadError);
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
		
		if($('#ImgPr').attr('src') == undefined || $('#ImgPr').attr('src') == ""){
			top.G.alert("必须上传图片!");
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
						$("#ImgPr").attr("src","");
						$("#up").val("");
						top.G.alert("操作成功!");
						$("#addUserWin").window("close");
						$("#tbStock").datagrid("reload");
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
	
	$("#edit").click(function(e){
		if(appStock.selectedIndex==-1){
			top.G.alert("未选中记录！");
			return;
		}
		$("#id").val(appStock.selectedRow.id);
		$("#starname").val(appStock.selectedRow.starname);
		$("#content").val(appStock.selectedRow.content);
		$("#code").val(appStock.selectedRow.code);
		$("#name").val(appStock.selectedRow.name);
		$("#cost").val(appStock.selectedRow.cost);
		$("#target").val(appStock.selectedRow.target);
		$("#date").val(appStock.selectedRow.date);
		$("#day").val(appStock.selectedRow.day);
		$("#dotime").val(appStock.selectedRow.dotime);
		$("#doname").val(appStock.selectedRow.doname);
		$("#dorate").val(appStock.selectedRow.dorate);

		$("#addUserWin").window({title:"达人编辑"})
		
		
	});
	
	// 删除
	$("#Delete").on("click", function(e) {
		var List = new Array();
		var rows = $("#tbStock").datagrid('getChecked');
		for (var i = 0; i < rows.length; i++) {
			List.push(rows[i].id);
		}
		if (List == null || List.length == 0) {
			top.G.alert("请选择一条内容!");
			return;
		}
		$.messager.confirm("确认", "确认删除此内容？", function(r) {
			if (r) {
				var parms = "id=" + List;
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
					} else {
						top.G.alert(data.retmsg);
						$("#tbStock").datagrid("reload");
						$("#tbStock").datagrid('unselectAll');
						appStock.selectedRow = {};
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

function emptyimg(id,src){
	$("#upload_img").val("");  
	$("#idbox").remove(); 
	$('#sim').text("");
	$("div[name=idbox]").remove();  
	$("#filetext").text("");
	var obj = $("#" + id);
    var div = obj.parent("div")[0];
}

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

