import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import testdata from "./testData/testsmall.json"

const App = () => {
  //Создание канваса
  const app = new PIXI.Application({ background: testdata.col, width: 720+2, height: 500+3});
  //Добавление канваса
  document.body.appendChild(app.view);
  document.body.style.margin = "20px"

  const container = new PIXI.Container();
  app.stage.addChild(container);


  //узнаем, насколько пикселей разделяем 
  const heightContainer = Math.floor(500/testdata.un_height)

  const widthContainer = Math.floor(720/testdata.un_width-2)

  //создаем графику
  const graphics = new PIXI.Graphics();

  //создаем текст с надеждой, что его можно добавить на наш прямоугольник


  graphics.lineStyle(2, "#000000", 1);
  graphics.beginFill("#FF774B");
  graphics.drawRect(2, 2, widthContainer, heightContainer);
  graphics.endFill();

  graphics.lineStyle(2, "#000000", 1);
  graphics.beginFill("#FF774B");
  graphics.drawRect(2, heightContainer+2, widthContainer, heightContainer);
  graphics.endFill();

  graphics.lineStyle(2, "#000000", 1);
  graphics.beginFill("#FF774B");
  graphics.drawRect(2, heightContainer*2+2, widthContainer, heightContainer);
  graphics.endFill();

  graphics.lineStyle(2, "#000000", 1);
  graphics.beginFill("#FF774B");
  graphics.drawRect(2, heightContainer*3+2, widthContainer, heightContainer);
  graphics.endFill();



  app.stage.addChild(graphics);

  return (
    <>

    </>
  )
}

export default App;

// const App = () => {
//   const app = new PIXI.Application({ background: '#1099bb' });
//   document.body.appendChild(app.view);

//   // create a texture from an image path
//   const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');

//   // Scale mode for pixelation
//   texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

//   for (let i = 0; i < 10; i++) {
//     createBunny(
//       Math.floor(Math.random() * app.screen.width),
//       Math.floor(Math.random() * app.screen.height),
//     );
//   }

//   function createBunny(x, y) {
//     const graphics = new PIXI.Graphics();
//     graphics.interactive = true;
//     graphics.cursor = "pointer"
//     graphics.scale.set(3)
//     graphics.lineStyle(2, "#000000", 1);
//     graphics.beginFill("#FF774B");
//     graphics.on('pointerdown', onDragStart, graphics)
//     graphics.x = x
//     graphics.y = y
//     graphics.pivot.x = graphics.po
//     graphics.pivot.y = 50
//     graphics.drawRect(0, 0, 100, 100);
//     graphics.endFill();
//     app.stage.addChild(graphics)
    
//     // // create our little bunny friend..
//     // const bunny = new PIXI.Sprite(texture);

//     // // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
//     // bunny.interactive = true;

//     // // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
//     // bunny.cursor = 'pointer';

//     // // center the bunny's anchor point
//     // // bunny.anchor.set(0.5);

//     // // make it a bit bigger, so it's easier to grab
//     // bunny.scale.set(3);

//     // // setup events for mouse + touch using
//     // // the pointer events
//     // bunny.on('pointerdown', onDragStart, bunny);

//     // // move the sprite to its designated position
//     // bunny.x = x;
//     // bunny.y = y;

//     // // add it to the stage
//     // app.stage.addChild(bunny);
//   }

//   let dragTarget = null;

//   app.stage.interactive = true;
//   app.stage.hitArea = app.screen;
//   app.stage.on('pointerup', onDragEnd);
//   app.stage.on('pointerupoutside', onDragEnd);

//   function onDragMove(event) {
//     if (dragTarget) {
//       dragTarget.parent.toLocal(event.global, null, dragTarget.position);
//     }
//   }

//   function onDragStart() {
//     // store a reference to the data
//     // the reason for this is because of multitouch
//     // we want to track the movement of this particular touch
//     // this.data = event.data;
//     this.alpha = 0.5;
//     dragTarget = this;
//     app.stage.on('pointermove', onDragMove);
//   }

//   function onDragEnd() {
//     if (dragTarget) {
//       app.stage.off('pointermove', onDragMove);
//       dragTarget.alpha = 1;
//       dragTarget = null;
//     }
//   }

//   return (
//     <>

//     </>
//   )
// }

// export default App;
