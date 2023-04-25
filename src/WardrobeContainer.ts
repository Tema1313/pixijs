import * as PIXI from 'pixi.js';
// import WardrobeElement, { IInfoAboutElement } from './WardrobeElement';

import WardrobeElement, { IInfoAboutElement } from "./WardrobeElementWithoutRecursion";

export default class WardrobeContainer {
    app: PIXI.Application<HTMLCanvasElement>
    dragTarget: any

    // // Конструктор с рекурсией
    // constructor(props: IInfoAboutElement[]) {
    //     this.app = new PIXI.Application<HTMLCanvasElement>({ background: "#FFFFFF", width: 2000, height: 2000 });
    //     //Создаем контейнер
    //     const container = new PIXI.Container();
    //     //Находим базовый контейнер, с которого начинаем построение дерева
    //     const baseContainer = props.find(element => element.set1 && element.set2)

    //     container.addChild(new WardrobeElement(baseContainer, props).elementWardrobe)
    //     this.app.stage.addChild(container);
    // }

    //Конструктор без рекурсии
    constructor(props: IInfoAboutElement[]) {
        this.app = new PIXI.Application<HTMLCanvasElement>({ background: "#FFFFFF", width: 2000, height: 2000 });
        //Создаем контейнер
        const container = new PIXI.Container();
        let a: PIXI.Container;
        //Проходимся по каждому элементу
        props.map(element => {
            if (element.set1 && element.set2) {
                //Базовый контейнер
                new WardrobeElement(element, container)
                // element.containerPixi.on('pointerdown',() => this.onDragStart(element.containerPixi), element)
            } else {
                //Все остальные контейнеры
                const parentElement = props.find(possibileParent => possibileParent.un_id === element.un_parent_id)
                new WardrobeElement(element, parentElement.containerPixi, parentElement)
            }
        })
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerup', this.onDragEnd.bind(this));
        this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));
        this.app.stage.addChild(container);
    }

    onDragMove(event: any) {
        if (this.dragTarget) {
            console.log(this.dragTarget.position)
            console.log(this.dragTarget.parent)
            this.dragTarget.parent.toLocal(event.global, null, this.dragTarget.position);
        }
    }

    onDragStart = (element: any) =>{
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        // this.data = event.data;
        // console.log(this.dragTarget)
        // this.dragTarget = this;
        this.dragTarget = element
        this.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    onDragEnd() {
        if (this.dragTarget) {
            this.app.stage.off('pointermove', this.onDragMove);
            this.dragTarget = null;
        }
    }

}