import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NewsItem } from '.'


const NewsList = ({ searchQuery }) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getArticles = async () => {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery?searchQuery:"*"}&apiKey=52b603dcce4a4085b26887595775e123`)
            setArticles(response.data.articles)
            console.log(response)
        }

        getArticles()
    }, [searchQuery])
    return (
        <div>
            {articles.map(article => {
                return(
                    <NewsItem 
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage} 
                    />
                )
            })}
        </div>
    )
}

export default NewsList
