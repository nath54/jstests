canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");


var encourAnim=true;

var dt=new Date();
var dan=dt.getTime();
var tpan=0;

var tex=parseInt(canvas.width);
var tey=parseInt(canvas.height);

var couleurs=[]

for(x=0;x<11;x++){
    couleurs.push( [parseInt(Math.random()*255),parseInt(Math.random()*255),parseInt(Math.random()*255)] );
}

function f(num,x){
    var y=parseFloat(document.getElementById("Y").value);
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
    var y=parseFloat(document.getElementById("Y").innerHTML);
    var miny=parseFloat(document.getElementById("miny").value);
    var maxy=parseFloat(document.getElementById("maxy").value);
    var avy=parseFloat(document.getElementById("avy").value);
    y+=avy;
    if(y>=maxy){
        y=maxy;
        avy=-avy;
    }
    if(y<=miny){
        y=miny;
        avy=-avy;
    }
    document.getElementById("avy").value=avy;
    document.getElementById("Y").value=y;
    document.getElementById("Y").innerHTML=y;
}

function aff(){
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,tex,tey);
    var img=[]
    var img[tex][tey][3]=0
    var r=5
    for(w=1;w<10;w++){
        var cl=couleurs[w]
        if( document.getElementById("f"+w).value != ""){
            for(x=-tex/2;x<tex/2;x++){
                try{
                    val=f(w,x);
                    for(w=-r;w<r;w++){
                        ww=w
                        if(ww<0) ww=-ww
                        ii=img[parseInt(x),parseInt(val)]
                        img[parseInt(x),parseInt(val)]=[(ii[0]+(ww/r*cl[0]))/2,(ii[1]+(ww/r*cl[1]))/2,(ii[2]+(ww/r*cl[2]))/2]
                    }
                }
                catch(error){
                
                }
            }
        }
    }
    for(x=0;x<tex;x++){
        for(y=0;y<tey;y++){
            ctx.fillStyle="rgb("+img[x][y][0]+","+img[x][y][1]+","+img[x][y][2]+")";
            ctx.fillRect(x,y,1,1);
        }
    }
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.beginPath();
    ctx.moveTo(0,parseInt(tey/2));
    ctx.lineTo(tex,parseInt(tey/2));
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(parseInt(tex/2),0);
    ctx.lineTo(parseInt(tex/2),tey);
    ctx.stroke()
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













