# API NOTE

### Authentication
> Add headers with: `Bearer XXX`

```java
EX: authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiZ2ciLCJpZCI6MTZ9LCJpYXQiOjE2MDY4MTg1NTR9.o2OuH6b02IJ9AWgudaQGDzexod8s4frpkUrgL0_RtrU'
```

## METHOD

### GET
- Get user
> `http://api.kaito.ninja/user`

- Get all board
> `http://api.kaito.ninja/boards`

- Get 1 board
> `http://api.kaito.ninja/board/6`

- Get all note in board ( EX: board_id = 6 )
> `http://api.kaito.ninja/notes/6`

- Get 1 note in board ( EX: board_id = 6, node_id = 6 )
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
   "name": "Học tập của Tiến",
   "color": "42f5b3"
}
```

---

- Create a note in board ( board_id = 6 )
> `http://api.kaito.ninja/notes/6`
```json
{
   "name": "Docker",
   "color": "42f5b3"
}
```

---

### PUT ( PUT DATA JSON)

> `http://api.kaito.ninja/user/put`

```json
{
   "username": "kaito",
   "password": "kaitoryouga"
}
```
---
- Update name board
> `http://api.kaito.ninja/board/7/put`
```json
{
   "name": "Học tập xyz"
}
```
---
- Update color board
> `http://api.kaito.ninja/board/7/color/put`
```json
{
   "color": "42f5b3"
}
```

---
- Update name note
> `http://api.kaito.ninja/notes/6/6/put`
```json
{
   "name": "Docker Container",
}
```
---
- Update color note
> `http://api.kaito.ninja/notes/6/6/color/put`
```json
{
   "color": "42f5b3",
}
```

---

### DELETE
> `http://api.kaito.ninja/user/delete`

> `http://api.kaito.ninja/board/5/delete`

> `http://api.kaito.ninja/notes/5/5/delete`

---