import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import testdata from "./testData/testsmall.json"
import wardrobe from "./testData/wardrobe.json"

// const App = () => {
//   //Создание канваса
//   const app = new PIXI.Application({ background: testdata[0].col, width: 720+2, height: 500+3});
//   //Добавление канваса
//   document.body.appendChild(app.view);
//   document.body.style.margin = "20px"

//   const container = new PIXI.Container();
//   app.stage.addChild(container);

//   console.log(wardrobe)

//   //узнаем, насколько пикселей разделяем 
//   const heightContainer = Math.floor(500/testdata[0].un_height)

//   const widthContainer = Math.floor(720/testdata[0].un_width-2)

//   //создаем графику
//   const graphics = new PIXI.Graphics();

//   //создаем текст с надеждой, что его можно добавить на наш прямоугольник
//   graphics.lineStyle(2, "#000000", 1);
//   graphics.beginFill("#FF774B");
//   graphics.drawRect(2, 2, widthContainer, heightContainer);
//   graphics.endFill();

//   const graphics2 = new PIXI.Graphics();

//   graphics2.lineStyle(2, "#000000", 1);
//   graphics2.beginFill("94f89b");
//   graphics2.drawRect(2, heightContainer+2, widthContainer, heightContainer);
//   graphics2.endFill();

//   // graphics.lineStyle(2, "#000000", 1);
//   // graphics.beginFill("#FF774B");
//   // graphics.drawRect(2, heightContainer*2+2, widthContainer, heightContainer);
//   // graphics.endFill();

//   // graphics.lineStyle(2, "#000000", 1);
//   // graphics.beginFill("#FF774B");
//   // graphics.drawRect(2, heightContainer*3+2, widthContainer, heightContainer);
//   // graphics.endFill();



//   app.stage.addChild(graphics);
//   // app.stage.addChild(graphics2);

//   return (
//     <>

//     </>
//   )
// }

// export default App;

const App = () => {
  const app = new PIXI.Application({ background: '#1099bb' });
  document.body.appendChild(app.view);
  document.body.style.margin = "20px"

  // create a texture from an image path
  const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');

  // Scale mode for pixelation
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  for (let i = 0; i < 1; i++) {
    if(i===0){
      createBunny2(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
      );
    }
    createBunny(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height),
    );
  }

  function createBunny(x, y) {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    const basicText = new PIXI.Text('Это текстddddddddddddddddd',{fontSize: 12});
    basicText.x = 50;
    basicText.y = 50;
    basicText.anchor.set(0.5)

    //Делаем графику интерактивной
    graphics.interactive = true;

    graphics.cursor = "pointer"
    //Линия вокруг геометрии
    graphics.lineStyle(2, "#000000", 1);
    //Заливка
    graphics.beginFill("#FF774B");
    graphics.on('pointerdown', onDragStart, graphics)
    graphics.x = x
    graphics.y = y
    graphics.pivot.x = 50
    graphics.pivot.y = 50
    graphics.drawRect(0, 0, 100, 100);
    graphics.endFill();

    graphics.addChild(basicText)
    container.addChild(graphics)
    // container.addChild(graphics, basicText)
    app.stage.addChild(container)
  }

  function createBunny2(x, y) {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    const basicText = new PIXI.Text('Это текст',{fontSize: 12});
    basicText.x = 150;
    basicText.y = 25;
    basicText.anchor.set(0.5)
    //Делаем графику интерактивной
    graphics.interactive = true;

    graphics.cursor = "pointer"
    //Линия вокруг геометрии
    graphics.lineStyle(2, "#000000", 1);
    //Заливка
    graphics.beginFill("#FF774B");
    graphics.on('pointerdown', onDragStart, graphics)
    graphics.x = x
    graphics.y = y
    graphics.pivot.x = 150
    graphics.pivot.y = 25
    graphics.drawRect(0, 0, 300, 50);
    graphics.endFill();

    graphics.addChild(basicText)
    container.addChild(graphics)
    // container.addChild(graphics, basicText)
    app.stage.addChild(container)
  }

  let dragTarget = null;

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  function onDragMove(event) {
    if (dragTarget) {
      // console.log(dragTarget)
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  function onDragStart() {
    // this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  return (
    <>

    </>
  )
}

export default App;
