import agent from 'superagent';

function localCreateSession(userid){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                body: {
                    status: "ok",
                    session: {
                        creatorid: userid,
                        hash: "newSession",
                        created: Date.now(),
                        users:[
                            {
                                user:{
                                    userid: userid,
                                    firstName: "Alex",
                                    lastName: "Martin",
                                },
                                html: "",
                                css: "",
                                js: "",
                            }
                        ],
                    },
                },
            });
        }, 1000);
    });
}

function localGetSession(url){
    const [,,,sessionId, userId] = url.split("/");
    console.log(sessionId);
    if(sessionId === "test"){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        status: "ok",
                        session: {
                            creatorid: userId,
                            hash: "newSession",
                            created: Date.now(),
                            users:[
                                {
                                    user:{
                                        userid: userId,
                                        firstName: "Alex",
                                        lastName: "Martin",
                                    },
                                },
                                {
                                    user:{
                                        userid: userId,
                                        firstName: "Remy",
                                        lastName: "Prioul",
                                    },
                                },
                            ],
                        },
                        code: {
                            html: "<h1 class=title >Hello</h1>",
                            css: ".title{ background-color: blue; }",
                            js: "Some script"
                        },
                    },
                });
            }, 1000);
        });
    } else {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        status: "not found",                        
                    },
                });
            }, 1000);
        });
    }
}

function localCheckUser(token){
    if(token === "test"){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        status: "ok",                        
                        authentified: true,
                        user: {
                            firstName: "Alex",
                            lastName: "Martin",
                            userid: "userId",
                        },
                    },
                });
            }, 1000);
        });
    }
    else{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        status: "not found",
                        authentified: false,
                    },
                });
            }, 1000);
        });
    }
}

const choiceAgent = {
    local: {
        get: (url) => {
            if (url.startsWith('/api/sessions')) {
                return localGetSession(url);
            }
            if (url === '/api/user') {
                return {
                    query: (params) => {
                        return localCheckUser(params.accessToken);
                    }
                }
            }
        },
        post: (url) => {
            return {
                send: (params) => {
                    return localCreateSession()
                }
            }
        }
    },
    online: agent    
}

export default choiceAgent;
