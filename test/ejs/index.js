const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

// console.log(__dirname);
// console.log(__filename)
// console.log(process.cwd());
// console.log(ejs)

const html = `<% if(world.match('Node')) { %>
                <%= world  %>
                <%- include('./test.ejs')%>
                <% }%>
           `

const world = 'Node.js ejs';

const f1 = ejs.compile(html, {
    filename: path.resolve(__filename),
    compileDebug: true
})

const f2 = f1({ world })



console.log(f2);