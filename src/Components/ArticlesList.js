import React from "react";
import './css/articlesList.css';


class ArticlesList extends React.Component {

  setData = async (e) => {
    const api_url = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${e}`);
    const data = await api_url.json();
    let el = data.find(x => x.id);
    this.props.setTitle(el.title);
    this.props.setDescription(el.body);
    this.props.nextPage();
  }

  deleteFeed = async (e, i) => {
    //server delete
    const api_url = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await api_url.json();
    delete data[e-1];
    //program delete
    let arr = this.props.articles;
    arr.splice(i, 1);
    this.setState({articles: arr});
  }

  eachItem = (el, i) => {
    return (
        <div key={el.id} className='item'>
          <li className='item__body' onClick = {() => this.setData(el.id)}>{ el.title }</li>
          <button onClick = {() => this.deleteFeed(el.id, i)} className='item__btn-delete'><i className="far fa-times-circle"></i></button>
        </div>
    )
  }

  render() {
    let index = 0;
    return(
      <React.Fragment>
        <h2 className='list__header'><strong>News</strong></h2>
        <ul className='list'><strong>
          { this.props.articles.map (this.eachItem, index) }
        </strong></ul>
      </React.Fragment>
    )
  }
}



export default ArticlesList;
