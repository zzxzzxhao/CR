/*
*名称:图片上传本地预览插件 v1.1
*作者:周祥
*时间:2013年11月26日
*介绍:基于JQUERY扩展,图片上传预览插件 目前兼容浏览器(IE 谷歌 火狐) 不支持safari
*插件网站:http://keleyi.com/keleyi/phtml/image/16.htm
*参数说明: Img:图片ID;Width:预览宽度;Height:预览高度;ImgType:支持文件类型;Callback:选择文件显示图片后回调方法;
*使用方法: 
<div>
<img id="ImgPr" width="120" height="120" /></div>
<input type="file" id="up" />
把需要进行预览的IMG标签外 套一个DIV 然后给上传控件ID给予uploadPreview事件
$("#up").uploadPreview({ Img: "ImgPr", Width: 120, Height: 120, ImgType: ["gif", "jpeg", "jpg", "bmp", "png"], Callback: function () { }});
*/
jQuery.fn.extend({
    uploadPreview: function (opts) { 
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "ImgPr",
            Width: 100,
            Height: 100,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            Callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
               
            }  
            return url;
        };
        _this.change(function () {
        	try{
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                	//alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    top.G.alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }
                //检测图片的大小                 
                var fileInput = $(this)[0] ,byteSize='';  
                if ( fileInput.files && fileInput.files[0] ){  
                    byteSize  =fileInput.files[0] &&  fileInput.files[0].size; 
                    var size=1024*3*1024;
                    if(byteSize>size){
                    	$.messager.alert("提示信息","图片大小不能超过3M,请重新选择图片。");
                    	 this.value = "";
                    	 return false;
                    }
                } 
                
                
                if ($.browser.msie) {
                    try {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                        
                    } catch (e) {
                        var src = "";
                        var obj = $("#" + opts.Img);
                        var div = obj.parent("div")[0];
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus();
                        } else {
                            _self.blur();
                        }
                        src = document.selection.createRange().text;
                        document.selection.empty(); 
                        obj.hide(); 
                        obj.parent("div").css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'
                        }); 
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                         
                        $("#" + opts.Img).attr('src',src) ;
                        
                        seturl(opts.Img,src);
                         
                    }
                } else {
                    $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                }
                
               
                   
             
                
                opts.Callback();
            }
        	}catch(e){
        		alert(e);
        	}
        });
    }
});
function seturl(id,src){}

function emptyimg(id,src){
	var obj = $("#" + id);
    var div = obj.parent("div")[0];
    div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
    $("#" + opts.Img).attr('src',src) ;
}