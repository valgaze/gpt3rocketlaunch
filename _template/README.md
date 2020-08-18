## GPT Rocket

## Credential

Credentials can go in **[settings/key.json](./settings/key.json)** under the key field

You can save your credential to **[settings/key.json](./settings/key.json)** with:

Skip confirm prompts

```sh
npm run setcredential -- -y
```

```sh
npm run setcredential -c xxxxxxxxxxxxxxxxxxxx

```

You can also pass the credential itself to backend, ex:

```sh
npm run server -c xxxxxxxxxxxxxxxxxxxx
```

## 1) Install all dependencies

```sh
npm run install:all
```

## 2) Run an example (javascript/typescript)

```sh
npm run ex:js
```

```sh
npm run ex:ts
```

## Boot a server

```sh
npm run server
```
