# HANGMAN

This is a Hangman game created with ES6, Node and Express.js, Bootstrap and Pug. Testing with expect(Jest) and Mocha.

There are two modes: single player and two players, with two players, one chooses a word and an attempts number and the other player tryies to guess it. In this mode, it is possible to write a sentence or different words and there is not spell checking to make it funnier. 

In single mode player has 10 attempts to guess a random word, that is choosen from an array of almost thousend words.

## Screenshots

![screenshots.png](public/images/screenshots.png)

## Getting Started

### Prerequisites

First, and if you don't have, install [Node](https://nodejs.org/en/) in your machine.

I used Nodemon for working, if you want to use copy the line below once installed Node. 

```
npm install -g nodemon
```

### Installing

Copy or download this [repo](https://github.com/MinaZhen/hangman.git)

Open your command line and enter the directory where you want to copy the repository and then enter:

```sh
git clone https://github.com/MinaZhen/hangman.git
```

Navigate into hangman, in package.json level and enter:

```
npm install
```

To see how it's working enter:
```
npm start
```

Done!

## Running the tests

Use the following line to run the tests:

```
npm test
```

This test check the logic functions, directly or indirectly and handle errors.

## Versioning

Hangman 2.0.0

## Authors

- Marina Clarés - *web and videogames developer* - [GitHub](https://github.com/MinaZhen)

Project for: Skylab Coders Academy

