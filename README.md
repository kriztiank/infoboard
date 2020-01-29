# Node.js-Startup

Node.js startup

1. Opret mappe i din stifinder

2. Åbn mappe i VS Code

3. Åbn terminal i VS Code (Ctrl + J / Cmd + J)

4. Skriv i terminal:

```
npm init
```

5. Lav ny fil: index.js

6. Installer express i terminal:

```
npm install express
```

7. Installer ejs i terminal:

```
npm install ejs
```

8. Installer express-ejs-layouts i terminal:

```
npm install express-ejs-layouts
```

9. Installer nodemon i terminal:

```
npm install -D nodemon
```

10. require express server og express-ejs-layouts:
```javascript
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
```

11. Skriv følgende for at klargøre EJS engine og express-ejs-layouts:
```javascript
app.set("view engine", "ejs");
app.use(expressLayouts);
```

12. Sæt sti til static files folder, html, css, billeder, front-end javascript etc:
```javascript
app.use(express.static("./static"));
```

13. Opsæt route til forside:
```javascript
app.get("/", (req, res) => {
  res.render("index", {
    title: "Sidetitel",
    content: "Side Indhold"
  });
});
```

14. Sæt express til at lytte på en port:

```javascript
app.listen(3000, () => {
  console.log("Express kører på port 3000");
});
```

15. Opret fil til views: views/index.ejs og indtast følgende:

```html
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <%= content %>
  </body>
</html>
```

15. Kør applikationen fra din terminal:

```
nodemon index.js
```
