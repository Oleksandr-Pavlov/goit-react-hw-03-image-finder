import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchForm } from "./SearchForm/SearchForm";
import { Button } from 'components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { getPicturesByApi } from '../service/getPicturesByApi';
import { Notify } from "notiflix";

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    loading: false,
    error: null,
    selectedPicture: null,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidUpdate = (_, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });

      getPicturesByApi(searchQuery, page)
        .then(pictures => {
          pictures.data.hits.length === 0 &&
            Notify.warning('Please, enter anything else to search');

          if (prevState.query !== searchQuery) {
            this.setState({ pictures: [...pictures.data.hits] });
          } else
            this.setState({
              pictures: [...prevState.pictures, ...pictures.data.hits]
            });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSelectPicture = pictureUrl => {
    this.setState({ selectedPicture: pictureUrl });
  };

  closeModal = () => {
    this.setState({ selectedPicture: null });
  };

  render() {
    const { pictures, error, loading, selectedPicture } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        {error && <h1>{error.message}</h1>}
        {loading && <p>Loading...</p>}
        <ImageGallery pictures={pictures} onSelectPicture={this.onSelectPicture} />
        {pictures.length > 0 && <Button onLoadMore={this.handleButtonClick} />}
        {selectedPicture !== null && (
          <Modal src={selectedPicture} closeModal={this.closeModal}/>
        )}
      </>
    );
  }
};