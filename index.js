//----------------------------------MODULO MARKDOWN LINK EXTRACTOR MODIFICADO----------------------------------------------
var marked = require('marked');
function markdownLinkExtractor(markdown) {
    var links = [];

    var renderer = new marked.Renderer();

    // Taken from https://github.com/markedjs/marked/issues/1279
    var linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

    marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
    
    renderer.link = function (href, title, text) {
        links.push({
            href: href,
            text: text
        });
    };

    renderer.image = function (href, title, text) {
        // Remove image size at the end, e.g. ' =20%x50'
        href = href.replace(/ =\d*%?x\d*%?$/, "");
        links.push({
            href: href,
            text: text
        });
    };
    marked(markdown, { renderer: renderer });

    return links;
};
//----------------------------------MODULO MARKDOWN LINK EXTRACTOR MODIFICADO----------------------------------------------
const chalk = require('chalk');


const path = require('path')
const fetch = require('node-fetch'); 

// process.argv[0] == 'node'
// process.argv[1] == 'archivo js al que se refiere'
// process.argv[2] == '1'
// process.argv[3] == '2'
// process.argv[4] == '3'
const ruta = process.argv[2];
const validStat = process.argv[3];
let urabsolute = path.resolve(ruta);


const fs = require('fs');
//const markdownLinkExtractor = require('markdown-link-extractor'); MODULO
const markdown = fs.readFileSync(urabsolute).toString();
const links = markdownLinkExtractor(markdown);
// links.forEach( link => {
//     console.log(link);
//  });


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
  mdLinks()
} else {
  // this module was not run directly from the command line and probably loaded by something else
}


