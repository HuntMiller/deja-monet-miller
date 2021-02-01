import './App.css';
import React, { Component } from 'react';
import ReasonConsumer from './components/reason-consumer';
import ReasonProvider from './components/reason-provider';

class App extends Component{
  constructor(){
    super();
    this.state = {
      index: 0
    };
  }

  progress = (e, i) => {
    this.setState({
      index: i
    });
  }

  render(){
    return (
      <div className="App" onCl>
        <ReasonProvider>
          <ReasonConsumer 
          index={this.state.index}
          progress={this.progress}
          />
        </ReasonProvider>
    </div>
    );
  }
}

export default App;