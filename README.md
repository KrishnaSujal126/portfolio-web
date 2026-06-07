# Portfolio Web

This project is a full-stack portfolio website that uses a static frontend together with a Node.js/Express backend and MongoDB.

## Features

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: MongoDB via Mongoose
- Dynamic project and certificate data from the API
- Contact form stored in MongoDB

## Setup

1. Copy `.env.example` to `.env`
2. Add your MongoDB connection string to `MONGODB_URI`
3. Install dependencies:

```bash
npm install
```

4. Seed the database:

```bash
npm run seed
```

5. Start the server:

```bash
npm start
```

6. Visit:

```bash
http://localhost:5000
```

## Deployment

### Railway (recommended)

1. Create a GitHub repository and push your project:

```bash
git init
git add .
git commit -m "Initial full-stack portfolio"
git branch -M main
# replace <your-repo-url> with your GitHub repo URL
git remote add origin <your-repo-url>
git push -u origin main
```

2. Open Railway and create a new project.
3. Connect the project to your GitHub repository.
4. For the service, choose **Deploy from GitHub** and select your repo.
5. Set the environment variable in Railway:

```text
MONGODB_URI=your-mongodb-connection-string
```

6. Railway should detect the Node app automatically.
   - Build command: `npm install`
   - Start command: `npm start`
7. Deploy the project.
8. Use `npm run seed` locally to seed the database before or after deployment, or run a one-off Railway job if you prefer.

### Other platforms

- **Heroku** also works, but Railway is simpler for full-stack Node + MongoDB.
- **Render** is another good option and can use the same settings.

### Notes

- Keep `.env` out of source control.
- The project serves both frontend and backend from the same Express app.
