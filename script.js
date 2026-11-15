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
        var a = Math.random() * Math.PI * 2;
        var big = Math.random() < 0.015;

        stars.push({
            ox: Math.cos(a) * dist,
            oy: Math.sin(a) * dist,
            r: big ? 1.8 + Math.random() : Math.random() * 1.4 + 0.3,
            big: big,
            d: Math.random() ,
            t: Math.random() * 6,
            c: whites[Math.floor(Math.random() * whites.length)]
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
        c: neon[Math.floor(Math.random() * neon.length)]
    });
}

function drawStars(time) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    for (var i = 0; i < stars.length; i++) {
        var s = stars[i]; 
        var a = 0.5 + 0.5 * Math.sin(time / 600 + s.t);
        var x = w / 2 + s.ox * cos - s.oy * sin + mx * s.d * 25;
        var y = h / 2 + s.ox * sin + s.oy * cos + my * s.d * 25;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + s.c + "," + a + ")";
        ctx.shadowBlur = s.big ? 18 : 6;
        ctx.shadowColor = "rgb(" + s.c + ")";
        ctx.fill();
    }
}

function drawFalling() {
    for (var j = falling.length - 1; j >= 0; j--) {
        var f = falling[j];
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;
        f.life -= 0.011;

        if (Math.random() < 0.6) {
            sparks.push({
                x: f.x, y: f.y,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                life: 1,
                c: f.c
            });
        }

        var tx = f.x - Math.cos(f.angle) * f.len;
        var ty = f.y - Math.sin(f.angle) * f.len;
        var g = ctx.createLinearGradient(f.x, f.y, tx, ty);
        g.addColorStop(0, "rgba(255,255,255," + f.life + ")");
        g.addColorStop(0.3, "rgba(" + f.c + "," + f.life * 0.7 + ")");
        g.addColorStop(1, "rgba(" + f.c + ",0)");
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 14;
        ctx.shadowColor =  "rgb(" + f.c + ")";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + f.life + ")";
        ctx.fill();

        if (f.life <= 0) falling.splice(j, 1);
    }
}

function drawSparks() {
    for (var k = sparks.length - 1; k >= 0; k--) {
        var p = sparks[k];

        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.c + "," + Math.max(p.life, 0) + ")";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgb(" + p.c + ")";
        ctx.fill();

        if (p.life <= 0) sparks.splice(k, 1);
    }
}

function draw(time) {
    ctx.clearRect(0, 0, w, h);
    angle += 0.00015;

    mx += (targetX - mx) * 0.05;
    my += (targetY - my) * 0.05;

    drawStars(time);
    drawFalling();
    drawSparks();

    requestAnimationFrame(draw);
}

function loop() {
    newFallingstar();
    if (Math.random() < 0.25) setTimeout(newFallingstar, 350);
    setTimeout(loop, 2000 + Math.random() * 3000);
}


window.onmousemove = function(e) {
    targetX = -(e.clientX / w - 0.5);
    targetY = -(e.clientY / h - 0.5);
};

window.onclick = newFallingstar;

window.onresize = function(){
    setSize();
    makeStars();
};
setSize();
makeStars();
loop();
requestAnimationFrame(draw);
