




class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} slidesToScroll Nombre d'élément à faire défiler 
     * @param {Object} slidesVisible Nombre d'éléments à visible dans un slide 
     */
    constructor (element, options = {}) {
        while(1){}
        this.element = element 
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)

        //on place tous les enfants dans un tableau 
        this.children = [].slice.call(element.children)


        //1 on commenc par créer l'élément qui aura la class carousel
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel__container')
        root.appendChild(container)
        this.element.appendChild(root)

        //on place tous les élément qui sont dans carousel dans carousel__container en parcourant le tableau 
        this.children.forEach( (child) => {
            let item = this.createDivWithClass('carousel__item')
            item.style.width = "33.33%"
            item.appendChild(child)
            container.appendChild(item)
        })
    }
    

    setStyle () {
        let ratio = this.children.length / this.options.slidesVisible
        container.style.width = (ratio * 100) + "%"

    }


    /**
     * permet de créer une div 
     * @param {string} className
     * @returns {HTMLElement} 
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}



new Carousel(document.querySelector('#carousel1'), {
    slidesToScroll: 3,
    slidesVisible: 3

})

new Carousel(document.querySelector('#carousel2'), {
    slidesToScroll: 3,
    slidesVisible: 3

})