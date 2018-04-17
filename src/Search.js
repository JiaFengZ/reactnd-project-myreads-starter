import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'

class SearchPage extends React.Component {
    state = {
        value: '',
        books: []
    }

    handleChange(event) {
        const that = this;
        that.setState({
            value: event.target.value
        }, () => {
            if (that.searchTimer) clearTimeout(that.searchTimer);
            that.searchTimer = setTimeout(() => {
                that.search();
            }, 500);
            
        })
        
    }

    search() {
        const that = this;
        BooksAPI.search(that.state.value).then((data) => {
            that.setState({
                books: Array.isArray(data) ? data : []
            })
        })
    }

    switchBookShelf(book, event) {
        const that = this;
        if (book.shelf !== event.target.value) {
            console.log('moveToBookShelf')
            BooksAPI.update({id: book.id}, event.target.value).then((res) => {
                that.props.updateBooks(); //添加书架后要更新App.js中books
            })

        }
        
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
        const {books} = this.state;
        const allBooks = this.props.books;
        books.forEach((book) => {
            book.shelf = 'none';
            for (let i = 0, len = allBooks.length; i < len; i++) {
                if (book.id === allBooks[i].id) {
                    book.shelf = allBooks[i].shelf || 'none';
                    return
                }
            }
        })
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange.bind(this)}/>

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf updateBookSelect={this.updateBookSelect.bind(this)} books={books} moveToBookShelf={this.switchBookShelf.bind(this)}/>
            </div>
          </div>
        )
    }
}

export default SearchPage;