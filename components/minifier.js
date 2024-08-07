// Function that minifies the HTML, CSS, and JS files

const fs = require('fs');
const htmlMinifier = require('html-minifier');
const cssMinifier = require('clean-css');
const jsMinifier = require('terser');

function minifyHTML(file) {
    const data = fs.readFileSync(file, 'utf8');
    const result = htmlMinifier.minify(data, {
        collapseWhitespace: true,
        removeComments: true
    });
    fs.writeFileSync(file, result, 'utf8');
}
