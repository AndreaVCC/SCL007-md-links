
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const fetch = require('node-fetch');

const ruta = process.argv[2];

var markdown = fs.readFileSync(ruta).toString();
var links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    console.log(link);
});

