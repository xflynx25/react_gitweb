import React from 'react';
import { useParams } from "react-router";
import article_data from '../assets/articles.json'
import '../stylesheets/Articles.css';

function Article () {
    let { id } = useParams();
    let article = article_data['articles'][id]
    
    return (
        <div className="article" key={article.id}>
          <h2 className="article-title particular-article-title">{article.title}</h2>
          <p className="article-meta">{article.date}</p>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }}></div>
        </div>
    )
}



export default Article