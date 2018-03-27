import agent from '../services/http';

const usersUrl = '/api/users';
const sessionUrl = '/api/sessions/code';

/** 
 * Vérifie l'authentification de la personne via le token récupéré en paramètre
 * En récupère les infos 
*/
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

/**
 * Récupère le code d'un user spécifique à une session
 * @param {string} sessionId de la session dont on veut le code 
 * @param {string} userName du user dont on veut récupérer le code 
 */
export async function getUserCode(sessionId, userName) {
    console.log(`Getting new user's code, user: ${userName}, session: ${sessionId}`);
    const req = agent.online.get(`${sessionUrl}/${sessionId}/${userName}`);
    try {
        const { body } = await req;
        console.log(body);
        return body;
    } catch(err) {
      console.error(err);
    }
}
