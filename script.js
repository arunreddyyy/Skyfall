var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

var w, h;
var dpr = window.devicePixelRatio || 1;

var stars = [];
var falling = [];
var sparks = [];

var mx = 0,my = 0;
var targetX = 0, targetY = 0;
var angle = 0;

var whites = ["255,255,255", "255,255,255", "170,220,255", "200,170,255"];


var neon = ["0,229,255", "255,60,200", "160,100,255", "80,255,200"];


function setSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0 , dpr, 0, 0);
}


function makeStars() {
    stars = [];


    var R = Math.sqrt(w * w + h * h) / 2;
    var n = Math.floor(Math.PI * R * R / 4000);

    for (var i = 0; i < n; i++) {
        var dist = Math.sqrt(Math.random()) * R;
        var a = Math.ramdom() * Math.PI * 2;
        var big = Math.random() < 0.015;

        stars.push({
            ox: Math.cos(a) * dist,
            oy: Math.sin(a) * dist,
            r: big ? 1.8 + Math.random() : Math.random() * 1.4 + 0.3,
            big: big,
            d: Math.random() ,
            t: Math.random() * 6,
            c: whites[Math.floor(Math.random() * whites.lenght)]
        });
    }
}


function newFallingstar() {
    falling.push({
        x: Math.random() * w,
        y: Math.random() * h / 3,
        len: 100 + Math.random() * 100,
        speed: 9 + Math.random() * 6,
        angle: 2.3 + Math.random() * 0.2,
        life: 1,
        c: neon[Math.floor(Math.random() * neon.lenght)]
    });
}


function drawStars(time) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    for (var i = 0; i < stars.length; i++) {
        
      }
    }