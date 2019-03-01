const fs = require('fs');
const path = require('path')
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch'); //
// process.argv[0] == 'node'
// process.argv[1] == 'archivo js al que se refiere'
// process.argv[2] == '1'
// process.argv[3] == '2'
// process.argv[4] == '3'
const ruta = process.argv[2];
const validStat = process.argv[3];
let urabsolute = path.resolve(ruta);

const markdown = fs.readFileSync(urabsolute).toString();
const links = markdownLinkExtractor(markdown);

// links.forEach( link => {
//     console.log(link);
//  });

//console.log(links) muestra arreglo con los links


mdLinks = (p, v, s) => {

  const arrayFetch = [];

  for (let i = 0; i < links.length; i++) {
    const url = links[i].href;
    const text = links[i].text;


    const linkArray = fetch(url)

      .then(res => {

        if (validStat === '--validate') {
          const objectLinks = {
            href: `${res.url}`,
            text: text || "Sin texto",
            ruta: urabsolute,
            statusLink: `${res.status} ${res.statusText}`,
          };
          return objectLinks;

        } else {
          const objectLinks = {
            href: `${res.url}`,
            text: text || "Sin texto",
            ruta: urabsolute,
          };
          return objectLinks;
        }
      })

      .catch(err => {
        const objectFail = {
          href: `${url}`,
          text: text || "Sin texto",
          Error: "LINK NO DISPONIBLE",
        };
        return objectFail;
      });

    arrayFetch.push(linkArray);
  }

  Promise.all(arrayFetch)
    .then(arrayResp => {
      console.log(arrayResp);
    });



};
mdLinks()


if (require.main === module) {
  // this module was run directly from the command line as in node xxx.js
} else {
  // this module was not run directly from the command line and probably loaded by something else
}


