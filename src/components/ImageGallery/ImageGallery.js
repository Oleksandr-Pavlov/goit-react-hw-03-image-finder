import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { Notify } from 'notiflix';
import { Button } from 'components/Button/Button';

const API_KEY = '30800141-5155b96734261143d4ff6b69f';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS = 'image_type=photo&orientation=horizontal&safesearch=true';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    loading: false,
    error: null
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const {page} = this.state

    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({loading: true, pictures: []})

      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${nextQuery}&${SETTINGS}&page=${page}&per_page=12`
      )
        .then(res => {
          if (res.ok) return res.json();
          return new Error()
        })
        .then(pictures => {
          if (pictures.hits.length === 0)
            return Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );

          this.setState({ pictures: pictures.hits });
        })
        .catch(error => this.setState({error}))
        .finally(() => this.setState({loading: false}));
    }
  }

  render() {
    const {pictures, loading, error} = this.state

    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loading && <p>Loading...</p>}
        <ul className={css.ImageGallery}>
          {pictures.map(picture => (
            <ImageGalleryItem key={picture.id} picture={picture} />
          ))}
        </ul>
        {pictures.length > 0 && <Button onLoadMore={this.handleButtonClick}/>}
      </>
    );
  } 
};