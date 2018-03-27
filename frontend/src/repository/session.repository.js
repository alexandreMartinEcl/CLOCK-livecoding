import agent from '../services/http';

const getUrl = '/api/sessions/user';
const createUrl = '/api/sessions';
const putCodeUrl = '/api/sessions/code';

/**
 * Post une nouvelle session
 * @param {string} sessionName de la session que l'on veut créé
 */
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

/**
 * Récupère les données de la session que l'on veut accéder
 * Ajoute le user s'il n'est pas déjà présent dans la session (d'où le put)
 * @param {string} sessionId de la session que l'on veut entrer 
 */
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

/**
 * Met à jour le code d'un user dans une session spécifique
 * @param {string} sessionId de la session où on veut updater le code
 * @param {string} username de la personne dont on veut updater le code
 * @param {string} html rempalçant le code existant
 * @param {string} css rempalçant le code existant
 * @param {string} js rempalçant le code existant
 */
export async function updateCodes(sessionId, username, html, css, js) {
    console.log(`Updating session: ${sessionId}, user: ${username}`);
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
