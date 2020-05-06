# knights-of-coding-proxy

## TL:DR
Adds {'Access-Control-Allow-Origin', '*'} header to Codewars API requests to avoid CORS error 

## Summary 
I create a React App that uses the Codewars API but when viewing on the browser, my API calls were returning a CORS error due to the lack of an 'Access-Control-Allow-Origin' header. Thanks to the following post about ways to alleviate this situation, found at [this medium article](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9), I decided to implement the third recommendation which was to build my own small proxy server.

The app that uses the Codewars API is hosted [at this Netlify link](https://knights-of-coding.netlify.app/) and has its own [Github page, here](https://github.com/drewhsu86/Knights-of-Coding).

## Technical Description
I won't into detail, especially because of how small this app is, but the main differences between my implementation and the Medium article author's is that I used Axios to make the API call (while he used Request) because of my familiarity with Axios. I was able to send back the response.data object to my own app, after adding the Access-Control-Allow-Origin header, and then changed the endpoints in my frontend project.

Further technical details can simply found within the code, because it only consists of one file, [server.js](https://github.com/drewhsu86/knights-of-coding-proxy/blob/master/server.js).

## Notes 

1. Only requires Express and Axios packages. 

2. Three different routes exist for the three different types of API call URL structures I was using from Codewars. If one wanted to make ANY API call from Codewars, they would need to include routes that correctly call the endpoint in the Codewars API that were not included here.
