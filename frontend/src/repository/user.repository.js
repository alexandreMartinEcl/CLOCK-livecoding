import { getToken } from "./tools";
import agent from '../services/http';

const backUrl = '/api/user';
const getUrl = '/api/sessions';

export async function backendCheckUser() {
    console.log("Checking user with backend");
    let token = getToken();
    console.log("Token is: " + token);
    const req = agent.local.get(backUrl).query({accessToken: token});
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