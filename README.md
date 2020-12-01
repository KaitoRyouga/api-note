# API NOTE

## METHOD

### GET
> `http://api.kaito.ninja/user`

> `http://api.kaito.ninja/boards`

> `http://api.kaito.ninja/board/6`

> `http://api.kaito.ninja/notes/6`

> `http://api.kaito.ninja/notes/6/6`

---

### POST ( POST DATA JSON)

> `http://api.kaito.ninja/user`

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
   "name": "Học tập của Tiến"
}
```

---

> `http://api.kaito.ninja/notes/6`
```json
{
   "name": "Docker"
}
```

---

### PUT ( PUT DATA JSON)

> `http://api.kaito.ninja/users`

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
   "name": "Học tập xyz"
}
```

---

> `http://api.kaito.ninja/notes/6`
```json
{
   "name": "Docker Container",
}
```

---

### DELETE
> `http://api.kaito.ninja/users`

> `http://api.kaito.ninja/boards/5`

> `http://api.kaito.ninja/notes/5/5`

---
### Authentication
> Add headers with: `Bearer XXX`

```java
EX: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiZ2ciLCJpZCI6MTZ9LCJpYXQiOjE2MDY4MTg1NTR9.o2OuH6b02IJ9AWgudaQGDzexod8s4frpkUrgL0_RtrU
```