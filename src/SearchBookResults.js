import React from 'react';
import PropTypes from 'prop-types';
import BookCollection from './BookCollection';

const SearchBookResults = props => (
  <div className="search-books-results">
    { props.books.length === 0 && props.searchQuery
      ?<div className="search-books-not-found">
          {
            `Sorry, no books matched your search criteria
            "${props.searchQuery}". Please try again.`
          }
        </div>
      :<BookCollection
          books={props.books}
          onBookShelfChange={props.onBookShelfChange}/>
    }
  </div>
);

SearchBookResults.propTypes = {
  books: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default SearchBookResults;
