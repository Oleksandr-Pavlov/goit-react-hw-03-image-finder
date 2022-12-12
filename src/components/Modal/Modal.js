import { Component } from 'react';
import css from '../Modal/Modal.module.css';

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div className={css.Modal}>
          <img
              src={this.props.selectedPicture}
              alt="Here should be the bigger size of selected pic."
            />
        </div>
      </div>
    );
  }
}
