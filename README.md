# Viator by Majestic Owls
## Team Members
- Jeffrey Chen
- Jim Lee
- Anthony Wong
## Documentation
- [Style Guide](STYLE-GUIDE.md)
- [Contributing](CONTRIBUTING.md)
## Idea 
- A dashboard that gives you information even before you realize you need it
- Enter in your flight, and final destination and we will give you all the information you need to make your trip more enjoyable.
## Stack
- React with Material-UI
- MongoDB through mLabs
- Express
## React Components
- [Index](INDEX.md)
- [Sign-In](SIGNIN.md)
- [DashBoard](DASHBOARD.md)
  - [New Trip](NEWTRIP.md)
  - [Flight Card](FLIGHTCARD.md)
  - [Food Card](FOODCARD.md)
  - [Sights Card](SIGHTSCARD.md)
  - [Weather Card](WEATHERCARD.md)
  - [Navigation Card](NAVIGATIONCARD.md)
  - [Flight-time Card](FLIGHTTIMECARD.md)


MVP
Overhaul [Airyque]
  -Adding landing page with city search
  -scroll down to app

New Cards
  -YelpCard [Alan]
    -Pull 10 ten reviews by city and populate photo, name, rating
    -Click will redirect to external source
    -Save (stars) - to pass onto map
  -TripAdvisorCard [Bill]
    -Pull 10 ten reviews by city and populate photo, name, _______
    -Save (stars) - to pass onto map
  -Map [Agnes]
    -TBD (coordinates, location name)
  -No-login List [Agnes]

Test
  -Jest [Airyque]



POST MVP
  -Yelp (filter button for $,$$)
  -Edit card arrangement. Hide components. Hamburger
  -Login to save lists 
  -Cache for yelp/tripadvisor (cron job? daily)