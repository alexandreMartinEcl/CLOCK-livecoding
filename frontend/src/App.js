import React, { Component } from 'react';
import { checkIdentity } from './repository/tools.js';

class App extends Component {
    get_token(){
        let search = window.location.search;
        let args = search.split("?");
        let dctArgs = {};

        args.forEach((str)=>{
            if(str.split("=").length === 2){
                let key = str.split("=")[0];
                let value = str.split("=")[1];
                dctArgs[key] = value;
            }
        });

        return dctArgs["token"];
      }


    render() {
    return (
      <div>
        Checking your identity
        {checkIdentity(true)}
      </div>
    );
  }
}

export default App;
