import React from 'react';

// first we will make a new context
export const AppContext = React.createContext();

// Then create a provider Component
export class AppProvider extends React.Component {
    state = {
        currentChapter: {},
        arabicFontSize: 45,
        translationId: 24
    }
    render() {
        return (
            <AppContext.Provider 
                value= {{
                    state: this.state, 
                    changeCurrentChapter: (currentChapter) => {
                        console.log(currentChapter);
                        if(this.state.currentChapter.chapter_number != currentChapter.chapter_number){
                            this.setState({
                                currentChapter
                            })
                        }
                    },
                    changeArabicFontSize: (event, value) => {
                        this.setState({
                            arabicFontSize: value
                        })
                    },
                    changeTranslation: (translationId) => {
                        this.setState({translationId})
                    }
                }}>
                     
                    {this.props.children}

            </AppContext.Provider>
        )
    }
}