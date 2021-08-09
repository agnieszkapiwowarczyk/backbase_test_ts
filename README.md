# backbase_test_ts
How it is structured: 

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

1)	We can run the tests in git bash, which should be open in ‘backbase_test_ts’ folder.  

2)	First, we should add ‘node-modules’ folder by adding ‘npm install’ to console 

3)	We can run the tests by adding ‘npm run tests’ to console. 

4)	Before each test a new user is created because after creating and logging out this user cannot login anymore. Originally, I wanted the user to be created in the 'before' section and in the 'before each' section to just log in. 
