# __NGINX__

This file basically defines the configuration of our nginx server.We are using Nginx service as a load balancer and a proxy server.Hence it takes in the requests sent by the user and diverts them to our express application.

We need to specigy few properties such as :

1. listen - We specify that the Nginx server will be listening on port 80.
2. location - this basically contains information such as where the request needs to be diverted and what requests need to be diverted and what information should the request contain. In order to do so we need to specify parametes such as :  
    - proxy_set_header X-Real-IP : This property is added to our Nginx because the proxy server strips of the user IP address from the request parameters, hence we need to specify the user IP address.

    - proxy_set_header X-Forwarded-For : This property adds the list of all the servers the client has been proxied to.

    - proxy_pass : Since Nginx is acting as a proxy server which diverts the request to our node-app , we need to specify the URL of our node-app. In order to specify the URL we can just give our node-app service name in the URL because Nginx is also a docker container and hence has access to DNS , thus it can get the URL of any other service thats running in our docker containers.

```txt
server{
    listen 80;

    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://node-app:5050;
        proxy_redirect off;
    }
}
```

> location /api -> this basically is helpful in case there is a frontend and backend functionality and we need to only divert request made to the backend which will contain /api in its URL route to our express app and not any other request.
