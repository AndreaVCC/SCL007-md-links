
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch'); //
const ruta = process.argv[2];
// process.argv[0] == 'node'
// process.argv[1] == 'archivo js al que se refiere'
// process.argv[2] == '1'
// process.argv[3] == '2'
// process.argv[4] == '3'

var markdown = fs.readFileSync(ruta).toString();
var links = markdownLinkExtractor(markdown);

// links.forEach( link => {
//     console.log(link);
//  });


//console.log(links) muestra arreglo con los links

const arrayFetch = []; 

for (let i = 0; i < links.length; i++) {
  const url = links[i].href;
  const text = links[i].text;

  const linkArray = fetch(url) 
    .then(res => {
      const objectLinks = {
        href: `${res.url}`,
        text: text || "",
        statusLink: `${res.status} ${res.statusText}`,     
      };
      return objectLinks;
    })
    .catch(err => {
      const objectFail = { 
        //text: `${text}`,
        href: `${url}`,
        Error: "Fail",
      };
      return objectFail;
    });
  arrayFetch.push(linkArray);
}

Promise.all(arrayFetch)
    .then(arrayResp => {
    console.log(arrayResp);
    });

mdlink = (h,v,s) => {

};