import React, { Component } from 'react';
import PropTypes from 'prop-types';

const url = require('./icons/missing-cover-page.png');

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }
  render() {
    const { book, onBookShelfChange } = this.props;
    const {
      title = '',
      authors = [],
      shelf = 'none',
      imageLinks: { thumbnail = url } = [],
    } = book;
    const coverPageStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${thumbnail})`,
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={coverPageStyle}>
          </div>
          <div className="book-shelf-changer">
            <select
              defaultValue={shelf}
              onChange={(e) => { onBookShelfChange(book, e.target.value); }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}
