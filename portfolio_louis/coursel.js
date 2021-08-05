/**
 * le but ici est de venir modfier le code html pour entourer par exemple #carousel1 d'une div et faire bouger cette div de droite à gauche
 * va permettre de faire défiler les != élements
 * 
 */
 class Carousel {


    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll nbr d'elements a faire défiler 
     * @param {Object} options.slidesVisible  nbr d'élément visible dans un slide
     */


    constructor (element, options = {}){
        //on sauvegarde cet élément dans une varible
        this.element = element

        //pas tout compris ici regarder à 9min video caroussel grafikart
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)

        //on veut mettre les enfants dans carousel__contianer, on les stock dans une variable
        // this.element = element.children de type node list donc pas ouf, on préfere utiliser un tableau avec slice car plus simple d'itérer sur un tableau que node list
        let children = [].slice.call(element.children)

        //element visible 
        this.currentItem = 0

        

        //on crée l'élément qui a la classe carousel
        this.root = this.creatDivWithClass('carousel')
        this.container = this.creatDivWithClass('carousel__container')

        //le container va dans la div carousel
        this.root.appendChild(this.container)
        //on ajoute cet élément dans notre element
        this.element.appendChild(this.root)



        //pour prendre les enfants et les placer dans le carousel__containe
        //Ici la => sert a faire référence à la fonction createdivwithclass
        //la méthode récupère les enfents nouvel élément créer item , tableau d'enfant convertit en nouvel div qu'on met dans la variable item . 
        this.items = children.map((child) => {
            let item =this.creatDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item 
        })

        this.setStyle()
        this.createNavigation()

    }



    /**
     * Applique les bonnes dimensions aux éléments du carrousel 
     */
    setStyle () {
        //variable ratio 
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = (100 / this.options.slidesVisible / ratio) + '%')
    }


    createNavigation () {
        let nextButton = this.creatDivWithClass('carousel__next')
        let prevButton = this.creatDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }



    next () {        
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }
    prev () {        
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }



    /**
     * Déplace le slider ou carousel vers l'élément ciblée 
     * @param {number} index 
     */
    goToItem (index) {
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
    }



    /**
     *  
     * @param {string} className 
     * @returns {HTMLElement} className 
     */

    creatDivWithClass (className){
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
    slidesToScroll: 5,
    slidesVisible: 5
})




// document.addEventListener('DOMCOntentLoaded', function() {
//     new Carousel(document.querySelector('#carousel2'), {
//         slidesToScroll: 3,
//         slidesVisible: 3
//     })
// })
