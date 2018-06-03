/*
* @Author: name
* @Date:   2017-09-27 10:56:08
* @Last Modified by:   name
* @Last Modified time: 2018-04-16 23:27:14
*/
var oCont = document.querySelector('.cont1');
var oBtn = document.querySelector('.btn');
var oVideo = document.querySelector('.video1');
var video = document.getElementsByTagName("video")[0];
var oDanmu = document.querySelector(".danmuku");
var message = "";
var date_time = "";
var video_time = "";
var cW = oVideo.offsetWidth;
var cH = oVideo.offsetHeight;
/*var Odanmu = document.querySelector(".danmuku-list");*/
oBtn.onclick = send;
//键盘回车事件
function clik(e){
    e=e||window.event;
    if (e.keyCode == 13)
            send();

}
/*//danmuku-list类生成
function danmu_list(){
    var oLi = document.createElement("li");
    oLi.className = "danmuku-list";
    oDanmu.appendChild(oLi);
}*/
//随机整数函数封装
function random(start,end){
    return start + ~~(Math.random()*(end-start));

}
//获取视频播放时间函数
function videoA(){
    var Speed = video.currentTime;
    var Min = Math.floor(Speed/60);
    if ( Min < 10) {
    Min = "0" + Min;
}
    var Sec = Math.floor(Speed%60);
    if(Sec<10){
        Sec = "0"+Sec;
    }
    return Min+":"+Sec;

}
//时间函数封装
function date(){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if(minute<10){
        minute = "0"+minute;
    }
    /*var total = month+'-'+day+'  '+hour':'+minute;*/
    var arr = new Array()
    arr.push(month,"-",day,"  ",hour,":",minute);
    var newarr = "";
    for(var a in arr){
        newarr+=arr[a];
    }
    return newarr;
}
//点击按钮事件
function send(){
    if(oCont.value.length<=0||(/^\s+$/).test(oCont.value)){
        alert("请输入弹幕内容");
        return false;
    }else if(oCont.value.length>=20){
        var warn = document.querySelector(".st");
        warn.classList.add('fifter-cont');
        wring();
        return false;

    }
    video_time = videoA();
    message = oCont.value;
    date_time = date();
    crateEle(message);
    danmu(video_time,message,date_time);
    oCont.value = "";
}
//创建弹幕函数
function crateEle(message){
    var span = document.createElement("span");
    span.innerHTML = message;
    span.style.position="absolute";
    span.style.top = random(15,410)+"px";
    /*alert(span.style.top);*/
    span.style.left = cW + "px";
    oVideo.appendChild(span);
    roll.call(span,{
        timing:['linear','ease-out'][~~(Math.random()*2)],//数组
        color:'#'+(~~(Math.random()*(1<<24))).toString(16),//颜色改变
        fontSize:random(16,24),

    })
}
//弹幕样式以及滚动函数
function roll(opt){
    opt.timing = opt.timing;
    opt.color1 = opt.color;
    opt.fSzie = opt.fontSize;
   /* alert(opt.fSzie);*/
    this._left = parseInt(this.offsetLeft)
    this.style.color = opt.color1;
    this.style.fontSize= opt.fSzie+"px";
    this.timer = setInterval(function(){
        if(this._left < 10){
            clearInterval(this.timer);
            this.parentNode.removeChild(this);
            //this.style.display = "none";
            return false;//终止函数
        }
        switch(opt.timing){
            case'linear':this._left += (0-this._left)*0.05;
                            break;
            case'ease-out':this._left+=-2;
                            break;
        }
         this.style.left = this._left+'px';


    }.bind(this),1000/60)

}
//空格控制视频播放暂停
function playPause(){
    myVideo = document.querySelector("video");
    if(myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}
function spaceClick(e){
    var e=e||window.event;
    if(e.keyCode === 32)
        playPause();
}
function danmu(video_time,bili,date_time){
    var oLi = document.createElement("li");//创建父节点，下面是三个子节点
    oLi.className = "danmuku-list";
    oDanmu.appendChild(oLi);
    var danmu = document.createElement("span");
    var time = document.createElement("span");
    var date = document.createElement("span");
    danmu.innerHTML = bili;//获得提交时的信息，并且转化为文本。
    danmu.title = bili;//设置节点的title属性
    /*danmu.className="danmuku-content";
    danmu.className=""+"bar-content";
*/  danmu.classList.add("danmuku-content","bar-content");//增加多个类使用classList.add()方法
    date.innerHTML = date_time;
   /* date.className = "danmuku-send-time";
    date.className = ""+"send-time";*/
    date.classList.add("danmuku-send-time","send-time");
    time.innerHTML = video_time;
  /*  time.className = "danmuku-time";
    time.className = ""+"bar-time";*/
    time.classList.add("danmuku-time","bar-time");
    oLi.appendChild(time);
    oLi.appendChild(danmu);
    oLi.appendChild(date);
}
function wring(){
    var vWidth = video.offsetWidth;
    var vHeight = video.offsetHeight;
    var fifter = document.querySelector(".fifter");
    var fWidth = fifter.offsetWidth;
    var fHeight = fifter.offsetHeight;
    fifter.style.position = "fixed";
    fifter.style.marginTop = (vHeight-fHeight)/2+"px";
    fifter.style.marginLeft = (vWidth-fWidth)/2+"px";
}
