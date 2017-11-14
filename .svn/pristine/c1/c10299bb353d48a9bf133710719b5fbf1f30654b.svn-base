var appWap = {
	base : location.href,
	urlChangeAddress  : top.window.WXYH.base + "/yylive/changePCAddress.do" ,//更改PC直播地址
	urlPicList : top.window.WXYH.base + "/yylive/picList.do" ,//图片列表
	urlPicSave : top.window.WXYH.base + "/yylive/picsave.do" ,//保存图片
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
	
	// 弹出编辑框
	$("#edit").click(function(e) {
		if (appWap.selectedIndex == -1) {
			top.G.alert('未选中记录!');
			return;
		}
		$("#picid").val(appWap.selectedRow.picid);
		$("#picname").val(appWap.selectedRow.picname);
		$("#picname").attr("readonly","readonly");
		$("#ImgPr").attr("src",appWap.selectedRow.url);
		$("#addPic").window({title:'业务员编辑'}).window("open").window("center");
	});
	
	// 保存图片事件
	$("#submit").click(function(e) {
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
				url:appWap.urlPicSave,
				type:'post', 
				dataType:'json',
				data:form.serialize(),
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						$("#picname").val("");
						$("#ImgPr").attr("src","");
						$("#up").val("");
						top.G.alert("操作成功!");
						$("#addPic").window("close");
						$("#tbWap").datagrid("reload");
						location.replace(appWap.base);
					} else {
						top.G.alert(res.retmsg);
					}
				},
				complete:function(){
					$("#addPic").window("close");
				}
		}; 
		form.ajaxSubmit(options);
		return false;
	});
	
	$("#deselect").click(function(e) {
		$("#addPic").window("close");
	});
	
	
	//更新直播地址
	$("#changeAddress").on("click", function(e) {
		$("#address").val("");
		$("#addUserWin").window({title : '更新直播地址'}).window("open");
	});
	
	//加载图片
	$("#up").click(function(){
		$("#ImgPr").attr("src","");
		$("#up").val("");
	});
	$("#up").uploadPreview({ Img: "ImgPr", Width: 200, Height: 200 });
	
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
		url : appWap.urlPicList,
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
			field : 'picid',
			title : '图片id',
			width : 10,
			hidden:true
		}, {
			field : 'picname',
			title : '图片名称',
			width : 50
		},{
			field : 'url',
			title : '图片',
			width : 100,
			formatter:function(value,row,idx){
				var str="";
				if(value!=""||value!=null){
					str="<img style=\"height:100%;width:150px;\"src=\""+value+"\"/>";
					return str;
				}
			}
		}] ],
		loader : function(params, success, loadError) {
			var that = $(this);
			appWap.selectedIndex = -1;
			loader(that, params, success, loadError);
		},
		onLoadSuccess : function(data) {
			$('#tbStaff').datagrid('unselectAll');
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
				var list = data.piclist; 
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

