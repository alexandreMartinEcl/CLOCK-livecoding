export const getToken = () => {
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

