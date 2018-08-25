window.onload=function(){
	//搜索栏下方的轮播图的js代码
	var index=0;
	var timer=null;
	var dot=getid('dot').getElementsByTagName('span');
	function getid(id){
		return typeof id==="string" ?document.getElementById(id):id;
	}
	var a=getid('main').getElementsByTagName('div');
	//小圆点及图片样式显示
	function disp(){
		//先去除所有样式
		for (var i = a.length - 1; i >= 0; i--) {
			a[i].style.display='none';
			dot[i].className='';
		}		
		//根据索引显示样式及图片
		 a[index].style.display='block';
		 dot[index].className='dt';
		 // console.log(index);				
	}
	//鼠标进入停止定时器，移开启动定时器
	getid(wrap).onmouseover=function(){clearInterval(timer)};
	getid(wrap).onmouseout=function(){
		timer=setInterval(function(){
		index++;
		if (index==a.length) index=0;disp();
			  },3000)
	}
	//模拟鼠标进入事件
	getid(wrap).onmouseout();
	for (var j = a.length - 1; j >= 0; j--) {
		dot[j].id=j;
	 	dot[j].onmouseover =function(){
	 		index=this.id;
	 		disp();
	 	}
	}
	//左右按键切换轮播图
	getid('cleft').onclick =function(){
		index--;
		if (index<0) {index=a.length-1;}
		disp();
	}
	getid('cright').onclick =function(){
		index++;
		if (index>a.length-1) {index=0;}
		disp();
	}
//侧边主区域外的图片，鼠标移入显示大图片,移开隐藏
	 var ce=getid('ce');
	 var siteImg=getid('site-img');
	 ce.onmouseover=function(){
	 	siteImg.style.display='block';
	    siteImg.style.zIndex=99999;
	 };
	 ce.onmouseout=function(){
	 	siteImg.style.display='none';
	 };

//----------------------------js分割线--------------------------------//
	var shopw=parseInt($('#goods>div').width());
	var l=0;

	$('#msleft').click(function(){
		 //当ul正在执行动画的过程中，阻止执行其它动作。
		 //关键之处，不然图片切换显示不完全，到最后图片空白不显示。
		l=parseInt($("#goods").css("left"))-shopw;
		console.log(l);
		showCurrent(l);	
	});
	$('#msright').click(function(){
		//动画关键
		l=parseInt($("#goods").css("left"))+shopw;
		showCurrent(l);	
	});

	function showCurrent(l){
		if($('#goods').is(':animated')){  //判断是否正在执行动画中
			return ;
		}
		$("#goods").animate({"left":l},500,function(){
			if($("#goods").position().left<-2*shopw-10){ 
				
				$("#goods").css("left",0);   

			 }
			 else if($("#goods").position().left>-shopw){ 
				$("#goods").css('left',-3*shopw); 
			}
		});
	}

	//鼠标滑过背景透明度0.8，商品介绍字体为红色
	$('.gs').each(function(index){
		$(this).mouseover(function(){
			$(this).css('opacity',0.8);
			$(this).find('p').css('color','red');
		});
		$(this).mouseout(function(){
			$(this).css('opacity',1);
			$(this).find('p').css('color','#555');
		});
	});
}
