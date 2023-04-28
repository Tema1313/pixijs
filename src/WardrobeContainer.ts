import * as PIXI from 'pixi.js';
// import WardrobeElement, { IInfoAboutElement } from './WardrobeElement';

import WardrobeElement, { IInfoAboutElement } from "./WardrobeElementWithoutRecursion";

export default class WardrobeContainer {
    app: PIXI.Application<HTMLCanvasElement>

    //Конструктор без рекурсии
    constructor(props: IInfoAboutElement[]) {
        this.app = new PIXI.Application<HTMLCanvasElement>({ background: "#FFFFFF", width: 2000, height: 2000 });
        //Создаем контейнер
        const container = new PIXI.Container();
        //Проходимся по каждому элементу
        props.map(element => {
            if (element.set1 && element.set2) {
                //Базовый контейнер
                new WardrobeElement(element, container, null, props)
            } else {
                //Все остальные контейнеры
                const parentElement = props.find(possibileParent => possibileParent.un_id === element.un_parent_id)
                new WardrobeElement(element, parentElement.customProps.containerPixi, parentElement, props)
            }
        })
        this.app.stage.addChild(container);
    }
}