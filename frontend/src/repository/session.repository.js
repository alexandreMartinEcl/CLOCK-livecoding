import agent from '../services/http';

const getUrl = '/api/sessions/code';
const createUrl = '/api/sessions';
const putCodeUrl = '/api/sessions/code';

export async function reqCreateSession(userId) {
    console.log("Creating session");
    const req = agent.online.post(createUrl).send({creatorid: userId});
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
      console.error(err);
    }
};

export async function reqGetSession(sessionId) {
    console.log("Getting session: " + sessionId);
    const req = agent.online.get(getUrl + "/" + sessionId);
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
      console.error(err);
    }
};

export async function updateCodes(sessionId, username, html, css, js) {
    console.log("Getting session: " + sessionId );
    const req = agent.online.put(`${putCodeUrl}/${sessionId}/${username}`)
        .send({
            html: html,
            css: css,
            js: js,
        });
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
        console.error(err);
    }
};
