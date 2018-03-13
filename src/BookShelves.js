import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

export default class BookShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  };

  shelves = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
  };

  static getBooksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf);
  }

  render() {
    const { books, onBookShelfChange } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            Object.getOwnPropertyNames(this.shelves).map(shelf => (
              <BookShelf
                key={shelf}
                title={this.shelves[shelf]}
                books={BookShelves.getBooksByShelf(books, shelf)}
                onBookShelfChange={onBookShelfChange} />
            ))
          }

        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
