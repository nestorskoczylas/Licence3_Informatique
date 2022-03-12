import Engine from "./engine.js";
import InteractEngine from "./interactEngine.js";


const main= () => {  
  let ctx=document.getElementById("canvas").getContext("2d");
    
  let engine=new Engine(ctx);
  let interactEngine=new InteractEngine(engine);
  
  engine.start();
}


window.addEventListener("load",main);
