let news = []


class News {
    static numInstances = 0
    _id = ++News.numInstances;

    constructor(parent, title, description) {
        if (!title.length || !description.length) return  // Dont want empty news !

        this.id = this._id;
        this.title = title
        this.description = description
        this.parent = parent
        this.create()
    }

    create() {
        // Building tags
        let article = document.createElement('article')
        let headerArticle = document.createElement('header')
        let imgBin = document.createElement('img')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')


        // Trash Can
        imgBin.src = "svg/trash.svg"
        imgBin.alt = "Delete"

        imgBin.style.height = "2em"
        imgBin.style.width = "auto"

        // Content & Edition
        h3.textContent = this.title
        p.textContent = this.description
        h3.contentEditable = "true"
        p.contentEditable = "true"

        imgBin.addEventListener(
            "click",
            (e) => {
                this.delete(e)
            }
        )

        headerArticle.appendChild(h3)
        headerArticle.appendChild(imgBin)
        article.appendChild(headerArticle)
        article.appendChild(p)

        // avoid {} in json stringification
        document.getElementById(this.parent).appendChild(article)
    }


    delete(e) {
        e.currentTarget.style.display = "none" // remove the trash can
        let article = e.currentTarget.parentNode.parentNode // Oh no structure !
        article.style.borderTopColor = "#CD5C73" // Because it's kinda cool

        // Thanos snap
        article.animate(
            [
                {opacity: 1},
                {opacity: 0}
            ],
            {duration: 512}
        )

        setTimeout(
            () => {
                let delete_index = -1

                news.forEach(
                    (news, index) => {
                        if (news.id === this.id) {
                            delete_index = index
                        }
                    }
                )

                console.log(delete_index)

                if (delete_index !== -1) {
                    news.splice(delete_index, 1)
                }

                article.remove()
                Save()
            }, 500
        )
    }
}

function addDefaultNews() {
    news.push(
        new News(
            "news_wrapper",
            "Note de l'auteur !",
            "Ce site est est démo exemple, Design & Concept : Yohann Boniface"
        )
    )

    Save()
}


function Save() {
    localStorage.setItem("news", JSON.stringify(news))
    console.log("Saved to localStorage !")
}


function loadNews() {
    let data = JSON.parse(localStorage.getItem("news"))
    data.forEach(
        (the_news, index) => {
            setTimeout(
                () => {
                    news.push(
                        new News(the_news.parent, the_news.title, the_news.description)
                    )
                }, 100 * index
            )
        }
    )
}


window.onload = () => {
    if (localStorage.getItem("news") === null) {
        console.log("Creating default news")
        addDefaultNews()

    } else {
        console.log("Loading news !")
        loadNews()
    }
}
