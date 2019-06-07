import React, { Component } from 'react';

class Tracks extends Component {
    state = { previewUrl: false, audio: null };

    playAudio = previewUrl => () => {
        if (!previewUrl) return;

        const { 
            previewUrl: statePreviewUrl, 
            audio: stateAudio 
        } = this.state;

        const audio = new Audio(previewUrl);

        if (statePreviewUrl === previewUrl) {
            stateAudio.pause();
            this.setState({ audio: null, previewUrl: null});
        } else {
            if (stateAudio) {
                stateAudio.pause();
            }

            audio.play();
            this.setState({ audio, previewUrl });
        }
    }

    trackIcon = track => {
        const { preview_url: previewUrl } = track;

        if (!previewUrl) return <span>N/A</span>

        return this.state.previewUrl === previewUrl 
        ? <span>| |</span>
        : <span>&#9654;</span>
    }

    render() {
        const { tracks } = this.props;

        if (!tracks) return null;

        return (
            <div>
                {
                    tracks.map(track => {
                        const { id, name, album, preview_url: previewUrl } = track;

                        return (
                            <div 
                            key={id} 
                            onClick={this.playAudio(previewUrl)}
                            className='track'>
                                <img 
                                src={album.images[0].url} 
                                alt='track image' 
                                className='track-image'/>
                                <p className='track-text'>{name}</p>
                                <i className='track-icon'>{this.trackIcon(track)}</i>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Tracks;
