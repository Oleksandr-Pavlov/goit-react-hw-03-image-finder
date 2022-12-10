import { Component } from 'react';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          <li>{this.props.searchQuery}</li>
        </ul>
      </>
    );
  } 
};

// export const ImageGallery = ({searchQuery}) =>  {
//     return (
//       <>
//         <ul className={css.ImageGallery}>
//           <li>
//             {searchQuery}
//           </li>
//         </ul>
//       </>
//     );
//   } 