# bike-help

This is an app that helps cyclists in need for a quick fix for their bike. Along their way, people encounter common annoying problems like a flat tire or a torn bowden wire. At the same time, there might be people closeby who happen to have a little time and the right tools to help out. Bike Help wants to connect these people and contribute to an active cycling community.
Here are user stories that illustrate its use cases.

## User Story 1: Basic Layout

### Value Proposition

As a user
I want to intuitively understand the layout and where I can access main functions of the app.

### Acceptance Criteria

- a header shows the title of the app and a drop-down menu for additional info and options
- a footer gives access to the three main features - the map, profile and create a new request
- the page looks fine on a small device like a smartphone

### Tasks

- create a placeholder for the map
- create a header with burger-menu and important entries
- create a footer with proper layout and 3 symbols for the main functions
- all links should be clickable and direct to the individual pages

## User Story 2: Map

### Value Proposition

As a user
I want to see the main component of the app, which is the map. I want to be able to move it around and see my location.

### Acceptance Criteria

- a functional map is displayed
- the user can navigate on it
- the layout of the app will not be effected
- the map should accept entries and modifications

### Tasks

- integrate a suitable map solution

## User Story 3: points of interest

### Value Proposition

As a user that has a problem with his/her bike
I want to be able to view public repair stations and DIY workshops as points of intersts on the map and get basic information about them like opening hours and their websites.

### Acceptance Criteria

- markers for points of interest in Berlin show up
- clicking them allows you to view more information
- websites should be linked

### Tasks

- integrate points of interest in database and map

## User Story 4: get help with a broken bike

### Value Proposition

As a user that has a problem with his/her bike
I want to create a help request asking for community support. I want to save the request and it should then be displayed to other users to find me and come to help.

### Acceptance Criteria

- a form for creation, editing and deleting of requests
- a user profile to connect the requests to

### Tasks

- integrate form and database connection for requests

## User Story 4: get help with a broken bike

### Value Proposition

As a user that knows how to fix bikes and has some spare time
I want to view other people's help requests, basic info about them and get their contact data to get in touch with them.

### Acceptance Criteria

- markers for help requests show up
- clicking them allows you to view more information
- a link should lead to the details page, where you can get all details

### Tasks

- render requests on map
- include basic information on popups
- create details page for requests

## User Story 5: request history

### Value Proposition

As a user that has used the app for a while
I want to be able to see my request history and see details for any of them.

### Acceptance Criteria

- profile includes history
- past requests will be shown in a list

### Tasks

- create history
- save solved requests in database
