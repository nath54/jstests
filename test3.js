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
}

function aff(){
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,tex,tey);
    var img=new Array(tex);
    for(x=0;x<img.length;x++){
        img[x]=new Array(tey);
        for(y=0;y<img[x].length;y++){
            img[x][y]=new Array(3);
            img[x][y][0]=0;
            img[x][y][1]=0;
            img[x][y][2]=0;
        }
    }
    var r=parseInt(document.getElementById("r").value);
    for(w=1;w<10;w++){
        var cl=couleurs[w]
        var el=document.getElementById("f"+w);
        if( el.value != ""){
            for(x=-tex/2;x<tex/2;x++){
                try{
                    val=f(w,x);
                    for(zx=-r;zx<r;zx++){
                        for(zy=-r;zy<r;zy++){
                            var zz=Math.sqrt((zx)**2+(zy**2));
                            if(zz<0) zz=-zz;
                            var xx=parseInt(tex/2-x);
                            var yy=parseInt(tey/2-val);
                            ii=img[xx+zx][yy+zy];
                            //img[xx+zx][yy+zy]=[(ii[0]+((r-zz)/r*cl[0]))/2,(ii[1]+((r-zz)/r*cl[1]))/2,(ii[2]+((r-zz)/r*cl[2]))/2];
                            img[xx+zx][yy+zy]=[((r-zz)/r*cl[0]),((r-zz)/r*cl[1]),((r-zz)/r*cl[2])];
                        }
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
        }
    }
    for(x=0;x<img.length;x++){
        for(y=0;y<img[x].length;y++){
            ctx.fillStyle="rgb("+img[x][y][0]+","+img[x][y][1]+","+img[x][y][2]+")";
            ctx.fillRect(x,y,1,1);
        }
    }
    ctx.strokeStyle="rgb(255,255,255)";
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

function stopAnim(){
    encourAnim=false;
}


function oneFrame(){
    aff();
}










