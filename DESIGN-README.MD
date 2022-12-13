# Codedamn Projects - Ticket Master Clone
![main image](https://raw.githubusercontent.com/codedamn-projects/ticket-master-clone/master/designs/Display.png)

## Hello developer!

This is one of the many projects available on [codedamn](https://codedamn.com/projects) to reinforce your learning by building. If you want to become a full stack developer and learn by practicing, feel free to attempt this challenge. Feel free to check out the codedamn [Full Stack Web Development Learning Path](https://codedamn.com/learning-paths/fullstack) to learn more about how to become an awesome full stack developer.


## Instructions

Your challenge is to build out this project and get it looking as close to the design as possible.

You can use **any tools or technologies** you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

### Landing Page 
The landing page will be shown in the `/` route. 

### Sign Up

The following should be implement at the `/Sign Up` route.

![register page](https://raw.githubusercontent.com/codedamn-projects/ticket-master-clone/master/designs/Sign%20Up.png)

### Sign In

The following should be implement in the `/sign-in` route.

![sign in](https://raw.githubusercontent.com/codedamn-projects/ticket-master-clone/master/designs/Sign%20In.png)


### Search Page

This page should be using the route `/search`.

On searching for anything on the `/` page on getting successful data from the API. The user should be redirect to `/search` and the results from the search should be shown. 

![search image](https://raw.githubusercontent.com/codedamn-projects/ticket-master-clone/master/designs/Search.png)

### Details

All the details retrieved from the API can be shown in the drop down menu of the event. 

![details](https://raw.githubusercontent.com/codedamn-projects/ticket-master-clone/master/designs/Details.png)
## API Routes 

You will be using [Ticket master API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) 

Please generate an API Key for using the API

#### [Event Search ](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2)

For finding the events based on the given parameters in the `/` page.

#### [Event Details](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#event-details-v2)

Showing the event details on selecting an event.

### MongoDB user document
```
{
    _id: ObjectId(),
    name: <string>,
    email: <string>,
    password: <string>,
    timestamp: <date>,
    countryOfResidence: <string>,
    zipCode: <number>
}
```

### Ports 
The Codedamn Playgrounds exposes only `1337` and `1338` ports on the internet. So you'll be using `localhost` for connecting to the mongodb instance as they are hosted on the same docker container. You can specify it as `localhost:27017` or simple write `localhost`. 


Want some support on the challenge? [Join our discord community](https://cdm.sh/discord) and ask questions in the **#general** channel.

There is no limit you can go beyond the mentioned criteria and create additional functionalities

## Recommended Technologies 

1. Mongoose for mongodb object modelling and effective type system 
1. Tailwind CSS for User Interface

## Where to find everything

Your task is to build out the project as per the provided screenshots. You will find both a mobile and a desktop version of the design.

The designs are in image formats can be found in `/designs`.

You will find all the required required images in the `/public` folder

## Send feedback!

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please visit [codedamn feedback page](https://codedamn.com/contact)