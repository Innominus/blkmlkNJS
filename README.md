## NextJS app for COVID check ins!
This app was made for BLK MLK Cafe in Mildura. 

The goal behind the app was to quickly learn JS, Next and React and turn around a production ready app as fast as possible.

The initial page is located in pages/index.js, with the API/backend page used on Vercel with NextJS is located in my-mongodb-api/mongodb.js and pages/api/payload.js

There are also different pages you will be routed to on successful sign-in or an unsuccessful sign-in (unsuccessful sign-in will happen always now as the mongodb instance is not online)

Although I can definitely see room for improvement with naming conventions, code organisation and refactoring improvements, this was done within a short timeframe and has proven to be successful as it was used in production for months before the Government changed their rulings around custom private COVID check-in applications.

This web application uses a few packages as well, these include:
- Luxon; for date and time formatting
- Formik; for form management
- Axios; to create a promise based HTTP client 
- framer-motion; for animations
- mongodb/monk; for mongodb databasing and syntactic sugar
- next; for simplified app creation, hosting, routing
- react; utilising the react framework to build the UI
- tailwindcss; easier creation of UI design using the tailwindcss framework
- yup; for form validation
