import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchForm } from "./SearchForm/SearchForm";

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({searchQuery})
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
      </>
    );
  }
};
