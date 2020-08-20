## gpt3-rocketlaunch

### tl;dr

With **[npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)**:

```sh

npx rocketlaunch -f ~/key.json

npx rocketlaunch -k XX-XXXXXXX -m "make a red button labeled bingo and a green one with bongo"

```

<details><summary>(Without NPX)</summary>

```sh

npm install -g rocketlaunch

rocketlaunch -f ~/key.json

rocketlaunch -k XX-XXXXXXX

rocketlaunch -k XX-XXXXXXX -p 8005 -m "make a red button labled bingo & a green one w/ bongo"
```

</details>

## Usage

```sh

#
# If no NPX, instsall globally (don't pre-pend w/ npx)
# $ npm install -g rocketlaunch
# $ rocketlaunch help
#

## Launch server
## Pass path to JSON

## Pass in file path API Key (key.json has the form {"key":"XX-XXXXXXXX"})
npx rocketlaunch -f ~/Desktop/key.json

## Pass in API Key
npx rocketlaunch -k XX-XXXXXXXX

## Configure port
npx rocketlaunch -k XX-XXXXXXXX -p 2222 -44

## Add endpoint
npx rocketlaunch -k XX-XXXXXXXX -p 2222 -44

## Scaffold a project
npx rocketlaunch create -n my_directory

## Scaffold a project, all other flags
npx rocketlaunch create -n my_directory -f ~/Desktop/key.json

## Pull info
npx rocketlaunch learn

npx rocketlaunch resources

```
