# backbase_test_ts
My structure: 

├── lib/

├── pages/ 

├── tests/ 

└── config.ts 

lib: Think of this as a "framework". Ideally should be a separate module distributed on npm 

pages: These are Page Object models. Each Page of application should have a PageObject that maps all the elements and actions 

tests: All tests 

config.ts: General configuration and settings that are read by tests 

**************************************************************************************************************************************

HOW RUN TESTS:
* Remember - you shoud have install typescript chromedriver.

* We can run the tests in terminal, which should be open in ‘backbase_test_ts’ folder.  

1)	First, we need install all required dependencies:
```
npm install
```

2)	Run the tests in console:
```
npm run tests
```

Before each test a new user is created because after creating and logging out this user cannot login anymore. Originally, I wanted the user to be created in the 'before' section and in the 'before each' section to just log in. 
