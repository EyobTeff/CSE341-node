# Google OAuth Setup Instructions

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Add **Authorized redirect URIs**:
   - For local: `http://localhost:8080/auth/google/callback`
   - For production: `https://cse341-node-bl9i.onrender.com/auth/google/callback`
7. Copy your **Client ID** and **Client Secret**

## Step 2: Update Environment Variables

### Local Development (.env file)
```
GOOGLE_CLIENT_ID=your-client-id-from-google
GOOGLE_CLIENT_SECRET=your-client-secret-from-google
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
CLIENT_URL=http://localhost:8080
SESSION_SECRET=8f9a2b7e4d1c6f3a9b5e8d2c7f4a1b9e6d3c8f5a2b7e4d1c9f6a3b8e5d2c7f4a
```

### Render (Production)
Add these environment variables in Render dashboard:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL=https://cse341-node-bl9i.onrender.com/auth/google/callback`
- `CLIENT_URL=https://cse341-node-bl9i.onrender.com`
- `SESSION_SECRET=8f9a2b7e4d1c6f3a9b5e8d2c7f4a1b9e6d3c8f5a2b7e4d1c9f6a3b8e5d2c7f4a`

## Step 3: Test OAuth Flow

1. Start server: `npm start`
2. Visit: `http://localhost:8080/auth/google`
3. Sign in with Google
4. You'll be redirected to `/auth/login/success`
5. Use the authenticated session to access protected routes

## OAuth Endpoints

- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - OAuth callback (automatic)
- `GET /auth/login/success` - Returns user data after login
- `GET /auth/login/failed` - Returns error if login fails
- `GET /auth/logout` - Logout current user
- `GET /auth/user` - Get current authenticated user

## Protected Routes

These routes require OAuth authentication:
- `POST /players`
- `PUT /players/:id`
- `DELETE /players/:id`
- `POST /teams`
- `PUT /teams/:id`
- `DELETE /teams/:id`
- `POST /matches`
- `PUT /matches/:id`
- `DELETE /matches/:id`
