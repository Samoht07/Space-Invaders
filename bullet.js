class Bullet{
  constructor(x, y, h, w, c, ySpeed){
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.c = c;
    this.ySpeed = ySpeed;
  }

  draw(){
      canvasContext.fillStyle = this.c;
      canvasContext.fillRect(this.x, this.y, this.w, this.h)
  }

  move(){
    this.y -= this.ySpeed;
  }

  outOfBounds(){
    return this.y < 0;
  }

  hasHitItem(item){
    return ((this.x + this.w) >= item.x && this.x < (item.x + item.w)) && ((this.y + this.h) >= item.y
    && this.y <= (item.y + item.h));
  }

  hasHitEnemy(enemy){
    return this.hasHitItem(enemy);
  }

  hasCollided(){
    var self = this;
    var collided = false;
    enemies.forEach(function(enemy,i){
      if (self.hasHitEnemy(enemy)) {
        delete enemies[i];
        collided = true;
      }
    });
    enemies = enemies.filter(item => item !== undefined);
    return collided;
  }

  hasHitItemW(item){
    return ((this.x + this.w) >= item.x && this.x < (item.x + item.w)) && ((this.y + this.h) >= item.y
    && this.y <= (item.y + item.h));
  }

  hasHitWall(wall){
    return this.hasHitItemW(wall);
  }

  hasCollidedWall(){
    var self = this;
    var collidedW = false;
    walls.forEach(function(wall,i){
      if (self.hasHitWall(wall)) {
        delete walls[i];
        collidedW = true;
      }
    });
    walls = walls.filter(item => item !== undefined);
    return collidedW;
  }

}
