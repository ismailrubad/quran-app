import React, { useContext } from 'react';
import axios from 'axios';
import {AppContext} from './AppContextProvider';
import { Typography } from '@material-ui/core';
import bullet from '../../src/assets/img/bullet.svg'
import { bool } from 'prop-types';
export default class extends React.Component {

    state = {
        chapterId: null,
        verses: [],
        next_page: 1,
        max_limit: 20
    }

    fetchVerses(chapterId, loadMore){

        if(chapterId !== this.state.chapterId || loadMore){

            const next_page = (chapterId !== this.state.chapterId) ? 1 : this.state.next_page;

            if (next_page !== null){
                axios.get(`http://staging.quran.com:3000/api/v3/chapters/${chapterId}/verses?recitation=1&translations=24&language=en&page=${next_page}&limit=${this.state.max_limit}&text_type=words`)
                    .then(res => {
                        // console.log(res.data);
                        const verses = loadMore ? [ ...this.state.verses , ...res.data.verses] : [...res.data.verses];
                        // console.log(verses);
                        const next_page = res.data.meta.next_page;

                        // console.log("nextpage"+ next_page);

                        this.setState({
                            verses,
                            chapterId,
                            next_page
                        })
                    })
            }
        }

    }

    renderVerse(){
        return this.state.verses.map(verse => {
            return(
                <div key={verse.id} className="verse">
                    <div className="verse-top-part">
                        <span className="verse_key">{verse.verse_key}</span>
                    </div>
                    <AppContext.Consumer>
                        {(context) => (
                            <React.Fragment>
                                {
                                    <Typography style={{fontSize: `${context.state.arabicFontSize}px`}} variant="h5" className="arabic_text">{verse.text_madani} <img width = "20" src = {bullet} ></img></Typography>
                                }
                            </React.Fragment>
                        )}
                    </AppContext.Consumer>
                    <div className="translation">
                        <span className="translation_resource_name">{verse.translations[0].resource_name}</span>
                        <p className="translation_text">{verse.translations[0].text}</p>
                    </div>
                </div>
            )
        })
        
    }


    render() {
        const {match} = this.props;

        this.fetchVerses(match.params.chapterId, false);

        return(
            <div>
                <AppContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            {
                                context.changeCurrentChapter({
                                    name_complex: this.props.name_complex,
                                    name_arabic: this.props.name_arabic,
                                    chapter_number: this.props.chapter_number,
                                    revelation_place: this.props.revelation_place
                                })
                            }
                        </React.Fragment>
                    )}
                </AppContext.Consumer>
                {this.renderVerse()}
                
            </div>
        )
    }
}
