# fbla-competition-coding-programming
 Entry for https://www.fbla-pbl.org/competitive-event/coding-programming/

The application is a [web app](https://en.wikipedia.org/wiki/Web_application) and can therefore act as a website, runnable through the browser. Since it does not depend on a web server to run, it can be run standalone in the browser by opening *index.html* in web browsing software such as Google Chrome, Firefox, or Safari. Future work could include wrapping the application into an [Electron](https://electronjs.org/) app so it can be used as a native desktop application.

## Why a web app?

### Security

### Portability
This program can be run locally as described above, uploaded to a web server and used as a website, or converted to a desktop app with minimal effort using a tool like Electron. This makes it easy to use regardless of where the user is and eliminates the need for dependencies on other software packages; everything that is needed can be loaded dynamically.

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
 - Dashboard page layout: https://getmdl.io/components/index.html#layout-section
 - Adding data to Firebase Cloud Firestore: https://github.com/firebase/snippets-web/blob/cec7d56a58076a5fb6a1fb1de2d65f617d617113/firestore/test.firestore.js#L92-L102
 - Snackbar code: https://getmdl.io/components/index.html#snackbar-section
 - Electron starter code: https://github.com/electron/electron-quick-start/blob/master/main.js

## Database

 - Uses Cloud Firestore database included with Firebase by Google: https://firebase.google.com/
 - Database Structure
   - /students
     - /name
     - /grade
     - /hours
 - Cloud Firestore location: nam5 (us-central)

## Other Software Used

Software not included in the program itself, but used to create it.

### Atom

The best text editor ever, with full customization, incredible package manager, autofilling snippets, Git integration, and much more.

### Google Chrome

Web browser used for most testing.

### Git

Version control & file tracking.
