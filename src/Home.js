import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'

class HomePage extends React.Component {
    constructor() {
        super();
        this.switchBookShelf = this.switchBookShelf.bind(this);
    }
    state = {
        books: []
    }

    componentDidMount() {
        this.updateBookShelf();
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
                //that.props.updateBookState(res);
                that.setState((prevState) => {
                    const books = prevState['books'];
                    const keys = ['currentlyReading', 'read', 'wantToRead'];
                    keys.map((key) => {
                        for (let i = 0, len = booksState[key].length; i < len; i++) {
                           for (let j =0, len1 = books.length; j < len1; j++) {
                                if (booksState[key][i] == books[j].id) {
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
        const currentlyReadingBooks = this.state.books.filter((book) => {
            return book.shelf === 'currentlyReading';
        });
        const wantToReadBooks = this.state.books.filter((book) => {
            return book.shelf === 'wantToRead';
        });
        const readBooks = this.state.books.filter((book) => {
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
                  <div className="bookshelf-books"><BookShelf booksState={this.state.booksState}  books={currentlyReadingBooks} moveToBookShelf={this.switchBookShelf}/></div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books"><BookShelf booksState={this.state.booksState} books={wantToReadBooks} moveToBookShelf={this.switchBookShelf}/></div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books"><BookShelf booksState={this.state.booksState} books={readBooks} moveToBookShelf={this.switchBookShelf}/></div>
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