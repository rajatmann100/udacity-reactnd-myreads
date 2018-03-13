import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookCollection = props => (
  <ol className="books-grid">
    {
      props.books.map(book => (
        <li key={book.id}>
          <Book
            key={book.id}
            book={book}
            onBookShelfChange={props.onBookShelfChange}
          />
        </li>
      ))
    }
  </ol>
);

BookCollection.propTypes = {
  books: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
};

export default BookCollection;
