# User auth using passport local strategy, express-session & mongo-connect

1. Clone repo
```console
git clone https://github.com/lu-perez/Auth-passport-local-strategy.git
```

2. Install dependencies
```
npm install
```

3. Create & set __.env__ file, example:
```
MONGODB_URI='mongodb://127.0.0.1:27017/user_auth'
SESSION_SECRET='secret'
```

4. Run MongoDB
```console
mongod
```

5. Run app
```console
npm start
```

* run dev mode:
```console
npm run dev
```

6. Run linter
```console
npm run lint
```

* fix:
```console
npm run lint:fix
```
