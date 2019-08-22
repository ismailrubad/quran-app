import React from 'react';
import DrawerLayout from './DrawerLayout';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


export default class extends React.Component {
    
    state = {
        chapters: []
    }

    async componentDidMount() {

        axios.get(`http://staging.quran.com:3000/api/v3/chapters`)
            .then(res => {
                this.setState({
                    chapters: res.data.chapters
                })
                
            })
    }

    render(){

        return(
            <div id="app-wrapper" >
                <BrowserRouter>
                    <DrawerLayout chapters = {this.state.chapters} />
                </BrowserRouter>
            </div>
        )
    }
}