# Project Name
Wine Not?

## Description

Have you wondered what's your friends favotite's wines? The wait is over. With Wine not, you can add your favorites wines to your personal collection, discover new wines paired to your taste and search the wines of the moment from our curated list. Because, wine not?
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **wine list** - As a user I want to see all the wines available in the website own collection so that I can choose which ones I want to favorite.
- **events detail** - As a user I want to see the wine details (color, sweetness, region and extras) so i can decide if i want to save to my collection. 
- **wine create** - As a user I want to create a wine to my personal collection.
- **wine edit** - As a user I want to edit my wines in my personal collection. 
- **wine delete** - As a user I want to delete my wines in my personal collection. 

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my profile picture
- see other users profile
- wine collection created by the user
- wine favorities by the user

Collection:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage
- /


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form 
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - upload picture
    - username
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /collection
  - renders the collection list + the create new wine form, left side
- POST /collection/create 
  - body: 
          Upload picture
          Name
          Sweetness 
          Region
          Matches to
          Price
          Comment
- GET /collection/:id
  - renders the collection detail page
  - includes the list of wines


## Models

User model
 
```
picture: Image
username: String
password: String
```

Collection model

```

upload picture: {
    type: image,
    unique: true
  }
name: {
    type: String,
    unique: true
  }
sweetness: Dry, Half dry, Medium sweet, Sweet. 
price: (user input)
matches to: (user input)
comment: (user input - place holder: where did you buy it, where's the wine from)
who post it: [ObjectId<User>]
## Links

### Trello

https://trello.com/b/JHIaXrzr/wine

### Git

The url to your repository and to your deployed project

fern1991p/winenot

[Deploy Link](http://heroku.com)

### Slides

https://docs.google.com/presentation/d/1czQQ2nZvZB9IqGBfpCgVvHo4ZIUyTNMUptwq8l1kaPY/edit?usp=sharing

