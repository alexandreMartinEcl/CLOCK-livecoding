//import agent from '../services/http';

//const getUrl = '/api/sessions';
//const createUrl = '/api/sessions';

export async function reqCreateSession(userId) {
    console.log("Creating session");
//    const req = agent.post(createUrl).send({creatorid: userId});
    const req = localCreate();
    try {
        const res = await req;
        console.log("Session created");
        console.log(res);
        return res;
//        return res.body;
    }
    catch(err) {
      console.error(err);
    }
};

export async function reqGetSession(sessionId, userId) {
    console.log("Getting session: " + sessionId + " with user: " + userId);
//    const req = agent.get(getUrl + "/" + sessionId + "/" + userId);
    const req = localGet(sessionId);
    try {
        const res = await req;
        if (res.status === "ok"){
            console.log("Session found");
            return res;
        } else {
            console.log("Session not found");
            return res;
        }
    }
    catch(err) {
      console.error(err);
    }
};

function localCreate(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({status: "ok", sessionId: "abc"});
        }, 1000);
    });
}

function localGet(sessionId){
    if(sessionId === "test"){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: "ok",
                    session: {
                        hash: "test",
                        users: [
                            {
                                lastName: "Rémy",
                                firstName: "Rémy",
                                userId:"remy"
                            }
                        ],
                    },
                    code: {
                        html: "<h1 class=title >Hello</h1>",
                        css: ".title{ background-color: blue; }",
                        js: "Some script"
                    }
                });
            }, 1000);
        });
    } else {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: "not found",
                });
            }, 1000);
        });
    }
}