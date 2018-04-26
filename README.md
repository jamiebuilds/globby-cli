# globby-cli

> User-friendly glob matching CLI

See [globby](https://github.com/sindresorhus/globby)

## Install

```sh
npm install --global globby-cli
```

## Usage

```sh
$ globby "images/*"
images/cat.png
images/dog.jpg
```

```sh
$ globby "images/*" -i "**/*.jpg"
images/cat.png
images/dog.jpg
```

```sh
$ globby "images/**/*" "static/**/*"
images/cat.png
images/dog.jpg
static/cow.gif
static/au/kangaroo.svg
```

```sh
$ globby "images/*" --json
[
  "images/cat.png",
  "images/dog.jpg"
]
```

See `globby --help` for a full list of flags or see the [globby docs](http://github.com/sindresorhus/globby).
