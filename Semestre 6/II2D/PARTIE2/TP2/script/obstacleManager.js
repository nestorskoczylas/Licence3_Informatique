
export default class ObstacleManager {
  
  
  constructor() {
    this.obstacleList = [];
  }

  add(obs){
    this.obstacleList.push(obs);
  }

  draw(ctx) {
    this.obstacleList.forEach(obs => {
      obs.draw(ctx);
    });
  }
}
