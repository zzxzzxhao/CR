var appWap = {
	base : location.href,
	urlChangeAddress  : top.window.WXYH.base + "/yylive/changeAddress.do" ,//更改手机直播地址
	urlGetAddress	:top.window.WXYH.base + "/yylive/wap/addresslist.do",//获取直播间地址
	urlParma : {
		page_number : 1,
		page_size : 10,
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
	$(window).on("resize", function(e) {
		$("#tbWap").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});
	
	
	//更新直播地址
	$("#changeAddress").on("click", function(e) {
		$("#address").val("");
		$("#addUserWin").window({title : '更新直播地址'}).window("open");
	});
	
	// 保存事件
	$("#btnSave").click(function(e) {
		if (!$("#uploadForm").form("validate")) {
			top.G.alert('表单验证不通过');
			return false;
		}
		
		$(this).attr("disabled",true);
		
		var form = $("form[name=uploadForm]"); 
		var options  = {    
				url:appWap.urlChangeAddress,
				type:'post', 
				dataType:'json',
				data:form.serialize(),
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						$("#address").val("");
						top.G.alert("操作成功!");
						$("#tbWap").datagrid("reload");
						$("#addUserWin").window("close");
					} else {
						top.G.alert(res.retmsg);
					}
				},
				complete:function(){
					$("#addUserWin").window("close");
				}
		}; 
		form.ajaxSubmit(options);
		return false;
	});
	
	$("#btnCancel").click(function(e) {
		$("#addUserWin").window("close");
	});
	
	$("#tbWap").datagrid({
		url : appWap.urlGetAddress,
		autoRowHeight : true,
		toolbar : "#tb",
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
				field : 'address',
				title : '直播地址',
				width : 100
			}
		] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appWap.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onClickRow : function(rowIndex, rowData) {
			appWap.selectedRow = rowData;
			appWap.selectedIndex = rowData.id;
		}
	});
	
	$(".topMask").remove();
});

function loader(that, params, success, loadError) {
	var opts = that.datagrid("options");
	var pager = that.datagrid('getPager');
	appWap.urlParma.page_number = params.page;
	appWap.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appWap.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {
				var list = data.wap_list; 
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

