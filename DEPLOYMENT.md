# LumixPlay Deployment

## Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Set the project root directory to `frontend`.
3. Add this environment variable:

```text
REACT_APP_API_URL=https://your-render-api.onrender.com/api
```

4. Deploy.

The root URL opens the single recruiter login portal. Use the role tabs for User or Admin.

## Backend on Render

1. Import the GitHub repo into Render.
2. Use the `render.yaml` blueprint, or create a Web Service manually.
3. If creating manually:

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: python manage.py migrate && python manage.py seed_lumixplay && gunicorn config.wsgi:application
```

4. Set environment variables:

```text
DEBUG=False
SECRET_KEY=<generate a secure value>
ALLOWED_HOSTS=.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000
```

After both deploys, update Render's `CORS_ALLOWED_ORIGINS` with the real Vercel URL, and update Vercel's `REACT_APP_API_URL` with the real Render URL.

## Demo Credentials

```text
User: user@lumixplay.com / user123
Admin: admin@lumixplay.com / admin123
```
