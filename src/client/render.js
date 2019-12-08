var canvas = document.getElementById("User");
canvas.width  = window.innerWidth-50;
var wid = window.innerWidth;
canvas.height = window.innerHeight-30;
var hei =  window.innerHeight;
var ctxUser = canvas.getContext("2d");


TURN_SPEED = 2;
USER_MAX_SPEED = 12;
USER_ACC = 1;
USER_SLOW = .1;

BULLET_SPREAD = 11;
BULLET_SPEED = 7;
BULLET_TIMER = 8;

ROCK_SPEED = 20;

function spread(spread) {
  return Math.floor(Math.random() * spread) - spread/2;
}

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var timer = 0
var fire = false;
function keysPressed(event) {
  if (event.keyCode == 65) { user.ddeg = -TURN_SPEED; } // left
  if (event.keyCode == 68) { user.ddeg = TURN_SPEED; } // right
  if (event.keyCode == 83) { user.dd = -USER_ACC; } // back
  if (event.keyCode == 87) { user.dd = USER_ACC;} // forward
  if (event.keyCode == 32 || fire) { fire = true; } 
}
function keysReleased(event) {
  if (event.keyCode == 65) { user.ddeg = 0; } // left
  if (event.keyCode == 68) { user.ddeg = 0; } // right
  if (event.keyCode == 32) { fire = false; timer = 0; } 
  if (event.keyCode == 83) { user.dd = USER_SLOW; } // stop back
  if (event.keyCode == 87) { user.dd = -USER_SLOW; } // stop forward
}
function rad (num) {
  return num * Math.PI / 180;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function newBullet( ux, udx, uy, udy) {
  bullets.push({
    x : Math.round(ux),
    dx: udx,
    y : Math.round(uy),
    dy: udy,
  })
}
rocksIMG = new Image();
rocksIMG.src = '../public/assets/game/player.png';
function newRock(user){
  var right = getRandomInt(2);
  var bottom = getRandomInt(2);
  if (right == 1) {right = canvas.width/2}
  else {right = -canvas.width/2}
  if (bottom == 1) {bottom = canvas.height/2}
  else {bottom = -canvas.height/2}
  var theta = getRandomInt(360);
  rocks.push({
    x : right,
    dx: user.pointX(theta)/ROCK_SPEED,
    y : bottom,
    dy: user.pointY(theta)/ROCK_SPEED,
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
function drawAllRocks(context, rocks, bullets) {
  if (rocks.length != 0) {
    for (i=0; i<rocks.length; i++) {
      var print = true;
      for (k=0; k<bullets.length; k++) {
        if ((bullets[k].x > rocks[i].x-25 && bullets[k].x < rocks[i].x+25 ) &&
            (bullets[k].y > rocks[i].y-25 && bullets[k].y < rocks[i].y+25 )) {
              print = false;
              bullets.splice(k,1);
              break;
            }
      }
      if (print) { drawRock(context, rocks[i]); }
      else { rocks.splice(i,1); }
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
function drawRock(context, rock) {
  rock.x += rock.dx;
  rock.y += rock.dy;

  if ( Math.abs(rock.x) > (canvas.width/2) + 20 ) { rock.x *= -1; }
  if ( Math.abs(rock.y) > (canvas.height/2) + 20 ) { rock.y *= -1; }

  context.save();
  context.translate((canvas.width/2)+rock.x,(canvas.height/2)+rock.y);
  context.drawImage(rocksIMG,-25,-25,50,50);
  context.restore();


  /*
  context.beginPath();
  context.arc((canvas.width/2)+bullet.x, (canvas.height/2)+bullet.y, 5, 0, 2 * Math.PI);
  context.stroke();
  */
}
var thrustTimer = 11;
function drawUser(context,user) {
  if (user.deg > 360) { user.deg = 0; }
  else if (user.deg < 0) { user.deg = 360; }
  context.save();
////

if ( Math.abs(user.dd) == 1 || Math.abs(user.d) == USER_MAX_SPEED ) { user.thrust = user.deg; }
if ( user.dd == 1 && user.d > USER_MAX_SPEED) { user.dd = 0; user.d = USER_MAX_SPEED; }
else if ( user.dd == -1 && user.d < -USER_MAX_SPEED) { user.dd = 0; user.d = -USER_MAX_SPEED; }
else if (Math.abs(user.dd) == USER_SLOW && Math.abs(user.d) <= USER_SLOW) { user.dd = 0; user.d = 0; }

if ( Math.abs(user.d + user.dd) <= USER_MAX_SPEED) { user.d += user.dd; }

user.x += user.pointX(user.thrust) / 200 * user.d;
user.y += user.pointY(user.thrust) / 200 * user.d;

if ( Math.abs(user.x) > (canvas.width/2) + 26 ) { user.x *= -1; }
if ( Math.abs(user.y) > (canvas.height/2) + 26 ) { user.y *= -1; }

context.translate((canvas.width/2)+user.x,(canvas.height/2)+user.y);

////
  //console.log(user.delta, user.d, user.dd);
  user.deg += user.ddeg;
  context.rotate(rad(user.deg+90));
  context.drawImage(user.IMG,-25,-25,user.sizeX,user.sizeY);
  if (Math.abs(user.dd) == 1) { thrustTimer = 0}
  context.translate(0,28);
  if (thrustTimer <= 5) {context.drawImage(user.backThrustIMG,-20,-20,40,27);}
  thrustTimer++;
  context.restore();
}
// This is really laggy when it is used
function refreshScreen(context, canvas, window, wid, hei) {
  if ( wid != window.innerWidth) { canvas.width  = window.innerWidth-50; }
  if ( hei != window.innerHeight) { canvas.height = window.innerHeight-30; }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function trig(len, deg) {
  return len * (Math.sin(rad(deg))/Math.sin(rad(90)));
}
var user = {
  // size of ship
  IMG : new Image(),
  backThrustIMG : new Image(),

  sizeX : 50,
  sizeY : 50,
  side  : function () {
    return Math.sqrt(((this.sizeX/2)**2) + (this.sizeY**2));
  },

  // position of the back left of the ship
  x : 0, 
  y : 0,
  thrust: 0,
  d: 0,
  dd: 0,

  // 0 degrees rotation is facing right
  deg : 270,
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
user.IMG.src = '../public/assets/game/player.png';
user.backThrustIMG.src = '../public/assets/game/main_thrust.png';
var bullets = [];
var rocks = [];
function render() {
  refreshScreen(ctxUser, canvas, window, wid, hei);

  if (rocks.length == 0) {
    for (i=0; i<5; i++) {
      newRock(user);
    }
  }

  if ( fire ) {
    if ( timer == BULLET_TIMER ) { timer = 0; }
    if ( timer == 0 ) {
      newBullet(
        user.x,
        user.pointX(Math.abs(user.deg+spread(BULLET_SPREAD)))/BULLET_SPEED,
        user.y,
        user.pointY(Math.abs(user.deg+spread(BULLET_SPREAD)))/BULLET_SPEED)
    }
    timer++;

  }

  drawUser(ctxUser, user);
  drawAllBullets(ctxUser, bullets);
  drawAllRocks(ctxUser, rocks, bullets);

  }
renderInterval = setInterval(render, 1000 / 60);
// clearInterval(renderInterval); // pause