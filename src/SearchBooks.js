import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBookForm from './SearchBookForm';
import SearchBookResults from './SearchBookResults';
import * as BooksAPI from './BooksAPI';

export default class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }
  state = {
    searchQuery: '',
    books: [],
    error: '',
  };
  currentSearchQuery = '';

  updateSearchState({ searchQuery = '', books = [], error = '' }) {
    const booksWithShelf = books.length ? this.updateBookShelf(books) : [];
    this.setState({ searchQuery, books: booksWithShelf, error });
  }

  updateBookShelf(books) {
    const updatedBooks = [];
    const bookCollectionByShelf = this.props.books
      .reduce((revisedbooks, book) => {
        revisedbooks[book.id] = book;
        return revisedbooks;
      }, {});

    books.forEach((book, index) => {
      const shelf =
        bookCollectionByShelf[book.id]
          ? bookCollectionByShelf[book.id].shelf
          : 'none';
      updatedBooks.push(Object.assign(books[index], { shelf }));
    });

    return updatedBooks;
  }

  searchBooks(searchQuery) {
    BooksAPI
      .search(searchQuery)
      .then((books) => {
        if (searchQuery === this.currentSearchQuery) {
          books.error
            ? this.updateSearchState({
              searchQuery,
              error: (books.error === 'empty query' ? '' : books.error),
            })
            : this.updateSearchState({ searchQuery, books });
        }
      })
      .catch(error => this.updateSearchState({ error }));
  }

  bookSearchHandler(searchQuery) {
    this.currentSearchQuery = searchQuery;
    searchQuery
      ? this.searchBooks(searchQuery)
      : this.updateSearchState({ searchQuery });
  }

  render() {
    return (
      <div className="search-books">
        <SearchBookForm
          onBookSearch={this.bookSearchHandler.bind(this)}
        />
        <SearchBookResults
          searchQuery={this.state.searchQuery}
          books={this.state.books}
          onBookShelfChange={this.props.onBookShelfChange}
        />
      </div>
    );
  }
}
