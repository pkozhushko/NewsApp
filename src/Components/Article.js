import React from 'react';
import './css/article.css';

class Article extends React.Component {
  render() {
    return(
      <div className='article__container'>
       <h3 className='article__header'>{this.props.title}</h3>
       <p className='article__body'>{this.props.description}</p>
      </div>
    )
  }
};


export default Article;
