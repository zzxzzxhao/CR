var appStaff = {
	base : location.href,
	urlStaffSave : top.window.WXYH.base + "/staff/save.do", // 保存
	urlStaffList : top.window.WXYH.base + "/staff/staffList.do" ,//列表
	urlStaffDel  : top.window.WXYH.base + "/staff/delete.do" ,//删除
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
		appStaff.urlParma.keyword=$("#keyword").val();
		$("#tbStaff").datagrid("reload");
	});

	$(window).on("resize", function(e) {
		$("#tbStaff").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});

	// 弹出新增框
	$("#addstaff").on("click", function(e) {
		$("#staffname").val("");
		$("#ImgPr").attr("src","");
		$("#up").val("");
		$("#addUserWin").window({title : '新增业务员'}).window("open");
	});
	
	$("#tbStaff").datagrid({
		url : appStaff.urlStaffList,
		idField : "staffid",
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
			field : 'staffid',
			title : '业务员id',
			width : 10,
			hidden:true
		},{
			field : 'url',
			title : '头像',
			formatter:function(value,row,idx){
				var str="";
				if(value!=""||value!=null){
					str="<img style=\"height:70px;width:70px;\"src=\""+value+"\"/>";
					return str;
				}
			}
		}, {
			field : 'staffname',
			title : '业务员名称',
			width : 100
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appStaff.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onLoadSuccess : function(data) {
			$('#tbStaff').datagrid('unselectAll');
		},
		onClickRow : function(rowIndex, rowData) {
			appStaff.selectedRow = rowData;
			appStaff.selectedIndex = rowData.id;
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
				url:appStaff.urlStaffSave,
				type:'post', 
				dataType:'json',
				data:form.serialize(),
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						$("#staffname").val("");
						$("#ImgPr").attr("src","");
						$("#up").val("");
						top.G.alert("操作成功!");
						$("#addUserWin").window("close");
						$("#tbStaff").datagrid("reload");
						location.replace(appStaff.base);
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
	$("#editstaff").click(function(e) {
		if (appStaff.selectedIndex == -1) {
			top.G.alert('未选中记录!');
			return;
		}
		$("#id").val(appStaff.selectedRow.staffid);
		$("#staffname").val(appStaff.selectedRow.staffname);
		$("#ImgPr").attr("src",appStaff.selectedRow.url);
		$("#addUserWin").window({title:'业务员编辑'}).window("open").window("center");
	});
	
	//加载图片
	$("#up").click(function(){
		$("#ImgPr").attr("src","");
		$("#up").val("");
	});
	$("#up").uploadPreview({ Img: "ImgPr", Width: 200, Height: 200 });
	
	// 删除
	$("#Delete").on("click", function(e) {
		var List = new Array();
		var rows = $("#tbStaff").datagrid('getChecked');
		for (var i = 0; i < rows.length; i++) {
			List.push(rows[i].staffid);
		}
		if (List == null || List.length == 0) {
			top.G.alert("请选择一个业务员!");
			return;
		}
		$.messager.confirm("确认", "确认删除此业务员？", function(r) {
			if (r) {
				var parms = "staffid=" + List;
				$.ajaxSetup({
					beforeSend : function(xhr, opts) {
						opts.url += "?_t=" + (new Date()).getTime();
					},
					complete : function() {
					}
				});
				$.post(appStaff.urlStaffDel, parms, function(data) {
					if (typeof data === "string") {
						data = $.parseJSON(data);
					}
					top.window.setupAjax();
					if (data.retcode == 0) {
						top.G.alert("删除成功！");
						$('#tbStaff').datagrid('clearSelections');
						$("#tbStaff").datagrid("reload");
						appStaff.selectedRow = {};
						location.replace(appStaff.base);
					} else {
						top.G.alert(data.retmsg);
						$("#tbStaff").datagrid("reload");
						$("#tbStaff").datagrid('unselectAll');
						appStaff.selectedRow = {};
						location.replace(appStaff.base);
					}
				});
			} else {
				top.G.alert("操作已取消!");
				$('#tbStaff').datagrid('clearSelections');
				$("#tbStaff").datagrid("reload");
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
	appStaff.urlParma.page_number = params.page;
	appStaff.urlParma.page_size = params.rows;
	$.ajax({
		url : opts.url,
		type : "post",
		data : appStaff.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {				
				var list = data.stafflist; 
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

