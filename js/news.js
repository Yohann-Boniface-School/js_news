class News {
    news_wrapper = document.getElementById("news_wrapper");

    constructor(title, description) {
        // if (!title.length || !description.length) return

        this.title = title
        this.description = description

        let article = document.createElement('article')
        let headerArticle = document.createElement('header')
        let imgBin = document.createElement('img')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')

        imgBin.src = "svg/trash.svg"
        imgBin.style.height = "2em"
        imgBin.style.width = "auto"

        h3.textContent = this.title
        p.textContent = this.description

        h3.contentEditable = "true"
        p.contentEditable = "true"

        imgBin.addEventListener("click", (e) => {this.delete(e)})

        headerArticle.appendChild(h3)
        headerArticle.appendChild(imgBin)
        article.appendChild(headerArticle)
        article.appendChild(p)

        this.news_wrapper.appendChild(article)
    }

    delete(e) {
        e.currentTarget.style.display = "none" // remove the trash can
        let article = e.currentTarget.parentNode.parentNode
        article.style.borderTopColor = "#CD5C73"

        article.animate(
            [
                {opacity: 1},
                {opacity: 0}
            ],
            {duration: 512}
        )

        setTimeout(() => {article.remove()},500)
    }
}

function addNews() {
    new News(document.getElementById("titre").value, document.getElementById("description").value)
}


window.onload = () => {
    new News(
        "Créez votre Article !",
        "Créez maintenant votre article grâce au menu juste au dessus ! Supprimez cet article en appuyant sur l'icône poubelle !"
    )

    setTimeout(
        () => {
            new News(
                "Note de l'auteur !",
                "Ce site est est démo exemple, Design & Concept : Yohann Boniface"
            )
        }, 500
    )
}