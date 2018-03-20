import agent from '../services/http';

const usersUrl = '/api/users';
const sessionUrl = '/api/sessions';
//const backUrl = 'https://requestb.in/ye13r9ye';

export async function backendCheckUser() {
    console.log("Checking user with backend");
    const req = agent.online.get(usersUrl);
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

export async function getUserCode(sessionId, userName) {
    console.log(`Getting new user's code, user: ${userName}, session: ${sessionId}`);
    const req = agent.local.get(sessionUrl + "/" + sessionId + "/" + userName);
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
      console.error(err);
    }
}