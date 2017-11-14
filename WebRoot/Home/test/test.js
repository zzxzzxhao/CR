var appIndex = {
		base : location.href,
		urlGetDate	:top.window.WXYH.base + "/stock/date.do",	//显示用户名
		urlParma : {
			page_number : 1,
			page_size : 10,
		},
		selectedRow : {},
		selectedIndex : -1,
};
$(document).ready(function(){
	//获取用户名，加上读取各类图片
	$("#stock").datagrid({
		url:appIndex.urlGetDate,
		idField:"code",
		toolbar:"#tb",
		fitColumns:true,
		singleSelect:true,
		selectOnCheck:false,
		sortName:'diff_rate',
		sortOrder:'desc',
		remoteSort:false,
		columns:[[  
			{
				field : 'code',
				title : '代码',
				align :	'center',
				width : 50,
			},{
				field : 'name',
				title : '名称',
				width : 50,
			},{
				field : 'nowPrice',
				title : '现价',
				width : 50,
			},{
				field : 'diff_rate',
				title : '当日涨跌幅',
				width : 20,
				sorttable:true,
				formatter:function(value,row,idx){
					var str="";
					if(value>0){
						str="<span style='color:red'>+"+value+"</span>";
						return str;
					}else if(value<0){
						str="<span style='color:green'>"+value+"</span>";
						return str;
					}
				}
			},{
				field : 'rate',
				title : '涨跌幅',
				width : 20,
				formatter:function(value,row,idx){
					var str="";
					if(value>0){
						str="<span style='color:red'>+"+value+"</span>";
						return str;
					}else if(value<0){
						str="<span style='color:green'>"+value+"</span>";
						return str;
					}
				}
			}
	    ]],
	    loader : function(params, success, loadError) {
			var that = $(this);
			loader(that, params, success, loadError);
		},
		onLoadSuccess : function(data) {
			$('#stock').datagrid('unselectAll');
		},
	})
	
});

function loader(that, params, success, loadError) {
	var opts = that.datagrid("options");
	$.ajax({
		url : opts.url,
		type : "post",
		data : appIndex.urlParma,
		dataType : "json",
		success : function(data, status, xhr) {
			if (data.retcode == 0) {				
				var list = data.systest_list; 
				that.data().datagrid["cache"] = data;
				success({
					"rows" : list
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
