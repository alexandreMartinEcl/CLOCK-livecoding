import React from 'react';
import { checkIdentity, getToken } from '../repository/tools.js';
import IsOk from "./IsOk";
import IsNotOk from "./IsNotOk";

class IdentityResp extends React.PureComponent {
  userData = {
    authentified: false,
    name: ""
  };


  componentWillMount(){
    let token = getToken()
    this.userData = checkIdentity(token);
  }


  render() {
    if(this.userData.authentified){
      console.log("ok pourtant");
      return <IsOk/>;
    }
    else{
      return <IsNotOk/>;
    }
  }
}

export default IdentityResp;
