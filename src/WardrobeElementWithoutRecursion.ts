import * as PIXI from 'pixi.js';

export interface ICustomPropsElementWardrobe {
    baseWidth?: number,
    baseHeight?: number,
    heightChildElements?: number,
    coordX?: number,
    coordY?: number,
    containerPixi?: PIXI.Container
    graphicsPixi?: PIXI.Graphics
    activeElement?: boolean
    heightUnit?: number,
    widthUnit?: number
}

export interface IInfoAboutElement {
    un_id: number,
    stoika_id: number,
    un_parent_id: number,
    obj_id?: number,
    obj_typ?: number,
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
    customProps?: ICustomPropsElementWardrobe
}

export default class WardrobeElement {
    elementWardrobeContainer: PIXI.Container
    elementWardrobe: PIXI.Graphics

    constructor(
        element: IInfoAboutElement,
        parentElementPixi: PIXI.Container<PIXI.DisplayObject>,
        parentElement?: IInfoAboutElement,
        arrayElements?: IInfoAboutElement[]
    ) {
        this.elementWardrobeContainer = new PIXI.Container()
        this.elementWardrobe = new PIXI.Graphics()
        //Высота внутреннего контейнера с текстом у контейнера, у которого есть дети 
        const innerContainerHeight = 15
        //Определяем, базовый ли это контейнер
        if (element.set1 && element.set2) {
            //Обводка контейнера
            this.elementWardrobe.lineStyle(1, "#000000");
            //Определяем цвет и закрашиваем контейнер
            const color = element.col.slice(2)
            this.elementWardrobe.beginFill(color);
            // Определяем ширину базового контейнера
            const baseWidth = element.un_width * element.set1 * element.set2
            element.customProps = {
                ...element.customProps,
                baseWidth: baseWidth
            }
            //Определяем высоту базового контейнера
            const baseHeight = element.un_height * element.set1
            element.customProps = {
                ...element.customProps,
                baseHeight: baseHeight
            }
            //Возвращаем id элемента по клику
            this.elementWardrobe.interactive = true
            this.elementWardrobe.cursor = "pointer"
            //Определяем количество элементов внутри контейнера
            const heightChildElements = baseHeight / element.inner_un
            element.customProps = {
                ...element.customProps,
                heightChildElements: heightChildElements
            }
            this.elementWardrobe.on("click", () => {
                //Очищаем предыдущий активный элеент
                const formerActiveElement = arrayElements.find(elem => elem.customProps.activeElement === true)
                if (formerActiveElement) {
                    formerActiveElement.customProps.graphicsPixi.clear()
                    formerActiveElement.customProps.graphicsPixi.lineStyle(1, "#000000");
                    formerActiveElement.customProps.graphicsPixi.beginFill(formerActiveElement.col.slice(2))
                    if (formerActiveElement.has_childs) 
                    {
                        if(formerActiveElement.set1 && formerActiveElement.set2){
                            formerActiveElement.customProps.graphicsPixi.drawRect(1, 0, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight + innerContainerHeight);
                        }else{
                            formerActiveElement.customProps.graphicsPixi.drawRect(formerActiveElement.customProps.coordX, formerActiveElement.customProps.coordY - innerContainerHeight, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight + innerContainerHeight);
                        }
                    } else {
                        formerActiveElement.customProps.graphicsPixi.drawRect(formerActiveElement.customProps.coordX, formerActiveElement.customProps.coordY, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight);
                    }
                    formerActiveElement.customProps.graphicsPixi.endFill()
                    formerActiveElement.customProps.activeElement = false
                }
                //Добавляем новый активный элемент
                console.log(element.un_id)
                this.elementWardrobe.clear()
                this.elementWardrobe.beginFill(color);
                this.elementWardrobe.lineStyle(3, "#000000");
                this.elementWardrobe.drawRect(0, 0, baseWidth, baseHeight);
                this.elementWardrobe.endFill()
                element.customProps.activeElement = true
            })
            // Отрисовываем данный контейнер
            this.elementWardrobe.drawRect(1, 0, baseWidth, baseHeight);
            element.customProps = {
                ...element.customProps,
                graphicsPixi: this.elementWardrobe
            }
            this.elementWardrobeContainer.addChild(this.elementWardrobe)
            element.customProps = {
                ...element.customProps,
                containerPixi: this.elementWardrobeContainer
            }

            //grid в данном контейнере
            if (element.inner_un > 0) {
                //Если внутренних юнитов больше, чем 0(т.е. хотя бы 1, то делим контейнер на нужное количество частей)
                const heightUnit = baseHeight / element.inner_un
                element.customProps = {
                    ...element.customProps,
                    heightUnit: heightUnit
                }
                element.customProps = {
                    ...element.customProps,
                    baseWidth: baseWidth
                }
                let lineCoordY = 0
                for (let i = 0; i < element.inner_un; i++) {
                    //создаем графику для линии
                    const lineGraphics = new PIXI.Graphics();
                    //Обводка контейнера
                    lineGraphics.lineStyle(1, "#000000");
                    //Отрисовываем данный контейнер
                    lineGraphics.drawRect(0, lineCoordY, baseWidth, 0);
                    this.elementWardrobe.addChild(lineGraphics)
                    lineCoordY += heightUnit
                }
                //отрисовка линий в юнитах
                if (element.div_h > 1) {
                    const div_hElement = heightUnit / element.div_h
                    console.log(heightUnit)
                    let lineCoordY = 0
                    for (let i = 0; i < element.inner_un * 2; i++) {
                        //создаем графику для линии
                        const lineGraphics = new PIXI.Graphics();
                        //Обводка контейнера
                        lineGraphics.lineStyle(1, "#000000");
                        //Отрисовываем данный контейнер
                        lineGraphics.drawRect(0, lineCoordY, baseWidth, 0);
                        this.elementWardrobe.addChild(lineGraphics)
                        lineCoordY += div_hElement
                    }
                }
            }
            if (element.div_v > 0) {
                //Если делений контейнера по ширине больше, чем 1(т.е. хотя бы 2, то делим контейнер на нужное количество частей)
                const widthUnit = baseWidth / element.div_v
                element.customProps = {
                    ...element.customProps,
                    widthUnit: widthUnit
                }
                let lineCoordX = 0
                for (let i = 0; i < element.div_v; i++) {
                    //создаем графику для линии
                    const lineGraphics = new PIXI.Graphics();
                    //Обводка контейнера
                    lineGraphics.lineStyle(1, "#000000");
                    //Отрисовываем данный контейнер
                    lineGraphics.drawRect(lineCoordX, 0, 0, baseHeight);
                    this.elementWardrobe.addChild(lineGraphics)
                    lineCoordX += widthUnit
                }
            }

            parentElementPixi.addChild(this.elementWardrobeContainer)
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
            //Определяем ширину контейнера
            if (parentElement.div_v !== 0) {
                containerWidth = (parentElement.customProps.baseWidth * element.un_width) / parentElement.div_v
            }
            element.customProps = {
                ...element.customProps,
                baseWidth: containerWidth
            }
            //Определяем высоту контейнера
            const containerHeight = parentElement.customProps.heightChildElements * element.un_height
            element.customProps = {
                ...element.customProps,
                baseHeight: containerHeight
            }
            //Определяем координату по оси x для элемента и для потомков
            let coordX = parentElement.customProps.widthUnit * element.pos_x
             if (coordX === 0) {
                coordX = 1
            }
            // element.coordX = coordX
            element.customProps = {
                ...element.customProps,
                coordX: coordX
            }
            let coordY = 0
            if (parentElement.fu === 0) {
                //Вычисляем координату по оси Y при обратном порядке элементов 
                if (parentElement.customProps.coordY) {
                    coordY = parentElement.customProps.coordY + parentElement.customProps.heightUnit * element.pos_y
                } else {
                    coordY = parentElement.customProps.baseHeight - ((element.pos_y + 1) * containerHeight)
                }
                // element.coordY = coordY
                element.customProps = {
                    ...element.customProps,
                    coordY: coordY
                }
            } else {
                //Вычисляем координату по оси Y при прямом порядке элементов 
                if (parentElement.customProps.coordY) {
                    coordY = parentElement.customProps.coordY + parentElement.customProps.heightUnit * element.pos_y
                } else {
                    coordY = ((element.pos_y) * containerHeight)
                }
                element.customProps = {
                    ...element.customProps,
                    coordY: coordY
                }
            }

            //Отрисовываем данный контейнер
            this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
            this.elementWardrobe.on("click", () => {
                //Очищаем предыдущий активный элеент
                const formerActiveElement = arrayElements.find(elem => elem.customProps.activeElement === true)
                if (formerActiveElement) {
                    formerActiveElement.customProps.graphicsPixi.clear()
                    formerActiveElement.customProps.graphicsPixi.lineStyle(1, "#000000");
                    formerActiveElement.customProps.graphicsPixi.beginFill(formerActiveElement.col.slice(2))
                    if (formerActiveElement.has_childs) 
                    {
                        if(formerActiveElement.set1 && formerActiveElement.set2){
                            formerActiveElement.customProps.graphicsPixi.drawRect(1, 0, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight + innerContainerHeight);
                        }else{
                            formerActiveElement.customProps.graphicsPixi.drawRect(formerActiveElement.customProps.coordX, formerActiveElement.customProps.coordY - innerContainerHeight, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight + innerContainerHeight);
                        }
                    } else {
                        formerActiveElement.customProps.graphicsPixi.drawRect(formerActiveElement.customProps.coordX, formerActiveElement.customProps.coordY, formerActiveElement.customProps.baseWidth, formerActiveElement.customProps.baseHeight);
                    }
                    formerActiveElement.customProps.graphicsPixi.endFill()
                    formerActiveElement.customProps.activeElement = false
                }
                //Добавляем новый активный элемент
                console.log(element.un_id)
                console.log(element)
                this.elementWardrobe.clear()
                this.elementWardrobe.beginFill(color);
                this.elementWardrobe.lineStyle(3, "#000000");
                this.elementWardrobe.drawRect(coordX, coordY, containerWidth, containerHeight);
                this.elementWardrobe.endFill()
                element.customProps.activeElement = true
            })
            //Если есть дети, то имя располагаем в отдельном контейнере
            if (element.has_childs) {
                //создаем графику для контейнера
                const innerGraphics = new PIXI.Graphics();
                //Обводка контейнера
                innerGraphics.lineStyle(1, "#000000");
                element.customProps = {
                    ...element.customProps,
                    coordY: element.customProps.coordY + innerContainerHeight
                }
                //Для потомков создаем ширину и высоту элемента
                const baseHeight = containerHeight - innerContainerHeight
                element.customProps = {
                    ...element.customProps,
                    baseHeight: baseHeight
                }
                const baseWidth = containerWidth
                element.customProps = {
                    ...element.customProps,
                    baseWidth: baseWidth
                }
                //Определяем высоту элементов внутри контейнера
                const heightChildElements = baseHeight / element.inner_un
                element.customProps = {
                    ...element.customProps,
                    heightChildElements: heightChildElements
                }
                //Создаем текст и центрируем его
                const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
                text.x = containerWidth / 2
                text.y = coordY + innerContainerHeight / 2
                text.anchor.set(0.5)
                //Отрисовываем данный контейнер
                innerGraphics.drawRect(coordX, coordY, containerWidth, innerContainerHeight);
                //Добавляем текст в контейнер
                innerGraphics.addChild(text)
                this.elementWardrobe.addChild(innerGraphics)
                //grid в данном контейнере
                if (element.inner_un > 0) {
                    //Если внутренних юнитов больше, чем 0(т.е. хотя бы 1, то делим контейнер на нужное количество частей)
                    const heightUnit = baseHeight / element.inner_un
                    element.customProps = {
                        ...element.customProps,
                        heightUnit: heightUnit
                    }
                    let lineCoordY = element.customProps.coordY
                    for (let i = 0; i < element.inner_un; i++) {
                        //создаем графику для линии
                        const lineGraphics = new PIXI.Graphics();
                        //Обводка контейнера
                        lineGraphics.lineStyle(1, "#000000");
                        //Отрисовываем данный контейнер
                        lineGraphics.drawRect(element.customProps.coordX, lineCoordY, baseWidth, 0);
                        this.elementWardrobe.addChild(lineGraphics)
                        lineCoordY += heightUnit
                    }
                    //отрисовка линий в юнитах
                    if (element.div_h > 1) {
                        const div_hElement = heightUnit / element.div_h
                        console.log(heightUnit)
                        let lineCoordY = element.customProps.coordY
                        for (let i = 0; i < element.inner_un * 2; i++) {
                            //создаем графику для линии
                            const lineGraphics = new PIXI.Graphics();
                            //Обводка контейнера
                            lineGraphics.lineStyle(1, "#000000");
                            //Отрисовываем данный контейнер
                            lineGraphics.drawRect(element.customProps.coordX, lineCoordY, baseWidth, 0);
                            this.elementWardrobe.addChild(lineGraphics)
                            lineCoordY += div_hElement
                        }
                    }
                }
                if (element.div_v > 0) {
                    //Если делений контейнера по ширине больше, чем 1(т.е. хотя бы 2, то делим контейнер на нужное количество частей)
                    const widthUnit = baseWidth / element.div_v
                    element.customProps = {
                        ...element.customProps,
                        widthUnit: widthUnit
                    }
                    let lineCoordX = element.customProps.coordX
                    for (let i = 0; i < element.div_v; i++) {
                        //создаем графику для линии
                        const lineGraphics = new PIXI.Graphics();
                        //Обводка контейнера
                        lineGraphics.lineStyle(1, "#000000");
                        //Отрисовываем данный контейнер
                        lineGraphics.drawRect(lineCoordX, element.customProps.coordY, 0, baseHeight);
                        this.elementWardrobe.addChild(lineGraphics)
                        lineCoordX += widthUnit
                    }
                }
            } else {
                //Если детей нет
                //Создаем текст и центрируем его
                const text = new PIXI.Text(element.ustr_name, { fontSize: 12 })
                text.x = coordX + containerWidth / 2
                text.y = coordY + containerHeight / 2
                text.anchor.set(0.5)
                if (containerHeight > containerWidth) {
                    text.angle = 90
                }
                this.elementWardrobe.addChild(text)
            }
            element.customProps = {
                ...element.customProps,
                graphicsPixi: this.elementWardrobe
            }
            this.elementWardrobeContainer.addChild(this.elementWardrobe)
            element.customProps = {
                ...element.customProps,
                containerPixi: this.elementWardrobeContainer
            }
            parentElementPixi.addChild(this.elementWardrobeContainer)
        }

    }
}




