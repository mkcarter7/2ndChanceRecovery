# Railway Deployment Guide

This guide will help you deploy the 2nd Chance Recovery website to Railway with separate services for backend and frontend.

## Prerequisites

Before you begin, make sure you have:

- ✅ A Railway account ([sign up here](https://railway.app))
- ✅ Your GitHub repository connected to Railway
- ✅ Firebase credentials file (`firebase-credentials.json`)
- ✅ Firebase web app configuration (for frontend)

---

## Part 1: Backend Service Setup

### Step 1: Create Railway Project and Add Backend Service

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `2ndChanceRecovery` repository
5. Railway will create a new service automatically
6. **Important:** Click on the service, then go to **Settings** → **Root Directory**
7. Set the root directory to: `backend`
8. Railway will automatically detect it's a Django project using the `nixpacks.toml` file

### Step 2: Add PostgreSQL Database

1. In your Railway project dashboard, click **"New"** button
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically set and shared with your backend service
5. **Note:** You don't need to manually set `DATABASE_URL` - Railway handles this automatically

### Step 3: Configure Backend Environment Variables

1. Click on your **backend service** in Railway
2. Go to the **"Variables"** tab
3. Add the following environment variables:

#### ✅ Required Variables

- **`SECRET_KEY`**
  - Value: Generate a strong random key
  - How to generate: Run `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`

- **`DEBUG`**
  - Value: `False`
  - Note: Always set to `False` in production

- **`FIREBASE_CREDENTIALS_PATH`**
  - Value: `firebase-credentials.json`
  - Note: Path to Firebase credentials file

#### ⚠️ Optional Variables (for custom domain and CORS)

- **`RAILWAY_PUBLIC_DOMAIN`**
  - Value: `your-backend.railway.app`
  - Note: Your Railway-generated domain (set after first deploy)

- **`CUSTOM_DOMAIN`**
  - Value: `api.yourdomain.com`
  - Note: Your custom domain (if using)

- **`FRONTEND_URL`**
  - Value: `https://your-frontend.railway.app`
  - Note: Frontend URL for CORS (set after frontend deploy)

- **`CORS_ALLOWED_ORIGINS`**
  - Value: Comma-separated list of allowed origins (e.g., `https://app1.com,https://app2.com`)
  - Note: Additional CORS origins beyond FRONTEND_URL (optional)

### Step 4: Upload Firebase Credentials

You have two options for Firebase credentials:

#### Option A: Upload as File (Recommended)

1. In your backend service, go to the **"Files"** tab
2. Click **"Upload File"** or drag and drop
3. Upload your `firebase-credentials.json` file from your local computer
4. The file will be available at the root of your backend directory
5. Make sure `FIREBASE_CREDENTIALS_PATH=firebase-credentials.json` is set in Variables

#### Option B: Paste JSON as Environment Variable

1. Open your local `firebase-credentials.json` file
2. Copy the entire JSON file content (all the text inside the file)
3. In Railway Variables (backend service), add:
   - **Key:** `FIREBASE_CREDENTIALS_JSON`
   - **Value:** Paste the entire JSON file content here
4. You'll need to update your code to read from this variable (not currently implemented)

> **💡 Recommendation:** Use Option A (file upload) as it's simpler and already supported by your code.

### Step 5: Deploy Backend

Railway will automatically start deploying when you:
- Connect the repository
- Set the root directory
- Push changes to your GitHub repository

**Deployment process:**
1. ✅ Install Python dependencies from `requirements.txt`
2. ✅ Run database migrations automatically (via `nixpacks.toml`)
3. ✅ Collect static files automatically
4. ✅ Start the server using Gunicorn

**After deployment:**
- Monitor the deployment in the **"Deployments"** tab
- Once deployed, Railway will provide a public URL (e.g., `your-backend.railway.app`)
- **📋 Copy this URL** - you'll need it for the frontend configuration

### Step 6: Verify Backend Deployment

1. Visit your backend URL: `https://your-backend.railway.app/admin`
2. You should see the Django admin login page (or API endpoints if configured)
3. Check the **"Logs"** tab for any errors
4. If you see database errors, you may need to run migrations manually (see Troubleshooting)

---

## Part 2: Frontend Service Setup

### Step 7: Add Frontend Service

1. In your Railway project dashboard, click **"New"** button
2. Select **"GitHub Repo"**
3. Choose the **same repository** (`2ndChanceRecovery`)
4. Railway will create a new service
5. Click on the new service, go to **Settings** → **Root Directory**
6. Set the root directory to: `frontend`
7. Railway will detect it's a React app using the `nixpacks.toml` file

### Step 8: Configure Frontend Environment Variables

1. Click on your **frontend service** in Railway
2. Go to the **"Variables"** tab
3. Add the following environment variables:

#### ✅ Required Variables

- **`REACT_APP_API_URL`**
  - Value: `https://your-backend.railway.app/api`
  - Note: Replace with your actual backend URL from Step 5

- **`REACT_APP_FIREBASE_API_KEY`**
  - Value: Your Firebase API Key
  - Where to find: Firebase Console → Project Settings

- **`REACT_APP_FIREBASE_AUTH_DOMAIN`**
  - Value: Your Firebase Auth Domain
  - Example: Usually `your-project.firebaseapp.com`

- **`REACT_APP_FIREBASE_PROJECT_ID`**
  - Value: Your Firebase Project ID
  - Note: Your Firebase project ID

- **`REACT_APP_FIREBASE_STORAGE_BUCKET`**
  - Value: Your Firebase Storage Bucket
  - Example: Usually `your-project.appspot.com`

- **`REACT_APP_FIREBASE_MESSAGING_SENDER_ID`**
  - Value: Your Firebase Messaging Sender ID
  - Where to find: Firebase Console

- **`REACT_APP_FIREBASE_APP_ID`**
  - Value: Your Firebase App ID
  - Where to find: Firebase Console

> **📋 Where to find Firebase config:**
> 1. Go to [Firebase Console](https://console.firebase.google.com/)
> 2. Select your project
> 3. Click the gear icon → **Project Settings**
> 4. Scroll down to **"Your apps"** section
> 5. Click on the web app (or create one)
> 6. Copy the configuration values

### Step 9: Deploy Frontend

Railway will automatically start deploying.

**Deployment process:**
1. ✅ Install Node.js dependencies from `package.json`
2. ✅ Build the React app (`npm run build`)
3. ✅ Serve the static files using `serve`

**After deployment:**
- Monitor the deployment in the **"Deployments"** tab
- Once deployed, Railway will provide a public URL (e.g., `your-frontend.railway.app`)
- **📋 Update backend CORS settings:**
  - Go back to your backend service
  - Add/update the `FRONTEND_URL` variable with your frontend URL
  - Redeploy the backend if needed

### Step 10: Verify Frontend Deployment

1. Visit your frontend URL: `https://your-frontend.railway.app`
2. The React app should load
3. Test authentication and API calls
4. Check the browser console for any errors
5. Check Railway logs if there are issues

---

## Part 3: Post-Deployment Setup

### Step 11: Run Initial Database Setup (if needed)

If migrations didn't run automatically or you need to create initial data:

#### Using Railway Dashboard:
1. Go to your backend service
2. Click on **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"** to see if migrations ran successfully

#### Using Railway CLI:
```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migrations
railway run python manage.py migrate

# Create initial SiteSettings (if needed)
railway run python manage.py shell -c "from api.models import SiteSettings; SiteSettings.objects.get_or_create(pk=1)"
```

### Step 12: Create Django Superuser (Optional)

If you need admin access:

```bash
railway run python manage.py createsuperuser
```

Follow the prompts to create an admin user.

---

## Part 4: Custom Domain Setup (Optional)

### Step 13: Set Up Custom Domain for Backend

1. In Railway, go to your **backend service**
2. Click **"Settings"** → **"Domains"**
3. Click **"Custom Domain"**
4. Enter your domain (e.g., `api.yourdomain.com`)
5. Railway will provide DNS records to add
6. Update your DNS provider (GoDaddy, etc.) with these records
7. Wait for DNS propagation (can take up to 24 hours, usually much faster)
8. Update `CUSTOM_DOMAIN` environment variable with your custom domain

### Step 14: Set Up Custom Domain for Frontend

1. In Railway, go to your **frontend service**
2. Click **"Settings"** → **"Domains"**
3. Click **"Custom Domain"**
4. Enter your domain (e.g., `yourdomain.com` or `www.yourdomain.com`)
5. Railway will provide DNS records to add
6. Update your DNS provider with these records
7. Update `REACT_APP_API_URL` in frontend variables if backend also uses custom domain

### Step 15: Update GoDaddy DNS (Example)

If using GoDaddy:

1. Log into GoDaddy
2. Go to **DNS Management** for your domain
3. Add CNAME records:
   - **For backend API:**
     - Type: `CNAME`
     - Name: `api` (or `backend`)
     - Value: `your-backend.railway.app` (Railway-provided domain)
     - TTL: `600` seconds
   - **For frontend:**
     - Type: `CNAME`
     - Name: `@` (for root domain) or `www`
     - Value: `your-frontend.railway.app` (Railway-provided domain)
     - TTL: `600` seconds
4. Save changes and wait for propagation

---

## Troubleshooting

### Backend Issues

#### 🔴 Database Connection Issues

**Problem:** `django.db.utils.OperationalError: could not connect to server`

**Solution:**
- Verify PostgreSQL service is running in Railway
- Check that `DATABASE_URL` is automatically set (Railway handles this)
- Ensure backend service is connected to PostgreSQL service (check service dependencies)

#### 🔴 Static Files Not Loading

**Problem:** CSS/JS files return 404

**Solution:**
- Check that `collectstatic` ran during build (check deployment logs)
- Verify `whitenoise` is in `INSTALLED_APPS` and `MIDDLEWARE` (already configured)
- Manually run: `railway run python manage.py collectstatic --noinput`

#### 🔴 Migrations Not Running

**Problem:** Database tables missing

**Solution:**
- Check deployment logs to see if migrations ran
- Manually run: `railway run python manage.py migrate`
- Verify `nixpacks.toml` includes migration step (already configured)

#### 🔴 Firebase Authentication Issues

**Problem:** `FileNotFoundError: firebase-credentials.json`

**Solution:**
- Verify `firebase-credentials.json` is uploaded in Railway Files tab
- Check `FIREBASE_CREDENTIALS_PATH` environment variable is set correctly
- Ensure file is in the backend root directory
- Check file permissions in Railway

#### 🔴 CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Add `FRONTEND_URL` environment variable in backend with your frontend URL
- Or temporarily set `CORS_ALLOW_ALL_ORIGINS=True` in settings.py for testing (not recommended for production)
- Verify frontend URL matches exactly (including https://)

### Frontend Issues

#### 🔴 Build Failures

**Problem:** Build fails with errors

**Solution:**
- Check that all environment variables are set (especially `REACT_APP_*` variables)
- Verify Node.js version compatibility
- Check build logs for specific error messages

#### 🔴 API Connection Errors

**Problem:** `Network Error` or `Failed to fetch`

**Solution:**
- Verify `REACT_APP_API_URL` is set correctly with full URL (including https://)
- Check backend is running and accessible
- Verify CORS is configured correctly on backend
- Test backend URL directly in browser

#### 🔴 Firebase Configuration Errors

**Problem:** Firebase not initializing

**Solution:**
- Verify all `REACT_APP_FIREBASE_*` environment variables are set
- Check Firebase console for correct values
- Ensure Firebase project has web app configured
- Check browser console for specific Firebase errors

### General Issues

#### 🔴 Service Not Starting

**Solution:**
- Check Railway logs for error messages
- Verify all required environment variables are set
- Check that root directory is set correctly
- Ensure build completed successfully

#### 🔴 Port Binding Issues

**Solution:**
- Railway automatically sets `$PORT` environment variable
- Ensure your start command uses `$PORT` (already configured in nixpacks.toml)

#### 🔴 Environment Variables Not Updating

**Solution:**
- After changing environment variables, Railway should automatically redeploy
- If not, manually trigger a redeploy
- Clear browser cache if frontend changes aren't showing

## 🛠️ Railway CLI (Optional)

Install Railway CLI for easier management:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Deploy
railway up
```

---

## Environment Variables Reference

### Backend Service Variables

- **`SECRET_KEY`** ✅ Required
  - Description: Django secret key
  - Example: Generated random string

- **`DEBUG`** ✅ Required
  - Description: Debug mode (always False in production)
  - Example: `False`

- **`DATABASE_URL`** ✅ Auto-set
  - Description: PostgreSQL connection URL
  - Note: Auto-set by Railway

- **`FIREBASE_CREDENTIALS_PATH`** ✅ Required
  - Description: Path to Firebase credentials file
  - Example: `firebase-credentials.json`

- **`RAILWAY_PUBLIC_DOMAIN`** ⚠️ Optional
  - Description: Railway-generated domain
  - Example: `backend-xxxx.railway.app`

- **`CUSTOM_DOMAIN`** ⚠️ Optional
  - Description: Custom domain for backend
  - Example: `api.yourdomain.com`

- **`FRONTEND_URL`** ⚠️ Optional
  - Description: Frontend URL for CORS
  - Example: `https://your-frontend.railway.app`

- **`CORS_ALLOWED_ORIGINS`** ⚠️ Optional
  - Description: Additional CORS allowed origins (comma-separated)
  - Example: `https://app1.com,https://app2.com`

### Frontend Service Variables

- **`REACT_APP_API_URL`** ✅ Required
  - Description: Backend API base URL
  - Example: `https://your-backend.railway.app/api`

- **`REACT_APP_FIREBASE_API_KEY`** ✅ Required
  - Description: Firebase API key
  - Where to find: From Firebase Console

- **`REACT_APP_FIREBASE_AUTH_DOMAIN`** ✅ Required
  - Description: Firebase auth domain
  - Example: `project.firebaseapp.com`

- **`REACT_APP_FIREBASE_PROJECT_ID`** ✅ Required
  - Description: Firebase project ID
  - Example: `your-project-id`

- **`REACT_APP_FIREBASE_STORAGE_BUCKET`** ✅ Required
  - Description: Firebase storage bucket
  - Example: `project.appspot.com`

- **`REACT_APP_FIREBASE_MESSAGING_SENDER_ID`** ✅ Required
  - Description: Firebase messaging sender ID
  - Example: Numeric ID

- **`REACT_APP_FIREBASE_APP_ID`** ✅ Required
  - Description: Firebase app ID
  - Example: Alphanumeric ID

> **⚠️ Important:** All `REACT_APP_*` variables must be set before building. Changes require a rebuild.

## 📝 Additional Notes

- ✅ Railway automatically provides HTTPS
- ✅ Static files are served via WhiteNoise
- ⚠️ Media files should be stored in cloud storage (S3, Cloudinary) for production
- 💡 Consider setting up a CDN for static assets in production
