import agent from 'superagent';
//const backUrl = "whoknows.com"
const backUrl = "https://api.motaword.com/formats"

export const checkIdentitySync = (token) => {
  try {
//    body = await agent.get(backUrl).query({accessToken: token});
//    return res.body;

    if(token === "test"){
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

export const checkIdentityAsync = (compo, token) => {
    try {
        agent.get(backUrl).query({accessToken: token}).then(res =>{
            compo.setUserData(res.body);
        });
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

