import React from 'react';
import DrawerLayout from './DrawerLayout';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {AppProvider} from './AppContextProvider';

class App extends React.Component {
    
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
            <AppProvider>
                <div id="app-wrapper" >
                    <BrowserRouter>
                        <DrawerLayout chapters = {this.state.chapters} />
                    </BrowserRouter>
                </div>
            </AppProvider>
        )
    }
}

export default App;