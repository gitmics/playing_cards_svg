# Generating playing cards (SVG)

## Overview
The object of this project was to generate a set of playing cards as SVG images.  It was found that an 'easy' and adaptable way to do this was to use node and JS libraries.

This project used:
* node version 22.13.1
* npm version 11.3.0
Other versions as they are in the package.json file.

## To generate the SVG card files
Clone the project into a directory of your choice.
Change into that directory at the command line.
Ensure that node and npm are installed.  At least the versions detailed above.

### Install Dependencies
npm install

### Generate cards
node generateCardsD3.js

Will generate a full pack of cards as svg files in the current directory.


## Making changes
There is only one file: generateCardsD3.js.
You can change the size of the cards, and you could change the way they are drawn.  You could change the size and type of font used.
There are brief comments in the code that should help to guide where these changes can be made.
