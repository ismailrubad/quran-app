import React from 'react';
import DrawerLayout from './DrawerLayout';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AppProvider } from './AppContextProvider';
import { StylesProvider } from '@material-ui/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1948bc',
        },
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

class App extends React.Component {

    state = {
        chapters: []
    }

    async componentDidMount() {
<<<<<<< HEAD
        axios({
            url: 'https://staging.quran.com:3000/api/v3/chapters',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        )
=======
        axios.get(`http://api.quran.com/api/v3/chapters`)
>>>>>>> fdcd01f638bb1c0b1b7dc0d2e503a37c5919698d
            .then(res => {
                this.setState({
                    chapters: res.data.chapters
                })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <StylesProvider injectFirst>
                        <div id="app-wrapper" >
                            <BrowserRouter>
                                <DrawerLayout chapters={this.state.chapters} />
                            </BrowserRouter>
                        </div>
                    </StylesProvider>
                </ThemeProvider>
            </AppProvider>
        )
    }
}

export default App;