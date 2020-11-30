# API NOTE

## METHOD

### GET
> `http://api.kaito.ninja/users`

> `http://api.kaito.ninja/users/6`

> `http://api.kaito.ninja/boards`

> `http://api.kaito.ninja/boards/6`

> `http://api.kaito.ninja/notes`

> `http://api.kaito.ninja/notes/6`

---

### POST ( POST DATA JSON)

> `http://api.kaito.ninja/users`

```json
{
   "username": "kaito",
   "password": "kaitoryouga"
}
```
---

> `http://api.kaito.ninja/boards`
```json
{
   "name": "Học tập của Tiến",
   "user_id": 6
}
```

---

> `http://api.kaito.ninja/notes`
```json
{
   "name": "Docker",
   "board_id": 6,
   "done": 1
}
```

---

### PUT ( PUT DATA JSON)

> `http://api.kaito.ninja/users/9`

```json
{
   "username": "kaito",
   "password": "kaitoryouga"
}
```
---

> `http://api.kaito.ninja/boards/7`
```json
{
   "name": "Học tập xyz",
   "user_id": 1
}
```

---

> `http://api.kaito.ninja/notes/11`
```json
{
   "name": "Docker Container",
   "board_id": 6,
   "done": 1
}
```

---

### DELETE
> `http://api.kaito.ninja/users/5`

> `http://api.kaito.ninja/boards/5`

> `http://api.kaito.ninja/notes/5`

---
### Authentication
> Add headers with: `Bearer XXX`

```java
EX: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYWRtaW4iLCJpYXQiOjE2MDY3MjcyNDJ9.5Z4MGUKX11jnPvKxEdK43wYWBPiHDlsGbEQD1gxNh-o
```