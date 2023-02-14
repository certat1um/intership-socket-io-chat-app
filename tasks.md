### Main Tasks:
 - [] Realise simple socket.io working

### Realise simple socket.io working
 - [x] learn about basics of socket connection and emitting events on client and server sides
 - [x] implement socket working between user and server (connection/disconnection to the room and declaring it in database)
 - [x] realise sending messages (one more event)
 - [] realise rendering old messages after entering the room

### [processing...] Логіка роботи сайту
 - [x] Авторизація. Збегаєм токен і айді в сторедж
 - [x] Редірект на сторінку кімнат. Робимо гет реквест на список кімнат з токеном
 - [x] Вибір кімнати. Перехід на сторінку кімнати.
 - [] Фронт посилає запрос на connection з айді кімнати і айді юзера. Бек фіксує це в базі
 - [] Фронт реалізує відправку повідомлення. Бек фіксує це в базі
 - [] Фронт отримує запит на список повідомленнь. Підписується на івент

### To refactor:
 - [] 

### To Ask:
 - how to send Bearer token through headers in response by client
