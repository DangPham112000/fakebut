# Build image

```sh
docker build -t dantefarm1411/fakebut_frontend:v1 .
```

# Run container

```sh
docker run -p 8080:5173 dantefarm1411/fakebut_frontend:v1
```

# Source tree explain

-   api: contain functions call backend apis
-   assets: stuff to public
-   helpers: common functions, can be used anywhere
-   utils: functions that can only be used in this project
-   views: contain all views
-   components: all components can be reused

# Todo

-   Create mock api
-   Setup frontend dev only --> will use mock api instead start backend
