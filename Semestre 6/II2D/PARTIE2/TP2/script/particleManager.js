import Particle from './particle.js';

export default class ParticleManager {
  all=[]; // all particles
  
  
  constructor(n) {
    this.all=Array.from(new Array(n),() => new Particle());
    //this.generator = new Generator(new Vector(0,0), [new Vector(0,0), new Vector(200,200)]);
    this.generatorList = [];
  }
  
    
  update() {
    //this.all.forEach(particle => {
    //  particle.position = particle.position.setRandInt(p1, p2);
    //});
    //this.all.forEach(p => {
    //  this.generator.initParticle(p);
    //});
    // for (let i = 0; i < this.all.length / 2; i++){
    //   this.generatorList[0].initParticle(this.all[i]);
    // }

    // for (let i = this.all.length / 2 ; i < this.all.length; i++){
    //   this.generatorList[1].initParticle(this.all[i]);
    // }
    for (let i = 0; i < this.generatorList.length; i++) {
      this.generatorList[i].nbBirth += this.generatorList[i].birthRate;
    }
    for (let j = 0; j < this.all.length; j++) {
      let particule = this.all[j];
      if (!particule.isAlive) {
        for (let k = 0; k < this.generatorList.length; k++) {
          let generateur = this.generatorList[k];
          if(generateur.nbBirth >= 1) {
            generateur.initParticle(this.all[j]);
            generateur.nbBirth--;
            break;
          }
        }
      }
      else {
        particule.life--;
        if(particule.life === 0) {
          particule.isAlive = false;
          particule.color.a = 1
        }
        else {
          if(particule.life <= 10) {
            particule.color.a -= 0.1;
          }
        }
      }
    }
  }
  
  draw(ctx) {
    for (var i = 0; i < this.all.length; ++i) {
      if (this.all[i].isAlive) {
        this.all[i].draw(ctx);
      }
    }
  }

  add(gen){
    this.generatorList.push(gen);
  }
}
