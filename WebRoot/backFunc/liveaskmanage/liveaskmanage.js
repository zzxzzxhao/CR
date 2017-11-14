var appLiveAsk = {
	base : location.href,
	urlLiveAskSave : top.window.WXYH.base + "/askmessage/save.do", // 保存
	urlLiveAskList : top.window.WXYH.base + "/askmessage/list.do" ,//列表
	urlLiveAskDel  : top.window.WXYH.base + "/askmessage/delete.do" ,//删除
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
		appLiveAsk.urlParma.keyword=$("#keyword").val();
		$("#tbLiveAsk").datagrid("reload");
	});

	$(window).on("resize", function(e) {
		$("#tbLiveAsk").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});

	// 弹出回复框
	$("#addstaff").on("click", function(e) {
		if (appLiveAsk.selectedIndex == -1) {
			top.G.alert('未选中内容!');
			return;
		}
		
		$("#reply").val("");
		$("#name").val("");
		$("#id").val(appLiveAsk.selectedRow.id);
		$("#addUserWin").window({title : '回复'}).window("open");
	});
	
	$("#tbLiveAsk").datagrid({
		url : appLiveAsk.urlLiveAskList,
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
			field : 'checkbox',
			title : '选择',
			width : 5,
			checkbox:true
		},{
			field : 'id',
			title : '内容id',
			width : 5,
			hidden:true
		}, {
			field : 'content',
			title : '提问内容',
			width : 200
		}, {
			field : 'time',
			title : '时间',
			width : 100
		}, {
			field : 'name',
			title : '专家名字',
			width : 50
		}, {
			field : 'reply',
			title : '回复内容',
			width : 200
		}, {
			field : 'replytime',
			title : '回复时间',
			width : 100
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appLiveAsk.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onClickRow : function(rowIndex, rowData) {
			appLiveAsk.selectedRow = rowData;
			appLiveAsk.selectedIndex = rowData.id;
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
		var name = $("#name").val();
		var reply = $("#reply").val();
		var id=$("#id").val();
		var options  = {    
				url:appLiveAsk.urlLiveAskSave,
				type:'post', 
				dataType:'json',
				data:{"reply":reply,"name":name,"id":id},
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						$("#reply").val("");
						top.G.alert("操作成功!");
						$("#addUserWin").window("close");
						$("#tbLiveAsk").datagrid("reload");
						location.replace(appLiveAsk.base);
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
	
	// 删除
	$("#Delete").on("click", function(e) {
		var List = new Array();
		var rows = $("#tbLiveAsk").datagrid('getChecked');
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
				$.post(appLiveAsk.urlLiveAskDel, parms, function(data) {
					if (typeof data === "string") {
						data = $.parseJSON(data);
					}
					top.window.setupAjax();
					if (data.retcode == 0) {
						top.G.alert("删除成功！");
						$('#tbLiveAsk').datagrid('clearSelections');
						$("#tbLiveAsk").datagrid("reload");
						appLiveAsk.selectedRow = {};
					} else {
						top.G.alert(data.retmsg);
						$("#tbLiveAsk").datagrid("reload");
						$("#tbLiveAsk").datagrid('unselectAll');
						appLiveAsk.selectedRow = {};
					}
				});
			} else {
				top.G.alert("操作已取消!");
				$('#tbLiveAsk').datagrid('clearSelections');
				$("#tbLiveAsk").datagrid("reload");
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
	appLiveAsk.urlParma.page_number = params.page;
	appLiveAsk.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appLiveAsk.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {				
				var list = data.liveask_list; 
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

