class News {

    constructor(title, description) {
        if (!title.length || !description.length) return

        this.title = title
        this.description = description

        let article = document.createElement('article')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')

        h2.textContent = this.title
        p.textContent = this.description

        article.appendChild(h2)
        article.appendChild(p)
        news_wrapper.appendChild(article)
    }
}

function addNews() {
    new News(document.getElementById("titre").value, document.getElementById("description").value);
}

window.onload = () => {
    const news_wrapper = document.getElementById("news_wrapper");

}