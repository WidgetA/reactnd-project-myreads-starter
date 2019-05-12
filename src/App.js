import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books.json'
import { Link } from 'react-router-dom'
import { Route } from "react-router-dom"

class BooksApp extends React.Component {

  state = (() => {
    if (localStorage.getItem("cache")) {
      return (JSON.parse(localStorage.getItem("cache")))
    } else {
      return (Books)
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

  handleChangeSearchPage() {
    const books = []
    this.state.shelf.forEach(function(e) {
      e.books.forEach( function(b) {
        books.push(b.title)
      });
    });
    this.setState({ booklist: books })  
  }

  handleChangeSearch(event){
    let books = [];
    this.state.booklist.forEach( function(e) {
      if (event.target.value) {
        if (e.match(event.target.value + '+')) {
          books.push(e.match(event.target.value + '+')['input'])
        } else ;
      } else {
        books = []
      }
    });
    this.setState({ searchresult: books })
  }
  clearSearchResult(){
    this.setState({ searchresult: [] })
  }


  render() {
    return (
      <div className="app">
        <Route path="/search" exact render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search" onClick={ this.clearSearchResult.bind(this) }>Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleChangeSearch.bind(this)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.shelf.map((e) => {
                  if (this.state.searchresult){
                    return (
                      e.books.map((arg) => {
                        if (this.state.searchresult.indexOf(arg.title) != -1){
                          return (
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
                          </div>)
                        } else ;
                        
                      })
                  )
                  } else ;
                  }
                )}
              </ol>
            </div>
          </div>
        )}/>
        <Route path="/" exact render={() => (
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
              <Link to="/search"><button onClick={this.handleChangeSearchPage.bind(this)}>Add a book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
