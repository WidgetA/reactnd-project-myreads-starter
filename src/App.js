import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books.json'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
              {Books.shelf.map((e) => {
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
                                          <select>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                          </select>
                                        </div>
                                      </div>
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
