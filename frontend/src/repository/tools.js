import IsOk from "../components/IsOk";
import IsNotOk from "../components/IsNotOk";

import agent from 'superagent';
const backUrl = "whoknows.com"

export const checkIdentity = (token) => {
  try {
//    const res = await agent.get(backUrl).query({accessToken: token});
//    return res.body;

    if(token == "test"){
        return {authentified: true, name: "Albert"};
    }
    else{
        return {authentified: false, name: ""};
    }
  }
  catch(err) {
    console.error(err);
  }
};

export const getToken= () => {
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

