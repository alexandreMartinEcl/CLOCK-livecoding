import { getToken } from "./tools";
//import agent from '../services/http';

//const backUrl = '//oklm.ebm.nymous.io/api/user';

export async function backendCheckUser() {
console.log("Checking user with backend");
    let token = getToken();
    console.log("Token is: " + token);
    const req = localCheck(token);
//    const req = agent.get(backUrl);//.query({accessToken: token});
    try {
        const body = await req;
//        const { body } = await req; //initial example with req
        console.log("User checked :");
        console.log(body);
        return body;
    }
    catch(err) {
      console.error(err);
    }
};

function localCheck(token){
    if(token === "test"){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({authentified: true, userData: {name: "Albert"}});
            }, 1000);
        });
    }
    else{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({authentified: false});
            }, 1000);
        });
    }
  }