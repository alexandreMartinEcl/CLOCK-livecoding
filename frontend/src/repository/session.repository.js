import agent from '../services/http';

const getUrl = '/api/sessions/user';
const createUrl = '/api/sessions';
const putCodeUrl = '/api/sessions/code';

export async function reqCreateSession(sessionName) {
    console.log("Creating session");
    const req = agent.online.post(createUrl).send({sessionName: sessionName});
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
    const req = agent.online.put(getUrl + "/" + sessionId).send({});
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
      console.error(err);
    }
};

export async function updateCodes(sessionId, username, html, css, js) {
    console.log(`Updating session: ${sessionId}, user: ${username}`);
    const req = agent.online.put(`${putCodeUrl}/${sessionId}`)
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
