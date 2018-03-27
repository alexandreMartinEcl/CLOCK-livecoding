import JSZip from 'jszip';
import moment from 'moment';
import {saveAs} from 'file-saver';

export function downloadZip(html, css, js, username, sessionHash) {
    // definition des const
    const baseFileName = `${moment().format('YYYYMMDD')}_${username}_${sessionHash}`;

    const baseHtmlTemplate = '<!doctype html>\n' +
    '<html>\n\t' +
    '<head>\n\t\t' +
    '<meta charset="utf-8">\n\t\t' +
    '<title>Test</title>\n\t\t' +
    '</head>\n\t' +
    '<body>\n\t\t' +
    '\n\t' +
    '</body>\n' +
    '</html>';

    // manip pour créer un jouli html
    html = baseHtmlTemplate.replace('\n\t</body>', `${html.replace('\n', '\n\t\t')}\n\t</body>`);
    html = html.replace('</head>\n\t', `<link rel="stylesheet" href="./${baseFileName}.css" />\n\t</head>\n\t`);
    html = html.replace('</body>\n', `<script src="./${baseFileName}.js"></script>\n\t</body>\n`);

    // manip pour créer le zip et lancer le DL
    const zip = new JSZip();
    
    zip.file(`${baseFileName}.html`, html);
    zip.file(`${baseFileName}.css`, css);
    zip.file(`${baseFileName}.js`, js);
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
        saveAs(content, `${baseFileName}.zip`);
    });
}
