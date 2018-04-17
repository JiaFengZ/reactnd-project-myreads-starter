import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import HomePage from './Home'
import SearchPage from './Search'
import './App.css'

class BooksApp extends React.Component {

  state = {
  	books: []
  }

  componentDidMount() {
	    this.updateBooks()
  }

  updateBooks() {
  	 BooksAPI.getAll().then((data) => {           
	        this.setState({
	            books: Array.isArray(data) ? data : []
	    })
	 })
  }

  updateBookSelect(checked, bookId) {

        this.setState((prevState) => {
            let len = this.state.books.length;
            while (len--) {
                if (prevState.books[len].id === bookId) {
                    prevState.books[len].selected = checked;
                    return {
                        books: prevState.books
                    }
                }
            }
            
        })
    }

  render() {
    return (
        <Switch>
            <Route exact path='/' render={() => <HomePage updateBookSelect={this.updateBookSelect.bind(this)} books={this.state.books}/>}/>
            <Route path='/search' render={() => <SearchPage updateBooks={this.updateBooks.bind(this)} books={this.state.books}/>}/>
        </Switch>
    )
  }
}

export default BooksApp;
