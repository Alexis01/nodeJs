# NODEJS CLEAN ARCHITECTURE - SINGLE SING ON 

Repositorio que simula un single sing on, basado en una arquitectura limpia para nodejs.

## Tecnología
* MongoDb (Mongoose)
* jsonwebtoken
* Express
* Graphql
* Bcrypt


## Como lanzar 

```shell
    npm cache clear
    npm prune
    npm i
```
## Debuguear con visual studio code
Vamos a la pestaña de debug y añadimos la siguiente configuración
```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Nodemon",
                "type": "node",
                "request": "launch",
                "program": "${workspaceRoot}/node_modules/nodemon/bin/nodemon.js",
                "args": ["${workspaceRoot}/server.js"],
                "runtimeArgs": ["--nolazy"]
            },
            {
                "name": "Launch",
                "type": "node",
                "request": "launch",
                "program": "${workspaceRoot}/server.js",
                "runtimeArgs": ["--nolazy"]
            }
        ]
}
```

La primera configuración lanza nodemon para detectar cambios on the fly.

La segunda configuración lanza node en modo debug y podemos poner puntos de ruptura para debuguear nuestros servicios en tiempo de ejecución.

