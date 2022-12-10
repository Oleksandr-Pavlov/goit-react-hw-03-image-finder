import { Component } from 'react';
import { Notify } from 'notiflix';
import css from './SearchForm.module.css';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault()

    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') return Notify.failure('Enter some query please')

    this.props.onSubmit(searchQuery)
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            onChange={this.handleQueryChange}
            name="searchQuery"
            value={this.state.searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
};
