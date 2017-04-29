	/*
	 * created by Sheldon
	 * 17/3/20	
	 */

	const http = require('http');

	const PORT = 7000;

	const app = require('./app');

	const server = new app();

	//中间件
	const urlParser = require('./app/url-parser');

	const apiServer = require('./app/api');

	const staticServer = require('./app/static-server');

	const viewServer = require('./app/view-server');

	const CookieParser = require('./app/cookie-parser');

	server.use(CookieParser);

	server.use(urlParser);

	server.use(apiServer);

	server.use(staticServer);

	server.use(viewServer);

	//启动app
	http.createServer(server.initServer()).listen(PORT, () => {
	    console.log(`Server listening on port ${PORT}`)
	})