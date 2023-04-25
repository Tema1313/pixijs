import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import testdata from "./testData/testsmall.json"
import wardrobe from "./testData/wardrobe.json"
import ElementWardrobe from './WardrobeElement';


const App = () => {
  //Создание канваса
  const app = new PIXI.Application<HTMLCanvasElement>({ background: "#FFFFFF", width: 2000, height: 2000 });
  //Добавление канваса
  document.body.appendChild(app.view);
  document.body.style.margin = "20px"

  //Создаем контейнер
  const container = new PIXI.Container();

  testdata.map((element) => {
    //Определяем, базовый ли это контейнер
    if (element.set1 && element.set2) {
      //создаем графику для контейнера
      const graphics = new PIXI.Graphics();
      //Обводка контейнера
      graphics.lineStyle(1, "#000000");
      //Определяем цвет и закрашиваем контейнер
      const color = element.col.slice(2)
      graphics.beginFill(color);
      //Определяем ширину базового контейнера
      // const baseWidth = element.un_width * element.set1 * element.set2
      // element.baseWidth = baseWidth
      // //Определяем высоту базового контейнера
      // const baseHeight = element.un_height * element.set1
      // element.baseHeight = baseHeight
      // //Определяем количество элементов внутри контейнера
      // const heightChildElements = Math.floor(baseHeight / element.inner_un)
      // element.heightChildElements = heightChildElements
      //Отрисовываем данный контейнер
      // graphics.drawRect(1, 0, baseWidth, baseHeight);
      graphics.drawRect(1, 0, 600, 1200);

      container.addChild(graphics)
    }
    //работа с остальными(дочерними) элементами
    else {
      // let containerWidth = 0
      // //создаем графику для контейнера
      // const graphics = new PIXI.Graphics();
      // //Обводка контейнера
      // graphics.lineStyle(1, "#000000");
      // //Определяем цвет и закрашиваем контейнер
      // const color = element.col.slice(2)
      // graphics.beginFill(color);
      // //Возвращаем id элемента по клику
      // graphics.interactive = true
      // graphics.cursor = "pointer"
      // graphics.on("click",()=>{console.log(element.un_id)})

      // //Определяем родительский элемент
      // const parentElement = testdata.find(possibileParent => possibileParent.un_id === element.un_parent_id)
      // //Определяем ширину контейнера
      // if (parentElement.div_v !== 0) {
      //   containerWidth = Math.floor((parentElement.baseWidth * element.un_width) / parentElement.div_v)
      // }
      // //Определяем высоту контейнера
      // const containerHeight = parentElement.heightChildElements * element.un_height
      // //Определяем координату по оси x для элемента и для потомков
      // let coordX = containerWidth * element.pos_x
      // if (coordX === 0) {
      //   coordX = 1
      // }
      // element.coordX = coordX
      //В каком порядке располагаем элементы
      // if (parentElement.fu === 0) {
      //   //Обратный порядок элементов относительно родительского контейнера

      //   let coordY = 0
      //   //Определяем координату по оси y
      //   if (parentElement.coordY) {
      //     coordY = parentElement.coordY
      //   } else {
      //     coordY = parentElement.baseHeight - ((element.pos_y + 1) * containerHeight)
      //   }
      //   element.coordY = coordY
      //   //Отрисовываем данный контейнер
      //   graphics.drawRect(coordX, coordY, containerWidth, containerHeight);
      //   container.addChild(graphics)
        // //Если есть дети, то имя располагаем в отдельном контейнере
        // if (element.has_childs) {
        //   //Высота контейнера
        //   const innerContainerHeight = 30
        //   //создаем графику для контейнера
        //   const innerGraphics = new PIXI.Graphics();
        //   //Обводка контейнера
        //   innerGraphics.lineStyle(1, "#000000");
        //   element.coordY = element.coordY + 30
        //   //Для потомков создаем ширину и высоту элемента
        //   const baseHeight = containerHeight - innerContainerHeight
        //   element.baseHeight = baseHeight
        //   const baseWidth = containerWidth
        //   element.baseWidth = baseWidth
        //   //Определяем высоту элементов внутри контейнера
        //   const heightChildElements = Math.floor(baseHeight / element.inner_un)
        //   element.heightChildElements = heightChildElements
        //   //Создаем текст и центрируем его
        //   const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
        //   text.x = Math.floor(containerWidth / 2)
        //   text.y = coordY + Math.floor(innerContainerHeight / 2)
        //   text.anchor.set(0.5)
        //   //Отрисовываем данный контейнер
        //   innerGraphics.drawRect(coordX, coordY, containerWidth, innerContainerHeight);
        //   //Добавляем текст в контейнер
        //   innerGraphics.addChild(text)
        //   container.addChild(innerGraphics)
        // } else {
        //   //Если детей нет
        //   //Создаем текст и центрируем его
        //   const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
        //   text.x = coordX + Math.floor(containerWidth / 2)
        //   text.y = coordY + Math.floor(containerHeight / 2)
        //   text.anchor.set(0.5)
        //   text.angle = 90
        //   graphics.addChild(text)
        // }
      // } else {
      //   //Прямой порядок
      //   //Определяем координату по оси y
      //   const coordY = (element.pos_y * containerHeight)
      //   //Определяем координату по оси x
      //   const coordX = 1
      //   //Отрисовываем данный контейнер
      //   graphics.drawRect(coordX, coordY, containerWidth, containerHeight);
      //   container.addChild(graphics)
      // }
    }
  })

  app.stage.addChild(container);

  //узнаем, насколько пикселей разделяем 

  // //создаем графику
  // const graphics = new PIXI.Graphics();

  // //создаем текст с надеждой, что его можно добавить на наш прямоугольник
  // graphics.lineStyle(2, "#000000", 1);
  // graphics.beginFill("#FF774B");
  // graphics.drawRect(2, 2, widthContainer, heightContainer);
  // graphics.endFill();

  // app.stage.addChild(graphics);

  return app
}

export default App;
