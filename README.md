# fbla-competition-coding-programming
 Entry for https://www.fbla-pbl.org/competitive-event/coding-programming/

The application is a [web app](https://en.wikipedia.org/wiki/Web_application) and can therefore act as a website, runnable through the browser. Since it does not depend on a web server to run, it can be run standalone in the browser by opening *index.html* in web browsing software such as Google Chrome, Firefox, or Safari. Future work could include wrapping the application into an [Electron](https://electronjs.org/) app so it can be used as a native desktop application.

## Languages

This tool is coded as a web application and uses the following programming and markup languages to function.

### HTML
Markup language used to provide the structure of a website or web application; the "skeleton" of the program.

### CSS
Markup language that changes the styling of HTML elements; the "paint" applied to make websites look better.

### JavaScript
Scripting language used for dynamic content and interactive functionality.

### JSON
A data serialization language used in Firebase databases.

## Pages

 - Home (index.html) - main and default page
 - Login (login.html) - used to log into the application
 - Register (register.html) - account creation page

## Libraries

### Material Design Lite
Responsive web design framework by Google

### Firebase
Application backend and database tool, also by Google

Provides:
- Database (see below)
- Authentication
- Crash reporting

### jQuery
Multi-purpose JavaScript library

## Snippets

 - Email address-matching regular expression: https://stackoverflow.com/a/742455
 - Center login field on page: https://stackoverflow.com/a/47783851

## Database

 - Uses Cloud Firestore database included with Firebase by Google: https://firebase.google.com/
 - Database Structure
   - /students
     - /name
     - /grade
     - /hours
 - Cloud Firestore location: nam5 (us-central)
