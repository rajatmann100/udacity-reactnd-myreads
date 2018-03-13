import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import BookShelves from './BookShelves';
import './App.css';

export default class BooksApp extends React.Component {
  state = {
    books: [],
    error: '',
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.error ? this.setState({ error: books.error }) : this.setState({ books });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  matchBookState(bookTobeUpdated, newShelf, booksCollection) {
    // validate response and update state based on response status
    if (BooksApp.validateResponse(bookTobeUpdated, newShelf, booksCollection)) {
      const revisedBooks = this.state.books.filter(book =>
        book.id !== bookTobeUpdated.id);
      if (newShelf !== 'none') {
        revisedBooks.push(Object.assign(bookTobeUpdated, { shelf: newShelf }));
      }
      this.setState({ books: revisedBooks });
    } else {
      const error = 'Something went wrong while update shelf on server' +
        ', Please try again!';
      this.setState({ error });
    }
  }

  static validateResponse(bookTobeUpdated, newShelf, booksCollection) {

    return newShelf === 'none'
      ? !booksCollection[bookTobeUpdated.shelf].includes(bookTobeUpdated.id)
      : booksCollection[newShelf].includes(bookTobeUpdated.id);
  }

  bookShelfChangeHandler(book, newShelf) {
    BooksAPI
      .update(book, newShelf)
      .then((res) => {
        res.error
          ? this.setState({ error: res.error })
          : this.matchBookState(book, newShelf, res);
      })
      .catch((error) => { this.setState({ error }); });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onBookShelfChange={this.bookShelfChangeHandler.bind(this)}
          />
        )}/>
        <Route exact path="/" render={() => (
          <BookShelves
            books={this.state.books}
            onBookShelfChange={this.bookShelfChangeHandler.bind(this)}
          />
        )} />
      </div>
    );
  }
}
