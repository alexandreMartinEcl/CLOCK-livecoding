import agent from '../services/http';

const backUrl = '/api/users';
const getUrl = '/api/sessions';
//const backUrl = 'https://requestb.in/ye13r9ye';

export async function backendCheckUser() {
    console.log("Checking user with backend");
    const req = agent.online.get(backUrl);
    try {
        const { body } = await req;
        console.log("User checked :");
        console.log(body);
        return body;
    }
    catch(err) {
      console.error(err);
    }
};

export async function getUserCode(sessionId, userId) {
    console.log(`Getting new user's code, user: ${userId}, session: ${sessionId}`);
    const req = agent.local.get(getUrl + "/" + sessionId + "/" + userId);
    try {
        const { body } = await req;
        console.log(body);
        return body.result.code;
    } catch(err) {
      console.error(err);
    }
}