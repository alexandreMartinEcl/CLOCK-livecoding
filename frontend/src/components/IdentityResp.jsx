import React from 'react';
import { checkIdentitySync, checkIdentityAsync, getToken } from '../repository/tools.js';
import IsOk from "./IsOk";
import IsNotOk from "./IsNotOk";

class IdentityResp extends React.PureComponent {
  userData = {
    authentified: false,
    name: ""
  };


  componentWillMount(){
    let token = getToken()
/*    
    checkIdentityAsync(this, token).then( data => {
      console.log(data);
      //this.userData = data;
    });
*/
    this.userData = checkIdentitySync(token);
  }

  setUserData(data){
    this.userData = data;
  }

  render() {
//    return (
//    <div>{this.userData.authentified}</div>

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
