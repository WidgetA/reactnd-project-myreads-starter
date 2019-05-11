import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books.json'

class BooksApp extends React.Component {

  state = {
    showSearchPage: false
  };


  state = (() => {
    if (localStorage.getItem("cache")) {
      return (JSON.parse(localStorage.getItem("cache")))
    } else {
      return (Object.assign(this.state, Books))
    }
  })();
 

  handleChange(args, event) {
    var shelf = args.shelf;
    var title = args.title;
    var book;

    this.state.shelf.forEach(function(e) {
      if (e.value === shelf) {
        e.books.forEach( function(b) { 
          if (b.title === title) {
            book = b
          } else;
        })
        e.books = e.books.filter(item=>item !== book)
      } else ;
    });
    
    this.state.shelf.forEach(function(e) {
      if (e.value === event.target.value) {
        e.books.push(book)
      } else ;
    });
    
    localStorage.setItem("cache",JSON.stringify(this.state))
    this.setState(this.state)
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
              {this.state.shelf.map((e) => {
                  return (
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">{e.name}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {e.books.map((arg) => {
                            return (
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{width: arg.width, 
                                                                    height: arg.height,
                                                                    backgroundImage:"url("+arg.imgurl+")"}}>
                                  </div>
                                  <div className="book-shelf-changer">
                                    <select onChange={this.handleChange.bind(this, {title:arg.title, shelf:e.value})} defaultValue="" value={e.value}>
                                      <option value="move" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{arg.title}</div>
                                <div className="book-authors">{arg.author}</div>
                              </div>
                            </li>)
                          })}
                        </ol>
                      </div>
                    </div>
                )})}
            </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
