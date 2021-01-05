# Pokémon React App #

Using React and Node 12.15.0, please build a Single Page Application according to the wireframes using [create-react-app](https://github.com/facebookincubator/create-react-app#creating-an-app) as a boilerplate. The wireframes are a guideline for main components and layout.

## Includes ##
* React via create-react-app
* node-sass (enables scss)
* Redux installed

## Requirements ##
* Build from the designs in [Invision](https://adkgroup.invisionapp.com/console/share/UYHW742QJWR)
* Single page app -- no react-router required
* Call the API provided in the Resources section of this ReadMe
* Use [Redux](https://redux.js.org/docs/basics/UsageWithReact.html)
* Import libraries (functionality is outlined in the Features section of this ReadMe): 
    * [Recharts](http://recharts.org/#/en-US/examples/SimpleBarChart)
    * [Axios](https://github.com/axios/axios)
    * [Ant Design](https://3x.ant.design/docs/react/introduce)

## Resources ##

* [API Documentation](https://pokeapi.co/docs/v2.html)
* [React Documentation](https://github.com/facebookincubator/create-react-app#creating-an-app)
* [Redux Documentation](https://redux.js.org/docs/basics/UsageWithReact.html)
* [Recharts](http://recharts.org/)
* [Pokémon Types / Color Examples](http://www.pokemongodb.net/2016/04/pokemon-go-types.html)

# Please give the API a second to spin up when you first visit the page!

## Components & Features (User Stories) ##

* As a User, I want to be able to type a Pokémon's name in a search box and have the component show me suggestions of Pokémon in a dropdown selectable list. 
* As a User, when I select a Pokémon from the auto-suggest list I want to see that Pokémon's image, attack, defense, and type(s) in an InfoBox Component. 
    * I want to see a unique color indication (text color, background color, etc) for a specific type of Pokémon.
* As a User, when I select a Pokémon from the auto-suggest list I want to see that Pokémon's basic statistics (attack, defense, stamina) in a BarChart Component.
    * X-axis: statistic name
    * Y-axis: value
    * If a value is >= 50, change the color of the bar to red. 
    * If a value is <50 & >=20, change the color of the bar to yellow. 
    * If a value is <20, change the color of the bar to grey.
* As a User, when I click on the Pokéball near the graph the data will toggle between basic statistics & moves.
* As a User, when I toggle the Pokéball, I want to see that Pokémon's moves and values in a BarChart Component.
    * X-axis: statistic name
    * Y-axis: value
    * If a value is >= 50, change the color of the bar to red. 
    * If a value is <50 & >=20, change the color of the bar to yellow. 
    * If a value is <20, change the color of the bar to grey.

## Show Off ##

These are not required functionalities, but a few examples to show off some advanced skills. 

* Responsiveness -- mobile and/or tablet
* Make the Pokéball using ONLY SCSS
* Make the Pokéball animate (rotate, bounce, grow/shrink, dealer's choice)
* Create a Middleware that triggers an easter egg
    * Intercept the Pokémon type and show an easter egg! 
    * Ex: If a fire Pokémon is selected, make the screen flash red. If an ice Pokémon is selected, overlay the page with snowflakes.
* Game-ify this App!
    * Add a Screen for a game & link to it from the original app. 
    * Give the User 2 random Pokémon by name.
    * Let the User select a sequence of 3 moves out of the total available moves for each Pokémon.
    * Battle the Pokémon... because that's what they do. 
    * Show the victorious and defeated based on the sum of the move power values and the defense of the opposing Pokémon; whoever hits defense = 0 first loses.