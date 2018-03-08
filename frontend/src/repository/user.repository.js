import { getToken } from "./tools";
import agent from '../services/http';

const backUrl = '/api/user';

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
