
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
let urabsolute = path.resolve(ruta);
const markdown = fs.readFileSync(urabsolute).toString();
const links = markdownLinkExtractor(markdown);

// links.forEach( link => {
//     console.log(link);
//  });

//console.log(links) muestra arreglo con los links

mdlinks = (h,v,s) => {

const arrayFetch = []; 

for (let i = 0; i < links.length; i++) {
  const url = links[i].href;
  const text = links[i].text;

  const linkArray = fetch(url) 
    .then(res => {
      const objectLinks = {
        href: `${res.url}`,
        text: text || "Sin texto",
        statusLink: `${res.status} ${res.statusText}`,     
      };
      return objectLinks;
    })
    .catch(err => {
      const objectFail = { 
        href: `${url}`,
        Error: "Link no disponible",
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
mdlinks()