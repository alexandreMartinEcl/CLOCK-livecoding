import agent from 'superagent';
import { checkAuthResponse, getAuthHeaders } from 'ebm-auth/dist/browser';

//const base = "https://clock-livecoding.ebm.nymous.io";
const base = "";

function localCreateSession(userid, sessionName){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                body: {
                    success: true,
                    result: {
                        creator: {
                            username: "remy",
                            role: "intervenant",
                            nom: "remy",
                            prenom: "remy",
                            email: "remy@remy.fr",
                        },
                        hash: "newSession",
                        created: Date.now(),
                        name: sessionName,
                        users: [
                            {
                                user: {
                                    username: "remy",
                                    role: "intervenant",
                                    nom: "remy",
                                    prenom: "remy",
                                    email: "remy@remy.fr",
                                },
                                html: "",
                                css: "",
                                js: "",
                            },
                        ],
                    },
                },
            });
        }, 1000);
    });
}

function localGetSession(url){
    console.log(url);
    const [, , , , sessionId] = url.split("/");
    const userId = "alex";
    console.log(sessionId);
    if(sessionId === "test"){
        if (userId === "alex") {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        body: {
                            success: true,
                            result: {
                                hash: sessionId,
                                creator: {
                                    username: "remy",
                                    role: "intervenant",
                                    nom: "remy",
                                    prenom: "remy",
                                    email: "remy@remy.fr",
                                },
                                created: Date.now(),
                                name: "Frontend - Backend 2018",
                                users:[
                                    {
                                        username: "remy",
                                        role: "intervenant",
                                        nom: "remy",
                                        prenom: "remy",
                                        email: "remy@remy.fr",
                                    },
                                    {
                                        username: "alex",
                                        role: "eleve",
                                        nom: "martin",
                                        prenom: "alexandre",
                                        email: "alex@gmail.com",
                                    },
                                ],
                                code: {
                                    html: "<h1 class=title >Hello</h1>",
                                    css: ".title{ background-color: blue; }",
                                    js: "Some script"
                                },
                            },
                        },
                    });
                }, 1000);
            });
        } else if (userId === "remy") {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        body: {
                            success: true,
                            result: {
                                hash: sessionId,
                                creator: {
                                    username: "remy",
                                    role: "intervenant",
                                    nom: "remy",
                                    prenom: "remy",
                                    email: "remy@remy.fr",
                                },
                                created: Date.now(),
                                name: "Frontend - Backend 2018",
                                users:[
                                    {
                                        username: "remy",
                                        role: "intervenant",
                                        nom: "remy",
                                        prenom: "remy",
                                        email: "remy@remy.fr",
                                        },
                                    {
                                        username: "alex",
                                        role: "eleve",
                                        nom: "martin",
                                        prenom: "alexandre",
                                        email: "alex@gmail.com",
                                        },
                                ],
                                code: {
                                    html: "<h1 class=title >My owner is Remy</h1>",
                                    css: ".title{ background-color: remy's color; }",
                                    js: "Some script from Remy"
                                },
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
                            success: false,
                            message: 'user not found in this session',
                        },
                    });
                }, 1000);
            });
        }
    } else {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        success: false,
                        message: 'Session does not exist',
                    },
                });
            }, 1000);
        });
    }
}

function localCheckUser(){
    var token = "test";//localStorage.getItem('token') || null;
    console.log("Token is: " + token);

    if(token === "test"){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    body: {
                        success: true,                        
                        user: {
                            username: "remy",
                            role: "intervenant",
                            nom: "remy",
                            prenom: "remy",
                            email: "remy@remy.fr",
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
                        message: "not found",
                        success: false,
                    },
                });
            }, 1000);
        });
    }
}

function getUserCode(url){
    console.log(url);
    const [, , , , sessionHash, username] = url.split("/");
    console.log(sessionHash);
    if(sessionHash === "test"){
        if (username === "alex") {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        body: {
                            success: true,
                            result: {
                                user: {
                                    user: {
                                        username: "alex",
                                        role: "eleve",
                                        nom: "martin",
                                        prenom: "alexandre",
                                        email: "alex@gmail.com",
                                    },
                                    html: "<h1 class=title >My owner is Alex</h1>",
                                    css: ".title{ background-color: alex's color; }",
                                    js: "Some script from Alex"
                                },
                            },
                        },
                    });
                }, 1000);
            });
        }
    }
}

const choiceAgent = {
    local: {
        get: (url) => {
            if (url === '/api/users') {
                return localCheckUser();
            }
            if (url.startsWith("/api/sessions/code")) {
                return getUserCode(url);
            }
        },
        post: (url) => {
            if (url.startsWith('/api/sessions')) {
                return {
                    send: (params) => {
                        return localCreateSession()
                    }
                }
            }
        },
        put: (url) => {
            if (url.startsWith('/api/sessions')) {
                return {
                    send: (params={}) => {
                        return localGetSession(url);
                    }
                }
            }
        },
    },
    online: {
        get: (url) => {
            console.log(getAuthHeaders());
            return agent.get(base + url).set(getAuthHeaders()).catch(checkAuthResponse);
        },
        post: (url) => {
            return {
                send: (params) => {
                    return agent.post(base + url).set(getAuthHeaders()).send(params).catch(checkAuthResponse);
                }
            }
        },
        put: (url) => {
            return {
                send: (params={}) => {
                    return agent.put(base + url).set(getAuthHeaders()).send(params).catch(checkAuthResponse);
                }
            }
        },
    }
}

export default choiceAgent;
