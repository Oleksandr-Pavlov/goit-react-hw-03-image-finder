import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ picture: { webformatURL } }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={webformatURL} alt='some text' />
    </li>
  );
};