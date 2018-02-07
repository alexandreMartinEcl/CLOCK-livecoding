import React, { Component } from 'react';
import IdentityResp from './components/IdentityResp';

class App extends Component {

  render() {
    return (
      <div>
        Checking you identity..
        <IdentityResp/>
      </div>
    );
  }
}

export default App;
