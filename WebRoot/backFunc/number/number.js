var appNum = {
	base : location.href,
	urlNumSave : top.window.WXYH.base + "/num/create.do", // 保存
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
		appNum.urlParma.keyword=$("#keyword").val();
		$("#tbNum").datagrid("reload");
	});

	$(window).on("resize", function(e) {
		$("#tbNum").datagrid("resize", {width : $(window).width()});// 修复调整窗口时，内容表格不会随窗伸缩；
	});

	// 弹出新增框
	$("#addstaff").on("click", function(e) {
		$("#content").val("");
		$("#addUserWin").window({title : '新增内容'}).window("open");
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
		var number = $("#number").val();
		var options  = {    
				url:appNum.urlNumSave,
				type:'post', 
				dataType:'json',
				data:{"name":name,"number":number},
				success:function(res){ 
					var retcode = res.retcode;
					if(retcode == 0){
						top.G.alert("操作成功!");
						$("#addUserWin").window("close");
						window.location.reload();
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
	
	$(".topMask").remove();

});