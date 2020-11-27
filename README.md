# Car shop - a case for Lunicore
This repo contains both a server and a frontend for a car dealer. Due to the fact that it was built in a very short period of time there are still several things that are left to implement. 

* Start server: navigate to the server folder and run `flask run`
* Start client: run `npm start`

## Future development
Down below are some examples of things that are still left to do.

**Security** 
* TLS
* Safe password storage with for example SHA512
* Not store the user credentials in the local store, but instead simply store a unique user token in the local store
* Implement a strong password policy

**Server side**
* Improve some of the SQL scripts to be able to perform fewer transactions and thereby be able to deliver faster responses from the server
* Resolve the CORS issues and implement a safer CORS policy

**Usablity and design**
* Improve the general look of the whole website and strive for a more uniformed design between all components
* Add more functionality to the home page
* Add functionality to be able to log out 
