import React from 'react';
import axios from 'axios';

export default class extends React.Component {

    state = {
        chapterId: null,
        verses: [],
        next_page: 1,
        max_limit: 20
    }

    fetchVerses(chapterId){
        axios.get(`http://staging.quran.com:3000/api/v3/chapters/${chapterId}/verses?recitation=1&translations=21&language=en&page=${this.state.next_page}&limit=${this.state.max_limit}&text_type=words`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    verses: [ ...this.state.verses , res.data.verses],
                    // next_page: res.data.meta.next_page
                })
            })
    }

    renderVerse(){}

    componentDidMount() {
        console.log("mounted");
    }

    render() {
        const {match} = this.props;
        
        // console.log(match.params.chapterId);

        if(match.params.chapterId != this.state.chapterId){
            this.setState({chapterId: match.params.chapterId})
            this.fetchVerses(match.params.chapterId);
        }

        return(
            <div>Ver</div>
        )
    }
}
