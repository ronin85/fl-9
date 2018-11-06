import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Track } from './Track';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      isLoaded: false,
    };
    this.updateData = this.updateData.bind(this);
  }


  componentDidMount() {
    fetch('https://fl-homework-api.firebaseio.com/mozart.json')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          tracks: json,
        });
      });
  }

  updateData(value) {
    this.props.getTrack(value);
  }

  render() {
    const { isLoaded, tracks } = this.state;
    if (!isLoaded) {
      return (
        <p>Loading tracks.......</p>
      );
    }
    return (
      <div className="playlist">
        <h2>Playlist:</h2>
        <ul className="tracks">
          { tracks.map(track => (
            <li key={track.id}>
              <Track updateData={this.updateData} author={track.author} title={track.title} />
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

Playlist.propTypes = {
  getTrack: PropTypes.func.isRequired,
};

export { Playlist };
