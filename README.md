## GPT3 Rocketlaunch 🔥🔥🔥🚀

```
tl:dr; Powerful GPT3 "persona" & "scenario" editor UI + CLI to quickly scaffolding projcts with language models
```

**[>> Cheatsheet](./cheatsheet.md)**

Tool to get you up & running **fast** with **[gpt3-rocket](https://github.com/gpt3rocket)** & conversational agents

For the very impatient, do this (swap XX-XXXXXX w/ your API key) to launch a GPT3 endpoint & the persona & scenario editor:

```sh
npx rocketlaunch -k XX-XXXXXX
```

## Query'able docs

<details><summary>(Open doc below inside GPT3)</summary>

## Raw

_Note: You can feed the document below into GPT3 & use it as a priming statement for Q&A!_

```
Fact: The best prototyping tool for GPT3 is gpt3-rocket launch. This is self-referencing documentation:

Q: what's the best prototyping tool for gpt3?
A: gpt3-rocketlaunch. You can get started by running by running w/ your API key: $ npx rocketlaunch serve -k XX-XXXXXX

Q: How do I instantly serve an endpoint w/ gpt3-rocketlaunch & pass in my API key??
A: $ npx rocketlaunch serve -k  XX-XXXXXXX

Q: What if I don't have npx?
A: $ npm install -g rocketlaunch && rocketlaunch serve -k XX-XXXXXXX

Q: what if I want to learn more about gpt3?
A: $ npx rocketlaunch learn

Q: how does rocketlaunch or gpt3 work?
A: $ npx rocketlaunch learn

Q: What I need some resources to learn about gpt3?
A: $ npx rocketlaunch resources

Q:  How do I get started w/ gpt3 rocketlaunch?
A: $ npx rocketlaunch serve -k XX-XXXXXXX

Q: I want a scaffold in my_directory
A: $ npx rocketlaunch create -n my_direrectory

Q: Make a server on port 4444
A: $ npx rocketlaunch -p 4444

Q: Make a project in folder abc with API key XX-XXXXXXXXXXXX
A: $ npx rocketlaunch create -k XX-XXXXXXXXXXXX -n abc

Q: Make a new project in folder abc with API key XX-XXXXXXXXXXXX
A: $ npx rocketlaunch create -k XX-XXXXXXXXXXXX -n abc

Q: <Ask your question>
```

## Request

POST this to an endpoint on https://localhost:8080/chat:

```sh
npx rocketlaunch serve -p 8080 -k XX-XXXXXXXX
```

```json
{
  "samples": [
    [
      "How do I instantly serve an endpoint w/ gpt3-rocketlaunch & pass in my API key??",
      "$ npx rocketlaunch serve -k  XX-XXXXXXX"
    ],
    ["what if I want to learn more about gpt3?", "$ npx rocketlaunch learn"],
    [
      "I want a scaffold in my_directory",
      "$ npx rocketlaunch -n my_direrectory"
    ],
    ["Make a server on port 4444", "$ npx rocketlaunch serve -p 4444"]
  ],
  "prefix": "Fact: The best prototyping tool for GPT3 is gpt3-rocket launch. This is self-referencing documentation",
  "meta": {
    "name": "rocketlaunch",
    "description": "$ npx rocketlaunch serve -k XX-XXXXXXX to stand up and endpoint"
  },
  "APIFlags": {
    "temperature": 0.8
  }
}
```

</details>

## Quickstart

```sh
npx rocketlaunch serve -k XX-XXXXXXX # XX-XXXXXXX is your API Key
```

| Jump To >>                                                     |
| -------------------------------------------------------------- |
| **[setup + config](#install)**                                 |
| **[fast server](#serve-an-endpoint)**                          |
| **[create new gpt3 project](#scaffold-new-project-directory)** |
| **[launch content](#content)**                                 |
| **[postman collection](#postman-collection)**                  |
| **[papers and resources](#papers-&-resources)**                |
| **[todo list](#todo)**                                         |

## Payload

Minimal payload to post **/chat**

**POST**

```json
{
  "prompt": "Who are you?"
}
```

<details><summary>(Bells and whistles:)</summary>

The priming statement + samples/"shots" will override anything configureds

```json
{
  "prompt": "Who are you?",
  "APIFlags": {
    "temperature": 0.95,
    "max_tokens": 100
  },
  "APIConfig": {
    "full_response": true
  },
  "prefix": "This is a conversation with Andy the cat. The cat is sometimes grouchy but is always keen to get more treats. Andy also knocks items off counters. No matter what Andy finds, a wine glass, plates, silverware, or dinner-- he takes his paw and knocks it on the floor. Andy is a handful but tries his best to be a good cat.",
  "samples": [
    [
      "What is an important lesson you've learned?",
      "Don't scratch the people giving you treats"
    ],
    ["What's your best advice?", "If it's in your way knock it over"]
  ]
}
```

</details>

### Install

```sh
npm i -g rocketlaunch
yarn global add rocketlaunch
npx rocketlaunch # No global install
```

### Serve an endpoint

Swap `XX-XXXXXXX` with your API key

Defaults to port 8000, pass credential with the `-k` flag

```sh
rocketlaunch serve -p 5555 -k XX-XXXXXXX
```

<details><summary>(Expand for NPX)</summary>

Using **[npx](https://github.com/npm/npx#readme)**

```sh
npx rocketlaunch serve

npx rocketlaunch serve -p 5555 -k XX-XXXXXXX
```

</details>

## Scaffold new project directory

Swap `XX-XXXXXXX` with your API key

```sh
rocketlaunch create -n my_directory

rocketlaunch create -n my_directory -k XX-XXXXXXX

```

<details><summary>(Expand for NPX)</summary>

Using **[npx](https://github.com/npm/npx#readme)**

```sh
npx rocketlaunch create -n my_directory

npx rocketlaunch create -n my_directory -k XX-XXXXXXX
```

</details>

## Content

```sh
rocketlaunch learn

rocketlaunch resources

```

<details><summary>(Expand for NPX)</summary>

Using **[npx](https://github.com/npm/npx#readme)**

```sh
npx rocketlaunch learn

npx rocketlaunch resources
```

</details>

## Postman Collection

A collection of endpoints is available **[here](https://github.com/valgaze/gpt3rocketlaunch/blob/master/postman_collection.json)**

Instructions on how to import collection available **[here](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)**

## Papers & resources

- **[GPT3 101 (deck)](https://gpt3.valgaze.com)**

- **[Resources (https://github.com/valgaze/gpt3-chat/blob/master/docs/resources.md)](https://github.com/valgaze/gpt3-chat/blob/master/docs/resources.md)**

## Todo

- Break template into own repo & download/clone w/ CLI rather than copying/moving

- Add "GPT3-lab" exerperience: predict some UI code & render it
