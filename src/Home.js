import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.switchBookShelf = this.switchBookShelf.bind(this);
    }

    updateBookShelf() {
        console.log('update');
        BooksAPI.getAll().then((data) => {
                this.setState({
                    books: data
                 });
            })
    }

    switchBookShelf(book, event) {
        const that = this;
        if (book.shelf !== event.target.value) {
            console.log('switch shelf');
            BooksAPI.update({id: book.id}, event.target.value).then((res) => {
                console.log('update success')
                const booksState = res; 
                that.setState((prevState) => {
                    const books = this.props.books//prevState['books'];
                    const keys = ['currentlyReading', 'read', 'wantToRead'];
                    keys.forEach((key) => {
                        for (let i = 0, len = booksState[key].length; i < len; i++) {
                           for (let j =0, len1 = books.length; j < len1; j++) {
                                if (booksState[key][i] === books[j].id) {
                                    books[j].shelf = key;
                                    break;
                                }     
                            }
                        }
                    })
                    return {
                        books: books
                    }
                })
                
            })
        }
        
    }

    render() {
        const currentlyReadingBooks = this.props.books.filter((book) => {
            return book.shelf === 'currentlyReading';
        });
        const wantToReadBooks = this.props.books.filter((book) => {
            return book.shelf === 'wantToRead';
        });
        const readBooks = this.props.books.filter((book) => {
            return book.shelf === 'read';
        });
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookShelf updateBookSelect={this.props.updateBookSelect} books={currentlyReadingBooks} moveToBookShelf={this.switchBookShelf}/>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf updateBookSelect={this.props.updateBookSelect} books={wantToReadBooks} moveToBookShelf={this.switchBookShelf}/>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf updateBookSelect={this.props.updateBookSelect} books={readBooks} moveToBookShelf={this.switchBookShelf}/>
                </div>
              </div>
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
          </div>
    )}
}

export default HomePage;