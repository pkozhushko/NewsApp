import React from "react";
import ArticlesList from "./ArticlesList";
import Article from './Article';
import './css/login.css'

class Login extends React.Component {
  state = {
    page: 1,
    wrongUsername: false,
    userId: 0,
    description: '',
    title: '',
    articles: []
  };

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  prevPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  };

  setUserId = (username) => {
    this.setState({ userId: username });
  };

  setDescription = (value) => {
    this.setState({ description: value });
  }

  setTitle = (value) => {
    this.setState({ title: value });
  }

  checkUser = async (e) => {
    e.preventDefault();
    const search = e.target.elements.login.value;
    const api_url = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await api_url.json();
    let user = data.find(x => x.username === search);
    if (user) {
        this.setUserId(user.id);
        this.getArticles();
        this.nextPage();
      } else {
        this.setState({ wrongUsername: true  });
      }
  }

  getArticles = async () => {
    const api_url = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.state.userId}`);
    const data = await api_url.json();
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr[i] = data[i];
    }
    this.setState({ articles: arr });
  }

  render() {
    const { page } = this.state;

    switch (page) {
      case 1:
        return(
          <form onSubmit={this.checkUser} className='form'>
            <h3>Log in</h3>
            <p style={{display: this.state.wrongUsername ? 'block' : 'none' }}>User not found. Try again</p>
            <input type="text" className='form__input' name="login" placeholder="username" />
            <button className='form__btn'>Login</button>
          </form>
        );

      case 2:
        return(
          <React.Fragment>
            <ArticlesList
              nextPage={this.nextPage}
              prevPage={this.prevPage}
              user={this.state.userId}
              articles={this.state.articles}
              setDescription={this.setDescription}
              setTitle={this.setTitle}
            />
            <button className='form__btn' onClick={this.prevPage}>Back</button>
          </React.Fragment>
        );

      case 3:
        return(
          <React.Fragment>
            <Article
              title={this.state.title}
              description={this.state.description}
            />
            <button className='form__btn' onClick={this.prevPage}>Back</button>
          </React.Fragment>
        );

      default:
        this.setState({
          page: 1
        });
    }
  }
}

export default Login;
