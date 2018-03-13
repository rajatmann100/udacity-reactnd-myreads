import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SearchBookForm extends Component {
  static propTypes = {
    onBookSearch: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => this.props.onBookSearch(event.target.value)}
          />
        </div>
      </div>
    );
  }
}
