canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");

var encourAnim=true;
var miny=-10;
var maxy=10;
var avy=1;

var dt=new Date();
var dan=dt.getTime();
var tpan=0;

var tex=1000;
var tey=1000;

var couleurs=["rgb(100,200,100)","rgb(200,100,100)","rgb(100,100,200)","rgb(200,200,100)","rgb(100,200,200)","rgb(0,100,200)","rgb(200,0,100)","rgb(200,100,0)","rgb(100,100,100)","rgb(200,0,250)","rgb(250,100,0)","rgb(0,250,0)","rgb(10,0,250)"]

function f(num,x){
    var y=parseInt(document.getElementById("Y").value);
    var ff=null;
    try{
        eval("var ff="+document.getElementById("f"+num).value+";");
        //console.log("var ff="+document.getElementById("f"+num).value+"; x="+x+"  y="+ff);
    }
    catch(error){
        //console.log(error);
    }
    return ff;
}

function anim(){
    var y=parseInt(document.getElementById("Y").innerHTML);
    
    y+=avy;
    if(y>=maxy){
        y=maxy;
        avy=-avy;
    }
    if(y<=miny){
        y=miny;
        avy=-avy;
    }
    document.getElementById("Y").value=y;
    document.getElementById("Y").innerHTML=y;
}

function aff(){
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,tex,tey);
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.beginPath();
    ctx.moveTo(0,parseInt(tey/2));
    ctx.lineTo(tex,parseInt(tey/2));
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(parseInt(tex/2),0);
    ctx.lineTo(parseInt(tex/2),tey);
    ctx.stroke()
    for(w=1;w<10;w++){
        ctx.beginPath();
        ctx.strokeStyle=couleurs[w];
        ctx.moveTo(-tex/2,tey/2-f(w,-tex/2));
        for(x=-tex/2;x<tex/2;x++){
            try{
                val=f(w,x);
                ctx.lineTo(tex/2-x,tey/2-val);
            }
            catch(error){
            
            }
        }
        ctx.stroke();
    }
}












function mainAnim(){
    function boucle(){
        if( true ){
            aff();
            anim();
        }
        if(encourAnim) window.requestAnimationFrame( boucle );
    }
    window.requestAnimationFrame( boucle );
}













