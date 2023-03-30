import React from 'react';
import { Link } from 'react-router-dom';
import article_data from '../assets/articles.json';
import '../stylesheets/Articles.css';

function Articles() {
  return (
    <div className="articles">
      {article_data['articles'].map((article) => (
        <div className="article" key={article.id}>
          <h2 className="article-title">
            <Link to={`/article/${article.id}`} className="article-link">{article.title}</Link>
          </h2>
          <p className="article-meta">{article.date}</p>
          <p className="article-summary">{article.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default Articles;