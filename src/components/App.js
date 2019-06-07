import React, { Component } from 'react';
import Search from './Search';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
    state = { artist: null, artistTopTracks: null};

    componentDidMount() {
        this.searchArtist('pentatonix');
    }

    searchArtist = artistQuery => {
        const encodedArtistName = encodeURIComponent(artistQuery);

        fetch(`${API_ADDRESS}/artist/${encodedArtistName}`)
        .then(response => response.json())
        .then(json => {
            if (json.artists.total > 0) { // Cleaner way to check than to get artists.items
                const artist = json.artists.items[0];

                this.setState({ artist });

                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => {
                    this.setState({ artistTopTracks: json.tracks });
                })
                .catch(error => alert(error.message));
            }
        })
        .catch(error => alert(error.message));
    }
    
    render() {
        return (
            <div>
                <h2>Music Master</h2>
                <Search searchArtist={this.searchArtist} />
                <Artist artist={this.state.artist} />
                <Tracks tracks={this.state.artistTopTracks} />
            </div>
        );
    }
}

export default App;
