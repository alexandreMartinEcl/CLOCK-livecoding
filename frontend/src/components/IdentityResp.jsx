import React from 'react';
import { checkIdentity } from '../repository/tools.js';
import IsOk from "./IsOk";
import IsNotOk from "./IsNotOk";

class IdentityResp extends React.PureComponent {
  render() {
    if(checkIdentity(false)){
      console.log("ok pourtant");
      return <IsOk/>;
    }
    else{
      return <IsNotOk/>;
    }
  }
}

export default IdentityResp;
