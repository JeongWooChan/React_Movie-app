import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'; 

// 모든 컴포넌트는 render를 가지고 있다. 
// render의 기능은 뭔가를 보여주는, 출력하는 기능이다. 
class App extends Component {

  // React 생명주기 
  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}

  componentWillMount = () => {
    console.log('will mount'); 
  }

  componentDidMount = () => {
    console.log('did mount'); 
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        summary = {movie.summary} 
        key={movie.id} />
    })
    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state; 
    return (
      <div className= {movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
