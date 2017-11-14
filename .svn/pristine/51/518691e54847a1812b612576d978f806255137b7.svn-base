/**上传图片加载
 * @param sender
 * @returns {Boolean}
 */
function onUploadImgChange(sender) {
	if (!sender.value.match(/.jpg|.gif|.png|.bmp/i)) {
		alert('图片格式无效！');
		return false;
	}
	var objPreview = document.getElementById('preview');
	var objPreviewFake = document.getElementById('preview_fake');
	var objPreviewSizeFake = document.getElementById('preview_size_fake');
	 
	if (sender.files && sender.files[0]) {
		objPreview.style.display = 'block';
		objPreview.style.width = 'auto';
		objPreview.style.height = 'auto';
		objPreview.src = sender.files[0].getAsDataURL();
	} else if (objPreviewFake.filters) {
		sender.select();
		var imgSrc = document.selection.createRange().text;
		objPreviewFake.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgSrc;
		objPreviewSizeFake.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgSrc;
		$("#filetext").text(imgSrc);
		objPreview.src = imgSrc;
		if(objPreviewSizeFake.offsetWidth*objPreviewSizeFake.offsetHeight<10000){
			alert("图片大小必须为大于100*100px的图片！");
			emptyimg("preview","../images/pic.png");
			return false;
		} 
		if(objPreviewSizeFake.offsetWidth*objPreviewSizeFake.offsetHeight>4000000){
			alert("图片大小必须为小于2000*2000px的图片！");
			emptyimg("preview","../images/pic.png");
			return false;
		}
		autoSizePreview(objPreviewFake, objPreviewSizeFake.offsetWidth,objPreviewSizeFake.offsetHeight);
		
		objPreview.style.display = 'none'; 
//		appFaceFeature.imgInfo.width=objPreviewSizeFake.offsetWidth;
//		appFaceFeature.imgInfo.height=objPreviewSizeFake.offsetHeight;
		 
		
		ImgInfo.iw=  objPreviewSizeFake.offsetWidth;
		ImgInfo.ih = objPreviewSizeFake.offsetHeight; 
//		alert("ImgInfo.iw:"+ImgInfo.iw);
	}
	
}
/**图片加载事件
 * @param sender
 */
function onPreviewLoad(sender) {  
//	autoSizePreview(sender, sender.offsetWidth, sender.offsetHeight);
//	alert("sender.offsetWidth:"+sender.offsetWidth);
}
/**自动设置选择图片大小
 * @param objPre
 * @param originalWidth
 * @param originalHeight
 */
function autoSizePreview(objPre, originalWidth, originalHeight) {
	var w = document.getElementById("idImg").style.width;
	var h =document.getElementById("idImg").style.height;
	w = w.substring(0,w.indexOf("px"));
	h = h.substring(0,h.indexOf("px"));
	WinDiv.w = w;
	WinDiv.h = h;
	
//	alert("WinDiv.w:"+WinDiv.w)
//	appFaceFeature.imgInfo.zoomheight=h;
//	alert(w);
	var zoomParam = clacImgZoomParam(w, h, originalWidth,originalHeight);
	objPre.style.width = zoomParam.width + 'px';
	objPre.style.height = zoomParam.height + 'px';
	objPre.style.marginTop = zoomParam.top + 'px';
	objPre.style.marginLeft = zoomParam.left + 'px';
//	alert("objPre.style.width:"+objPre.style.width);
}
/**获取图像缩放大小
 * @param maxWidth
 * @param maxHeight
 * @param width
 * @param height
 * @returns {___anonymous2193_2259}
 */
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		width : width,
		height : height,
		top : 0,
		left : 0
	};

//	alert("maxWidth:"+maxWidth+",maxHeight:"+maxHeight+",width:"+width+",height:"+height);

	rateWidth = width / maxWidth;
	rateHeight = height / maxHeight;
	if(rateWidth <= 1.0 && rateHeight <= 1.0){
		rateWidth = 1.0;
		rateHeight = 1.0;
	}
	zoom.rw = rateWidth;
	zoom.rh = rateHeight;
//		alert("zoom.rw:"+zoom.rw);

	if(rateWidth <= 1.0 && rateHeight <= 1.0){
		param.width = width / rateHeight;
		param.height = height / rateWidth;
	}else if (rateWidth > rateHeight) {
		param.width = maxWidth;
		param.height = height / rateWidth;
	} else {
		param.width = width / rateHeight;
		param.height = maxHeight;
	}

//	alert("maxWidth:"+maxWidth+",width:"+width+",rateWidth:"+rateWidth);
	param.left = (maxWidth - param.width) / 2;
	param.top = (maxHeight - param.height) / 2;
	return param;
}
function emptyimg(id,src){
	 
}