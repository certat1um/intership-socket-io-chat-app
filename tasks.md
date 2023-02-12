### Main Tasks:
 - [] Realise simple socket.io working

### Realise simple socket.io working
 - [x] Login should return string token
 - [x] Register should return string token
 - [x] Realise storing tokens in localStorage
 - [] Opening a room. Via localStorage token. Suppose new emit connection to database
 - [] Leaving a room after closing the tab

### Todo:
 - [] learn about basics of socket connection and emitting events on client and server sides
 - [] implement socket working between user and server (connection/disconnection to the room and declaring it in database)
 - [] realise sending messages (one more event)
 - [] realise rendering old messages after entering the room

### Логіка роботи сайту
 - [x] Авторизація. Збегаєм токен і айді в сторедж
 - [x] Редірект на сторінку кімнат. Робимо гет реквест на список кімнат з токеном
 - [x] Вибір кімнати. Перехід на сторінку кімнати.
 - [] Фронт посилає запрос на connection з айді кімнати і айді юзера. Бек фіксує це в базі
 - [] Фронт реалізує відправку повідомлення. Бек фіксує це в базі
 - [] Фронт отримує запит на список повідомленнь. Підписується на івент

### To refactor:
 - [] auth.js on client side (external imports)

### To Ask:
 - how to send Bearer token through headers in response by client
