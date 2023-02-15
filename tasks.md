### Main Tasks:
 - [] Realise simple socket.io working
 - [] Read/Install Docker
 - [] Read/Install Redis

### Realise simple socket.io working
 - [x] learn about basics of socket connection and emitting events on client and server sides
 - [x] implement socket working between user and server (connection/disconnection to the room and declaring it in database)
 - [x] realise sending messages (one more event)
 - [] how to find correct user in localstorage token
 - [] refactor joining/leaving the room
 - [] refactor sending messages with different users (via jwt localstorage)

### [processing...] Логіка роботи сайту
 - [x] Авторизація. Збегаєм токен і айді в сторедж
 - [x] Редірект на сторінку кімнат. Робимо гет реквест на список кімнат з токеном
 - [x] Вибір кімнати. Перехід на сторінку кімнати.
 - [] Фронт посилає запрос на приєднання до кімнати. Бек це фіксує в базі
 - [] Фронт реалізує відправку повідомлення. Бек фіксує це в базі
 - [] Фронт отримує запит на список повідомленнь. Підписується на івент

### To refactor:
 - [] 

### To Ask:
 - 
