import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      author: this.props.author,
      title: this.props.title,
      isPlaying: false,
    };
  }

  handleIsFavotire() {
    this.setState(prevstate => ({
      isFavorite: !prevstate.isFavorite,
    }));
  }

  handleIsPlaying() {
    this.setState(prevstate => ({
      isPlaying: !prevstate.isPlaying,
    }));
  }

  render() {
    const {
      isFavorite, author, title, isPlaying,
    } = this.state;
    return (
      <div role="button" tabIndex={0} className="track" onKeyDown={() => { this.props.updateData(this); }} onClick={() => { this.props.updateData(this); }}>
        <i role="button" tabIndex={0} onKeyDown={this.handleIsPlaying.bind(this)} onClick={this.handleIsPlaying.bind(this)} className="material-icons">{ isPlaying ? 'pause' : 'play_arrow' }</i>
        <div className="description">
          <span className="description-title">{ title }</span>
          <span className="description-author">{ author }</span>
        </div>
        <button type="button" onKeyDown={this.handleIsFavotire.bind(this)} onClick={this.handleIsFavotire.bind(this)} className="material-icons isFavorite">{ isFavorite ? 'favorite' : 'favorite_border'}</button>
      </div>
    );
  }
}

Track.propTypes = {
  updateData: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export { Track };
