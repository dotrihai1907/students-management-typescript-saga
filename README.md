#Project - Student Management

react-router-dom
@types/react-router-dom

/login:
/admin: layout

/admin/*
feature: /admin/dashboard
feature: /admin/students

auth (authentication)
    - login
    - sign up / register
    - forget password

CLICK LOGIN
- call api to login
- success -> redirect admin
- failed -> show error

authSaga
- if logged in, show LOGOUT
- else show LOGIN

LOGIN
- call login api to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT
- clear token from local storage
- redirect to login page