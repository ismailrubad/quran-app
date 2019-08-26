import React from 'react';

// first we will make a new context
export const MyContext = React.createContext();

// Then create a provider Component
export class MyProvider extends React.Component {
    state = {
        currentChapter: {}
    }
    render() {
        return (
            <MyContext.Provider 
                value= {{
                    state: this.state, 
                    changeCurrentChapter: (currentChapter) => {
                        console.log(currentChapter);
                        if(this.state.currentChapter.chapter_number != currentChapter.chapter_number){
                            this.setState({
                                currentChapter
                            })
                        }
                    }
                }}>
                     
                    {this.props.children}

            </MyContext.Provider>
        )
    }
}