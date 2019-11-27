var canvas = document.getElementById("User");
canvas.width  = window.innerWidth-50;
var wid = window.innerWidth;
canvas.height = window.innerHeight-30;
var hei =  window.innerHeight;
var ctxUser = canvas.getContext("2d");


TURN_SPEED = 2;

BULLET_SPREAD = 11;
BULLET_SPEED = 5;

function spread(spread) {
  return Math.floor(Math.random() * spread) - spread/2;
}

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var fire = false;
function keysPressed(event) {
  if (event.keyCode == 37) { user.ddeg = -TURN_SPEED; } // left
  if (event.keyCode == 39) { user.ddeg = TURN_SPEED; } // right
  if (event.keyCode == 32 || fire) { 
    fire = true;
    newBullet(
      user.x,
      user.pointX(user.deg+spread(BULLET_SPREAD))/BULLET_SPEED,
      user.y,
      user.pointY(user.deg+spread(BULLET_SPREAD))/BULLET_SPEED)
  } 
}
function keysReleased(event) {
  if (event.keyCode == 37) { user.ddeg = 0; } // left
  if (event.keyCode == 39) { user.ddeg = 0; } // right
  if (event.keyCode == 32) { fire = false; } 
}
function rad (num) {
  return num * Math.PI / 180;
}
function newBullet( ux, udx, uy, udy) {
  bullets.push({
    x : Math.round(ux),
    dx: udx,
    y : Math.round(uy),
    dy: udy,
  })

}
function drawAllBullets(context, bullets) {
  if (bullets.length != 0) {
    for (i=0; i<bullets.length; i++) {
      // This deletes bullets out of frame
      if ((bullets[i].x > window.innerWidth / 2 || bullets[i].x < -window.innerWidth / 2) ||
          (bullets[i].y > window.innerHeight / 2 || bullets[i].y < -window.innerHeight / 2)) {
            bullets.splice(i,1);
            continue;
          }
          // 
      drawBullet(context, bullets[i]);
    }
  }
}
function drawBullet(context, bullet) {
  bullet.x += bullet.dx;
  bullet.y += bullet.dy;
  context.beginPath();
  context.arc((canvas.width/2)+bullet.x, (canvas.height/2)+bullet.y, 5, 0, 2 * Math.PI);
  context.stroke();
}
function drawUser(context,user) {
  if (user.deg > 360) { user.deg = 0; }
  else if (user.deg < 0) { user.deg = 360; }
  context.save();
  context.translate((canvas.width/2)+user.x,(canvas.height/2)+user.y);
  user.deg += user.ddeg;
  context.rotate(rad(user.deg));
  context.drawImage(user.IMG,-25,-25,user.sizeX,user.sizeY);
  context.restore();
}
function drawPoint(context, canvas, user, deg) {
    if (deg < 0) { deg += 360; }
    if (deg > 360) { deg -= 360; }
    xc = (canvas.width/2) + user.x + Math.round(user.pointX(Math.abs((deg)%360))/2.2);
    yc = (canvas.height/2)+ user.y + Math.round(user.pointY(Math.abs((deg)%360))/2.2);
    context.fillStyle = "#00FF00";
    context.fillRect(xc,yc,2,2);
}
function drawMiddle(context, canvas, user) {
    var xc1 = (canvas.width/2) + user.x-1;
    var yc1 = (canvas.height/2)+ user.y-1;
    context.fillStyle = "#FFFFFF";
    context.fillRect(xc1,yc1,2,2);
}
function trig(len, deg) {
  return len * (Math.sin(rad(deg))/Math.sin(rad(90)));
}
// This is really laggy when it is used
function refreshScreen(context, canvas, window, wid, hei) {
  if ( wid != window.innerWidth) { canvas.width  = window.innerWidth-50; }
  if ( hei != window.innerHeight) { canvas.height = window.innerHeight-30; }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#777777";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
var user = {
  // size of ship
  IMG : new Image(),

  sizeX : 50,
  sizeY : 50,
  side  : function () {
    return Math.sqrt(((this.sizeX/2)**2) + (this.sizeY**2));
  },

  // position of the back left of the ship
  x : 0, 
  dx: 0,
  y : 0,
  dy: 0,

  // 0 degrees rotation is facing right
  deg : 0,
  ddeg: 0,

  // finds a X and Y in any direction 
  pointX : function (deg) {
    if (deg >= 0 && deg < 90) { return trig(this.side(), 90-deg); }
    else if (deg >= 90 && deg < 180) { return -trig(this.side(), 90-(180-deg)); }
    else if (deg >= 180 && deg < 270) { return -trig(this.side(), 270-deg); }
    else if (deg >= 270 && deg <= 360) { return trig(this.side(), deg-270); }
  },

  pointY : function (deg) {
    if (deg >= 0 && deg < 90) { return trig(this.side(), deg); }
    else if (deg >= 90 && deg < 180) { return trig(this.side(), 180-deg); }
    else if (deg >= 180 && deg < 270) { return -trig(this.side(), 90-(270-deg)); }
    else if (deg >= 270 && deg <= 360) { return -trig(this.side(), 90-(deg-270)); }   
  },


  // calculates the location of the three corners of the ship
  // if any of these make contact with a rock they die
  
  points : function() {
    var array = new array(3);
    array[0] = (this.pointX(user.deg),this.pointY(user.deg));
    deg = user.deg-135;
    if (deg < 0) { deg += 360; }
    array[1] = (this.pointX(user.deg-135),this.pointY(deg));
    deg = user.deg+135;
    if (deg > 360) { deg -= 360; }
    array[2] = (this.pointX(user.deg+135),this.pointY(deg));
    return array;
  }
  
}
user.IMG.src = 'Z:/CS/290/Final/public/assets/right-arrow.svg';
var bullets = [];

function render() {
  refreshScreen(ctxUser, canvas, window, wid, hei);

  drawUser(ctxUser, user);
  drawAllBullets(ctxUser, bullets);

  drawMiddle(ctxUser, canvas, user);
  drawPoint(ctxUser, canvas, user, user.deg);
  drawPoint(ctxUser, canvas, user, user.deg-135);
  drawPoint(ctxUser, canvas, user, user.deg+135);

  }
renderInterval = setInterval(render, 1000 / 60);