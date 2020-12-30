import React, { useContext } from 'react';
import axios from 'axios';
import { AppContext } from './AppContextProvider';
import { Typography, Button, CircularProgress, LinearProgress } from '@material-ui/core';
import bullet from '../../src/assets/img/bullet.svg'
class Verses extends React.Component {

    state = {
        chapterId: null,
        verses: [],
        next_page: 1,
        max_limit: 20,
        fetching: true,
        fetchingMore: false,
        translationId: this.context.state.translationId
    }

    fetchVerses = (chapterId, translationId, loadMore) => {
        console.log("fetching");

        if (chapterId !== this.state.chapterId || loadMore) {

            const next_page = (chapterId !== this.state.chapterId) ? 1 : this.state.next_page;

            if (next_page !== null) {

                this.setState({ fetching: (!loadMore) ? true : false }, () => {
                    fetch(`https://api.quran.com/api/v3/chapters/${chapterId}/verses?recitation=1&translations=${translationId}&language=en&page=${next_page}&limit=${this.state.max_limit}&text_type=words`)
                        .then((response) => {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response
                            response.json().then(function (data) {
                                console.log(data);
                                // console.log(res.data);
                                const verses = loadMore ? [...this.state.verses, ...data.verses] : [...data.verses];
                                // console.log(verses);
                                const next_page = data.meta.next_page;

                                // console.log("nextpage"+ next_page);

                                this.setState({
                                    verses,
                                    chapterId,
                                    next_page,
                                    fetching: false,
                                    fetchingMore: loadMore ? false : null
                                })
                            });
                        }
                        )
                        .catch(function (err) {
                            console.log('Fetch Error :-S', err);
                        });

                    // axios.get(`http://api.quran.com/api/v3/chapters/${chapterId}/verses?recitation=1&translations=${translationId}&language=en&page=${next_page}&limit=${this.state.max_limit}&text_type=words`)
                    //     .then(res => {
                    //         // console.log(res.data);
                    //         const verses = loadMore ? [...this.state.verses, ...res.data.verses] : [...res.data.verses];
                    //         // console.log(verses);
                    //         const next_page = res.data.meta.next_page;

                    //         // console.log("nextpage"+ next_page);

                    //         this.setState({
                    //             verses,
                    //             chapterId,
                    //             next_page,
                    //             fetching: false,
                    //             fetchingMore: loadMore ? false : null
                    //         })
                    //     })
                });


            }
        }

    }

    fetchVersesOnTranslationUpdate(chapterId, translationId) {

        const next_page = 1;

        axios.get(`http://api.quran.com/api/v3/chapters/${chapterId}/verses?recitation=1&translations=${translationId}&language=en&page=${next_page}&limit=${this.state.max_limit}&text_type=words`)
            .then(res => {
                // console.log(res.data);
                const verses = [...res.data.verses];
                // console.log(verses);
                const next_page = res.data.meta.next_page;
                setTimeout(() => {
                    this.setState({
                        verses,
                        chapterId,
                        next_page,
                        fetching: false,
                        translationId
                    })
                }, 1000);
            })
    }

    renderVerse(fetchingNewTranslation) {
        return this.state.verses.map(verse => {
            // const fetchingNewTranslation = this.context.state.translationId !== this.state.translationId;
            return (
                <div key={verse.id} className={"verse " + (this.state.fetching ? 'dimAnimation' : null)}>
                    <div className="verse-top-part">
                        <span className="verse_key">{verse.verse_key}</span>
                    </div>

                    <Typography style={{ fontSize: `${this.context.state.arabicFontSize}px` }} variant="h5" className="arabic_text">{verse.text_madani} <img width="20" src={bullet} ></img></Typography>

                    <div className={"translation " + (fetchingNewTranslation ? 'dimAnimation' : null)} >
                        <span className="translation_resource_name">{verse.translations[0].resource_name}</span>
                        <p style={{ fontSize: `${this.context.state.otherFontSize}px` }} className="translation_text">{verse.translations[0].text}</p>
                    </div>
                </div>
            )
        })

    }

    renderLoadMore(chapterId, translationId) {
        if (!this.state.fetchingMore) {
            return (
                <Button onClick={() => {
                    this.fetchVerses(chapterId, translationId, true);
                    this.setState({ fetchingMore: true })
                }} variant="contained" color="primary" >
                    Load More
                </Button>
            )
        }
        else {
            return (
                <CircularProgress />
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        const { match } = nextProps;
        this.fetchVerses(match.params.chapterId, this.context.state.translationId, false);
    }


    render() {
        const { match } = this.props;
        console.log(this.context);
        const fetchingNewTranslation = this.context.state.translationId !== this.state.translationId;

        if (fetchingNewTranslation)
            this.fetchVersesOnTranslationUpdate(this.state.chapterId, this.context.state.translationId, false);

        return (
            <React.Fragment>
                <div style={{ position: 'relative' }}>
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
                    {this.renderVerse(fetchingNewTranslation)}
                    <div style={{ textAlign: 'center' }}>
                        {
                            (!this.state.fetching) ?
                                this.renderLoadMore(match.params.chapterId, this.context.state.translationId) : null
                        }
                    </div>
                    {console.log("fetchingNewTranslation" + fetchingNewTranslation)}
                    {
                        (this.state.fetching) ? (<div style={{
                            width: '100%', zIndex: 9999, left: 0,
                            position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0
                        }}>
                            <LinearProgress style={{ width: '100%' }} />
                        </div>) : null
                    }
                </div>
            </React.Fragment>
        )
    }
}

Verses.contextType = AppContext;

export default Verses;