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
    coordY?: number
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

    constructor(infoAboutElement: IInfoAboutElement, arrayInfoAboutElements?: IInfoAboutElement[], parentElement?: PIXI.Container<PIXI.DisplayObject>, infoAboutParentElement?: IInfoAboutElement) {
        this.elementWardrobe = new PIXI.Graphics();
        // const baseWidth = 300
        // infoAboutElement.customProps.baseWidth = baseWidth
        // console.log(infoAboutElement.customProps.baseWidth)
        if (infoAboutElement.set1 && infoAboutElement.set2) {
            //Это базовый контейнер
            //Обводка контейнера
            this.elementWardrobe.lineStyle(1, "#000000");
            //Определяем цвет и закрашиваем контейнер
            const color = infoAboutElement.col.slice(2)
            this.elementWardrobe.beginFill(color);
            //Определяем ширину базового контейнера
            const baseWidth = infoAboutElement.un_width * infoAboutElement.set1 * infoAboutElement.set2
            infoAboutElement.baseWidth = baseWidth
            //Определяем высоту базового контейнера
            const baseHeight = infoAboutElement.un_height * infoAboutElement.set1
            infoAboutElement.baseHeight = baseHeight
            //Определяем количество элементов внутри контейнера
            const heightChildElements = Math.floor(baseHeight / infoAboutElement.inner_un)
            infoAboutElement.heightChildElements = heightChildElements
            //Отрисовываем данный контейнерна клик срабатывает график, расположенная под другой графико
            this.elementWardrobe.drawRect(1, 0, baseWidth, baseHeight);
            //Определяем, есть ли дети, и если есть, то вызываем конструктор
            arrayInfoAboutElements.map(element => {
                if (infoAboutElement.un_id === element.un_parent_id && infoAboutElement.has_childs !== 0 && !element.set1 && !element.set2) {
                    new WardrobeElement(element, arrayInfoAboutElements, this.elementWardrobe, infoAboutElement)
                }
            })
        } else {
            if (infoAboutElement.un_id === 0) {
                this.a(parentElement)
            } else {
                //Все остальные контейнеры
                let containerWidth = 0
                //Обводка контейнера
                this.elementWardrobe.lineStyle(1, "#000000");
                //Определяем цвет и закрашиваем контейнер
                const color = infoAboutElement.col.slice(2)
                this.elementWardrobe.beginFill(color);
                //Возвращаем id элемента по клику
                this.elementWardrobe.interactive = true
                this.elementWardrobe.cursor = "pointer"
                this.elementWardrobe.on("click", () => { console.log(infoAboutElement.un_id) })

                //Определяем ширину контейнера
                if (infoAboutParentElement.div_v !== 0) {
                    containerWidth = Math.floor((infoAboutParentElement.baseWidth * infoAboutElement.un_width) / infoAboutParentElement.div_v)
                }
                //Определяем высоту контейнера
                const containerHeight = infoAboutParentElement.heightChildElements * infoAboutElement.un_height
                //Определяем координату по оси x для элемента и для потомков
                let coordX = containerWidth * infoAboutElement.pos_x
                if (coordX === 0) {
                    coordX = 1
                }
                infoAboutElement.coordX = coordX
                // В каком порядке располагаем элементы
                if (infoAboutParentElement.fu === 0) {
                    //Обратный порядок элементов относительно родительского контейнера

                    let coordY = 0
                    //Определяем координату по оси y
                    if (infoAboutParentElement.coordY) {
                        coordY = infoAboutParentElement.coordY
                    } else {
                        coordY = infoAboutParentElement.baseHeight - ((infoAboutElement.pos_y + 1) * containerHeight)
                    }
                    infoAboutElement.coordY = coordY
                    //Отрисовываем данный контейнер
                    this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
                    parentElement.addChild(this.elementWardrobe)
                    //Если есть дети, то имя располагаем в отдельном контейнере
                    if (infoAboutElement.has_childs) {
                        //Высота контейнера
                        const innerContainerHeight = 30
                        //создаем графику для контейнера
                        const innerGraphics = new PIXI.Graphics();
                        //Обводка контейнера
                        innerGraphics.lineStyle(1, "#000000");
                        infoAboutElement.coordY = infoAboutElement.coordY + 30
                        //Для потомков создаем ширину и высоту элемента
                        const baseHeight = containerHeight - innerContainerHeight
                        infoAboutElement.baseHeight = baseHeight
                        const baseWidth = containerWidth
                        infoAboutElement.baseWidth = baseWidth
                        //Определяем высоту элементов внутри контейнера
                        const heightChildElements = Math.floor(baseHeight / infoAboutElement.inner_un)
                        infoAboutElement.heightChildElements = heightChildElements
                        //Создаем текст и центрируем его
                        const text = new PIXI.Text(infoAboutElement.ustr_name, { fontSize: 12 })
                        text.x = Math.floor(containerWidth / 2)
                        text.y = coordY + Math.floor(innerContainerHeight / 2)
                        text.anchor.set(0.5)
                        //Отрисовываем данный контейнер
                        innerGraphics.drawRect(coordX, coordY, containerWidth, innerContainerHeight);
                        //Добавляем текст в контейнер
                        innerGraphics.addChild(text)
                        parentElement.addChild(innerGraphics)
                    } else {
                        //Если детей нет
                        //Создаем текст и центрируем его
                        const text = new PIXI.Text(infoAboutElement.ustr_name, { fontSize: 12 })
                        text.x = coordX + Math.floor(containerWidth / 2)
                        text.y = coordY + Math.floor(containerHeight / 2)
                        text.anchor.set(0.5)
                        text.angle = 90
                        this.elementWardrobe.addChild(text)
                    }
                } else {
                    //Прямой порядок
                    //Определяем координату по оси y
                    const coordY = (infoAboutElement.pos_y * containerHeight)
                    //Определяем координату по оси x
                    const coordX = 1
                    //Отрисовываем данный контейнер
                    this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
                    parentElement.addChild(this.elementWardrobe)
                }
                //Определяем, есть ли дети, и если есть, то вызываем конструктор
                arrayInfoAboutElements.map(element => {
                    if (infoAboutElement.un_id === element.un_parent_id && infoAboutElement.has_childs !== 0 && !element.set1 && !element.set2) {
                        new WardrobeElement(element, arrayInfoAboutElements, this.elementWardrobe, infoAboutElement)
                    }
                })
            }
        }
    }

    a(container: PIXI.Container<PIXI.DisplayObject>) {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, "#000000", 1);
        graphics.beginFill("#FF774B");
        graphics.drawRect(2, 650, 50, 50);
        graphics.endFill();
        graphics.interactive = true
        graphics.cursor = null
        graphics.on("click", () => { console.log("a") })

        container.addChild(graphics)

    }


}