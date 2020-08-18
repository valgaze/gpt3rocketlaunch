## GPT3 Rocketlaunch 🔥🔥🔥🚀

```
tl:dr; Little helper CLI to very quckily scaffold projects & prototype interactions with language models
```

Tool to get you up & running **fast** with **[gpt3-rocket](https://github.com/gpt3rocket)** & conversational agents

## Quickstart

```sh
npx rocketlaunch serve -c XX-XXXXXXXXXXXXXXXXX # XX-XXXXXXXXXXXXXXXXX is your API Key
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
    [
      "What's your best advice?",
      "If you don't ask for treats you don't get treats:"
    ]
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

Swap `XX-XXXXXXXXXXXXXXXXX` with your API key

Defaults to port 8000, pass credential with `-c` flag

```sh
rocketlaunch serve

rocketlaunch serve -p 5555 -c XX-XXXXXXXXXXXXXXXXX
```

<details><summary>(Expand for NPX)</summary>

Using **[npx](https://github.com/npm/npx#readme)**

```sh
npx rocketlaunch serve

npx rocketlaunch serve -p 5555 -c XX-XXXXXXXXXXXXXXXXX
```

</details>

## Scaffold new project directory

Swap `XX-XXXXXXXXXXXXXXXXX` with your API key

```sh
rocketlaunch -n my_directory

rocketlaunch -n my_directory -c XX-XXXXXXXXXXXXXXXXX

```

<details><summary>(Expand for NPX)</summary>

Using **[npx](https://github.com/npm/npx#readme)**

```sh
npx rocketlaunch -n my_directory

npx rocketlaunch -n my_directory -c XX-XXXXXXXXXXXXXXXXX
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
