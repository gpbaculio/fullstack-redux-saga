# fullstack-redux-saga
 APP FEATURES
 - This app uses reactjs + redux on the frontend which is implemented with redux saga and redux optimistic.
   mongoose + express were used in the backend.
![Alt text](https://i.imgur.com/aFvlWhw.png?raw=true "Optional Title")
 - Use this confirmed account to test the app -> email: glenbaculio@gmail.com password: abcd123
1. SIGN UP with Confirmation 
  - a confirmation link will be sent to users' email upon successfully signing up.
  - a user cannot add a todo if not confirmed.
  - for demo purposes, you will not receive an actual email upon signup, confirmation links will only be sent to mailtrap.io
  
2. LOGIN with authentication
 - upon requests, a token must be valid
 
3. ADD/EDIT/DELETE todos
  - a logged in user can add, edit and delete a todo, it can also select multiple todos to complete/unfinish and delete
  - within this features, redux optimistic is implemented
  - a user can filter todos by all, complete, and active
  - by the default, the pagination is set to 9 pages, but when the user adds more than that,
    we increase number per page so the pagination renders pages well.
