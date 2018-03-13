import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookCollection from './BookCollection';

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { books, title, onBookShelfChange } = this.props;
    const bookCounter = books.length
      ? `[ ${books.length} ${(books.length > 1 ? 'Books' : 'Book')} ]`
      : '';

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">
            <span>{title}</span>
            <span className="bookshelf-count">
              {bookCounter}
            </span>
          </h2>
          <div className="bookshelf-books">
            <BookCollection
              books={books}
              onBookShelfChange={onBookShelfChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
