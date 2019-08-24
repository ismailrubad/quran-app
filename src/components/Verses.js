import React from 'react';
import axios from 'axios';

export default class extends React.Component {

    state = {
        chapterId: null,
        verses: [],
        next_page: 1,
        max_limit: 20
    }

    fetchVerses(chapterId, loadMore){

        if(chapterId !== this.state.chapterId || loadMore){

            

            axios.get(`http://staging.quran.com:3000/api/v3/chapters/${chapterId}/verses?recitation=1&translations=21&language=en&page=${this.state.next_page}&limit=${this.state.max_limit}&text_type=words`)
                .then(res => {
                    console.log(res.data);
                    const verses = loadMore ? [ ...this.state.verses , ...res.data.verses] : [...res.data.verses];
                    console.log(verses);
                    const next_page = (chapterId !== this.state.chapterId) ? 1 : res.data.meta.next_page;

                    console.log("nextpage"+ next_page);

                    this.setState({
                        verses,
                        chapterId,
                        next_page
                    })
                })
        }

    }

    renderVerse(){

        return this.state.verses.map(verse => {
            return(
                <div key={verse.id}>
                    <div>
                        <span className="verse_key">{verse.verse_key}</span>
                        <span className="arabic_text">{verse.text_madani}</span>
                    </div>
                    <div>
                        <p className="translation_resource_name">{verse.translations[0].resource_name}</p>
                        <p className="translation_text">{verse.translations[0].text}</p>
                    </div>
                </div>
            )
        })
        
    }

    componentDidMount() {
        console.log("mounted");
    }

    render() {
        const {match} = this.props;

        console.log(this.state.verses);
        this.fetchVerses(match.params.chapterId, false);

        return(
            <div>
                {/* {this.renderVerse()} */}
                <button onClick= {() => this.fetchVerses(match.params.chapterId,true)} > Load more </button>
            </div>
        )
    }
}
