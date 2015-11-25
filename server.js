var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/styles/{path*}',
            handler: createDirectoryRoute('styles')
        },
        js: {
            method: 'GET',
            path: '/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: '/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: '/',
            handler: {
                file: path.join(__dirname, '/dist/index.html'),    
            }
        },
        collection: {
            method: 'GET',
            path: '/collection.html',
            handler: {
                file: path.join(__dirname, '/dist/collection.html'),    
            }
        },
        album: {
            method: 'GET',
            path: '/album.html',
            handler: {
                file: path.join(__dirname, '/dist/album.html'),    
            }
        }
    };

server.route([ routes.css, routes.js, routes.assets, routes.templates, routes.spa, routes.collection, 
      routes.album ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/dist/', directory)
        }
    };
}

module.exports = server;