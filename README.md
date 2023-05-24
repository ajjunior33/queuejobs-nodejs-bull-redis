# Queue Jobs Node JS - Bull + Redis

### Docker para subir REDIS

Suba o Redis no docker em sua maquina.

```bash
docker run --name redis -p 6379:6379 -d redis

```

### Configurando

Va no arquivo `.env.dev` copie as variaveis, crie uma arquivo `.env` e configure com seus dados corretos.

Em ambiente dev execute `npm run dev` para iniciar os servidores de teste.
