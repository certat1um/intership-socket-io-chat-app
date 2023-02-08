### Main Tasks:
 - [] Realise simple socket.io working

### Realise simple socket.io working
 - [x] Login should return string token + login auth (local strategy)
 - [x] Register should return string token (& creating new user)
 - [] Realise storing tokens in cookies (send from backend)
 - [] Realise sending requests with token headers from frontend
 - [] Opening a room suppose new connection in database
 - [] Leaving a room after closing the tab
 - [] 

 - * Walking through pages should be with jwt header, which is taken by client from its cookies

### To refactor:
 - [] 

### To Ask:
 - how frontend should store jwt token and use it in every request (what cookie package to use)
 - to split local auth into login-auth and register-auth strategies to return req.user