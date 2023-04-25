import * as PIXI from 'pixi.js';

export interface IInfoAboutElement {
    un_id: number,
    stoika_id: number,
    un_parent_id: number,
    obj_id: number,
    obj_typ: number,
    ustr_name?: string,
    pos_x: number,
    pos_y: number,
    div_h: number,
    div_v: number,
    un_height: number,
    un_width: number,
    out_of_stoika: number,
    datev: string,
    datemodif: string,
    username: string,
    fu: number,
    treeobjtyp_kod: number,
    treeobjtyp_name: string,
    inner_un: number,
    col: string,
    has_childs: number,
    flag_ex: number,
    rh_id: number,
    set1?: number,
    set2?: number,
    rh_numb: string,
    can_edit: number,
    shablon_id?: number,
    shablon_name: string,
    unh: number,
    show_in_mode: number,
    // customProps?: ICustomPropsElementWardrobe | undefined
    baseWidth?: number,
    baseHeight?: number,
    heightChildElements?: number,
    coordX?: number,
    coordY?: number,
    containerPixi?: PIXI.Graphics
}

export interface ICustomPropsElementWardrobe {
    baseWidth?: number,
    baseHeight?: number,
    heightChildElements?: number,
    coordX?: number,
    coordY?: number
}

export interface IElement {
    attributes: IInfoAboutElement
    // childs: IElement[]
    customProps: ICustomPropsElementWardrobe | undefined
    // addChildElement: (attributes:IInfoAboutElement, coords: {x: number, y: number})=>void
}

export default class WardrobeElement {
    elementWardrobe: PIXI.Graphics


    constructor(element: IInfoAboutElement, parentElementPixi: PIXI.Container<PIXI.DisplayObject>, parentElement?: IInfoAboutElement) {
        this.elementWardrobe = new PIXI.Graphics()
        //Определяем, базовый ли это контейнер
        if (element.set1 && element.set2) {
            //Обводка контейнера
            this.elementWardrobe.lineStyle(1, "#000000");
            //Определяем цвет и закрашиваем контейнер
            const color = element.col.slice(2)
            this.elementWardrobe.beginFill(color);
            // Определяем ширину базового контейнера
            const baseWidth = element.un_width * element.set1 * element.set2
            element.baseWidth = baseWidth
            //Определяем высоту базового контейнера
            const baseHeight = element.un_height * element.set1
            element.baseHeight = baseHeight
            //Возвращаем id элемента по клику
            this.elementWardrobe.interactive = true
            this.elementWardrobe.cursor = "pointer"
            //Определяем количество элементов внутри контейнера
            const heightChildElements = Math.floor(baseHeight / element.inner_un)
            element.heightChildElements = heightChildElements
            //Возвращаем id элемента по клику
            this.elementWardrobe.interactive = true
            this.elementWardrobe.cursor = "pointer"
            this.elementWardrobe.on("click", () => { console.log(element.un_id) })
            // Отрисовываем данный контейнер
            this.elementWardrobe.drawRect(1, 0, baseWidth, baseHeight);
            element.containerPixi = this.elementWardrobe
            parentElementPixi.addChild(this.elementWardrobe)
        } else {
            //Все остальные контейнеры
            let containerWidth = 0
            //Обводка контейнера
            this.elementWardrobe.lineStyle(1, "#000000");
            //Определяем цвет и закрашиваем контейнер
            const color = element.col.slice(2)
            this.elementWardrobe.beginFill(color);
            //Возвращаем id элемента по клику
            this.elementWardrobe.interactive = true
            this.elementWardrobe.cursor = "pointer"
            this.elementWardrobe.on("click", () => { console.log(element.un_id) })

            //Определяем ширину контейнера
            if (parentElement.div_v !== 0) {
                containerWidth = Math.floor((parentElement.baseWidth * element.un_width) / parentElement.div_v)
            }
            //Определяем высоту контейнера
            const containerHeight = parentElement.heightChildElements * element.un_height
            //Определяем координату по оси x для элемента и для потомков
            let coordX = containerWidth * element.pos_x
            if (coordX === 0) {
                coordX = 1
            }
            element.coordX = coordX
            //В каком порядке располагаем элементы
            if (parentElement.fu === 0) {
                //Обратный порядок элементов относительно родительского контейнера

                let coordY = 0
                //Определяем координату по оси y
                if (parentElement.coordY) {
                    coordY = parentElement.coordY
                } else {
                    coordY = parentElement.baseHeight - ((element.pos_y + 1) * containerHeight)
                }
                element.coordY = coordY
                //Отрисовываем данный контейнер
                this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
                //Если есть дети, то имя располагаем в отдельном контейнере
                if (element.has_childs) {
                    //Высота контейнера
                    const innerContainerHeight = 30
                    //создаем графику для контейнера
                    const innerGraphics = new PIXI.Graphics();
                    //Обводка контейнера
                    innerGraphics.lineStyle(1, "#000000");
                    element.coordY = element.coordY + 30
                    //Для потомков создаем ширину и высоту элемента
                    const baseHeight = containerHeight - innerContainerHeight
                    element.baseHeight = baseHeight
                    const baseWidth = containerWidth
                    element.baseWidth = baseWidth
                    //Определяем высоту элементов внутри контейнера
                    const heightChildElements = Math.floor(baseHeight / element.inner_un)
                    element.heightChildElements = heightChildElements
                    //Создаем текст и центрируем его
                    const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
                    text.x = Math.floor(containerWidth / 2)
                    text.y = coordY + Math.floor(innerContainerHeight / 2)
                    text.anchor.set(0.5)
                    //Отрисовываем данный контейнер
                    innerGraphics.drawRect(coordX, coordY, containerWidth, innerContainerHeight);
                    //Добавляем текст в контейнер
                    innerGraphics.addChild(text)
                    this.elementWardrobe.addChild(innerGraphics)
                } else {
                    //Если детей нет
                    //Создаем текст и центрируем его
                    const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
                    text.x = coordX + Math.floor(containerWidth / 2)
                    text.y = coordY + Math.floor(containerHeight / 2)
                    text.anchor.set(0.5)
                    text.angle = 90
                    this.elementWardrobe.addChild(text)
                }
            } else {
                //Прямой порядок
                //Определяем координату по оси y
                const coordY = (element.pos_y * containerHeight)
                //Определяем координату по оси x
                const coordX = 1
                //Отрисовываем данный контейнер
                this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
            }
            element.containerPixi = this.elementWardrobe
            parentElementPixi.addChild(this.elementWardrobe)
        }

    }
}