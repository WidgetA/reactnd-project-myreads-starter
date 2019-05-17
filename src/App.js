import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from "react-router-dom"

class BooksApp extends React.Component {

  state = {
    books: [],
    shelf: [],
    results: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({books: res})
      const shelf = []
      this.state.books.forEach((book) => {
        if (shelf.indexOf(book.shelf) != -1) {
          ;
        } else {
          shelf.push(book.shelf)
        }
      })
      this.setState({shelf: shelf})
    });
  }

  handleChange(args, event) {
    var shelf = args.shelf;
    var id = args.id;
    let book;

    if (event.target.value == "none") {
      this.state.books.forEach( function(e) {
        if (id == e.id) {
          book = e
        } else ;
      });
      this.state.books = this.state.books.filter(item => item !== book)
    } else {
      this.state.books.forEach( function(e) {
        if (id == e.id) {
          e.shelf = event.target.value
          BooksAPI.update(e, event.target.value)
        } else ;
      });
    }

    this.setState(this.state)
  }

  handleChangeSearch(event){
    BooksAPI.search(event.target.value)
      .then(res => {
        if (res){
          if (res.error) {
            this.setState({results: []});
          } else {
            this.setState({results: res})
          }
        } else {
          this.setState({results: []});
        }
      })
  }

  clearSearchResult(){
    this.setState({ results: [] })
  }

  handleChangeAdd(args, event) {
    var id = args.id;
    var shelf = event.target.value;

    BooksAPI.get(id)
      .then(data => {
        Object.assign(data, {shelf: shelf})
        BooksAPI.update(data, shelf)
        this.state.books.push(data)
        this.setState(this.state)
      })
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
                {
                  this.state.results.map((e) => {
                    if (e.imageLinks) {
                      return(
                      <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{width: 128, 
                                                               height: 193, 
                                                               backgroundImage:"url("+e.imageLinks.smallThumbnail+")"}}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChangeAdd.bind(this, {id:e.id})} defaultValue="" value="none">
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                            <div className="book-title">{e.title}</div>
                            {
                              () =>{
                                if (e.authors) {
                                  e.authors.map((author) =>{
                                    return(<div className="book-authors">{author}</div>)
                                  })
                                }
                              }
                            }
                      </div>)
                    } else {
                      return(
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{width: 128, 
                                                               height: 193, 
                                                               backgroundImage:""}}>
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChangeAdd.bind(this, {id:e.id})} defaultValue="" value="none">
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                            <div className="book-title">{e.title}</div>
                            {
                              () =>{
                                if (e.authors) {
                                  e.authors.map((author) =>{
                                    return(<div className="book-authors">{author}</div>)
                                  })
                                }
                              }
                            }
                      </div>)
                    };                 
                  })
                }
              </ol>
            </div>
          </div>
        )}/>
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="  list-books-content">
              <div>
                {
                  this.state.shelf.map((e) => {
                  return (
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">
                      {
                        (() => {
                          switch (e) {
                            case "currentlyReading":   return "Currently Reading";
                            case "wantToRead": return "Want to Read";
                            case "read":  return "Read";
                          }
                        })()
                      }
                      </h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {
                            this.state.books.map((arg) => {
                              if (arg.shelf == e) {
                                return(
                                  <li>
                                    <div className="book">
                                      <div className="book-top">
                                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage:"url("+arg.imageLinks.smallThumbnail+")"}}>
                                        </div>
                                        <div className="book-shelf-changer">
                                          <select onChange={this.handleChange.bind(this, {id:arg.id, shelf:e})} defaultValue="" value={e}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="book-title">{arg.title}</div>
                                      {arg.authors.map((author) =>{
                                        return(<div className="book-authors">{author}</div>)
                                      })}
                                    </div>
                                  </li>)
                              } else;
                            })
                          } 
                        </ol>
                      </div>
                    </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
