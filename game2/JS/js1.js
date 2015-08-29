/**
 * Created by q4156_000 on 2015/8/16.
 */
var v_canvas=document.getElementById('canvas01');
var context=v_canvas.getContext('2d');
var grade=document.getElementById('grade');
var bgm=document.getElementById('bgm');
var highest=document.getElementById('highest');
//背景
var bg1=new Image();
bg1.src='images/img_bg1.jpg';

//飞机
var airplane1=new Image();
airplane1.src='images/airplane2.png';
var aw,ah;//飞机宽高

//爆炸
var blastvar=new Image();
blastvar.src='images/baozha.png';

//导弹
var missile=new Image();
missile.src='images/missile.png';
var mw,mh;//导弹宽高
var by1;//导弹位置

var y1=0;
var y2=-630;
var ax1=150;
var ay1=530;
var up=false;
var left = false;
var right = false;
var bottom = false;
var bx1=Math.random()*420;//导弹出现位置
var score=0;//分数
var speed=5;//速度
var cy1=0;//爆炸图位置
var tim;
var tim2;

missile.onload = function(){
    aw=airplane1.width;
    ah=airplane1.height;
    mw= missile.width;
    mh= missile.height;
    by1=-mh;
    var startsou= document.createElement("audio");//开始声音
    startsou.setAttribute("src","music/readygo.ogg");
    startsou.setAttribute("autoplay","true");
    document.body.appendChild(startsou);
    context.drawImage(bg1,0,0,512,768,0,y1,420,630);
    context.drawImage(bg1,0,0,512,768,0,y2,420,630);
    context.drawImage(airplane1,ax1,ay1,aw,ah);
    setTimeout(start,1000);//
};


function start() {//启动主函数
    if(ax1!=150){
        ax1=150;
    }
    if(ay1!=530){
        ay1=530
    }
    setInterval(function () {//速度增加函数
        speed += 1;
    }, 5000);
    tim = setInterval(funbg, 10);
}

function funbg(){
    context.clearRect(0,0,420,630);
    context.drawImage(bg1,0,0,512,768,0,y1,420,630);
    context.drawImage(bg1,0,0,512,768,0,y2,420,630);
    y1++;
    y2++;
    if(y1==631){
        y1=0;
        y2=-630;
    }
    context.drawImage(airplane1,ax1,ay1,aw,ah);
    context.drawImage(missile,bx1,by1,mw,mh);
    by1+=speed;
    if(by1>=(630+mh)){
        bx1=Math.random()*420;
        by1=-mh;
        score+=1;
        if(score==10){//分数音效
            var g10 = document.createElement("audio");
            g10.setAttribute("src","music/ciji.ogg");
            g10.setAttribute("autoplay","true");
            document.body.appendChild(g10);
        }
        else if(score==20){
            var g20 = document.createElement("audio");
            g20.setAttribute("src","music/cool.ogg");
            g20.setAttribute("autoplay","true");
            document.body.appendChild(g20);
        }
        else if(score==30){
            var g30 = document.createElement("audio");
            g30.setAttribute("src","music/yahoo.ogg");
            g30.setAttribute("autoplay","true");
            document.body.appendChild(g30);
        }
        else if(score==40){
            var g40 = document.createElement("audio");
            g40.setAttribute("src","music/great.ogg");
            g40.setAttribute("autoplay","true");
            document.body.appendChild(g40);
        }
        else if(score==50){
            var g50 = document.createElement("audio");
            g50.setAttribute("src","music/ace.ogg");
            g50.setAttribute("autoplay","true");
            document.body.appendChild(g50);
        }
    }
    if((((ax1+aw-5)>=bx1)&&(ax1<=(bx1+mw-5)))&&(((ay1+ah-30)>=by1)&&(ay1<=by1+mh-5))) {//判断碰撞
        clearInterval(tim);
        var a1 = document.createElement("audio");
        a1.setAttribute("src","music/baozha2.ogg");
        a1.setAttribute("autoplay","true");
        document.body.appendChild(a1);
        tim2=setInterval(bang,50);

    }
    grade.innerHTML="Your score:"+score;
}

setInterval(function(){
    if(left){
        ax1-=3;
    }
    else if(right){
        ax1+=3;
    }
    else if(bottom){
        ay1+=3;
    }
    else if(up){
        ay1-=3;
    }
    if(ax1<=0){
        ax1=0;
    }
    else if(ax1>=(420-aw)){
        ax1=(420-aw);
    }
    if(ay1<=0){
        ay1=0;
    }
    else if(ay1>=(630-ah)){
        ay1=(630-ah);
    }
},5);

//键盘按下
document.onkeydown = function(e){
    var e = e || window.e;
    var keyCode = e.keyCode;
    switch(keyCode){
        case 37: left = true;break;
        case 38: up= true;break;
        case 39: right = true;break;
        case 40: bottom = true;break;
        case 32:  = true;break;
    }
};
//键盘离开
document.onkeyup=function(e) {
    var e = e || window.e;
    var keyCode = e.keyCode;
    switch(keyCode){
        case 37: left = false;break;
        case 38: up= false;break;
        case 39: right = false;break;
        case 40: bottom = false;break;
    }
};

function bang(){//爆照图片
    context.clearRect(0,0,420,630);
    context.drawImage(bg1,0,0,512,768,0,y1,420,630);
    context.drawImage(bg1,0,0,512,768,0,y2,420,630);
    context.drawImage(blastvar,0,cy1,158,160,bx1-50,by1,158,160);
    cy1+=160;
    if(cy1>800){
       clearInterval(tim2);
        var a2 = document.createElement("audio");
        a2.setAttribute("src","music/gameover.ogg");
        a2.setAttribute("autoplay","true");
        document.body.appendChild(a2);
        bgm.pause();
    }
}
