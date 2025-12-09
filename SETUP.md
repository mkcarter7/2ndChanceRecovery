# Quick Setup Guide

## Prerequisites

- Python 3.8+ installed
- Node.js 14+ and npm installed
- Firebase account (free tier is fine)
- Git installed (for version control)

## Step-by-Step Setup

### 0. Git Repository Setup and GitHub Connection

#### Step 1: Initialize Git Repository

```bash
# Navigate to project root directory
cd 2ndChanceRecovery

# Initialize git repository (if not already initialized)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: 2nd Chance Recovery website"
```

#### Step 2: Create Repository on GitHub

1. **Go to GitHub:**
   - Open your web browser and go to [https://github.com/new](https://github.com/new)
   - Make sure you're logged into your GitHub account

2. **Create New Repository:**
   - **Repository name**: Enter a name (e.g., "2ndChanceRecovery" or "2nd-chance-recovery")
   - **Description**: (Optional) Add a description like "Website for 2nd Chance Recovery Center"
   - **Visibility**: Choose Public or Private
   - **IMPORTANT**: Do NOT check any of these boxes:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - Click the green **"Create repository"** button

3. **Copy Repository URL:**
   - After creating the repository, GitHub will show you a page with setup instructions
   - Copy the HTTPS URL (it will look like: `https://github.com/YOUR_USERNAME/REPO_NAME.git`)
   - You'll need this in the next step

#### Step 3: Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME with your actual GitHub username and repository name)
# Example: git remote add origin https://github.com/johndoe/2ndChanceRecovery.git
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Verify the remote was added correctly
git remote -v

# Rename branch to 'main' (GitHub uses 'main' as default)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**If you get authentication errors:**
- You may need to use a Personal Access Token instead of password
- Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
- Generate a new token with `repo` permissions
- Use the token as your password when pushing

#### Step 4: Verify Upload

- Go back to your GitHub repository page
- You should see all your project files listed
- The `.env` and `firebase-credentials.json` files should NOT appear (they're in `.gitignore`)

**Important Security Notes:**
- ✅ The `.gitignore` file is already configured to exclude sensitive files
- ✅ Never commit `.env` files or Firebase credentials to GitHub
- ✅ If you accidentally committed sensitive files, remove them:
  ```bash
  git rm --cached backend/.env backend/firebase-credentials.json frontend/.env
  git commit -m "Remove sensitive files from git"
  git push origin main
  ```

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
# Recommended: Use your project folder name (e.g., "2ndChanceRecovery")
python -m venv 2ndChanceRecovery

# Alternative: Use default name "venv"
# python -m venv venv

# Activate virtual environment
# On Windows (using project folder name):
2ndChanceRecovery\Scripts\activate
# On Windows (if using default "venv"):
# venv\Scripts\activate

# On Mac/Linux (using project folder name):
source 2ndChanceRecovery/bin/activate
# On Mac/Linux (if using default "venv"):
# source venv/bin/activate

# If you already created "venv" and want to change it:
# 1. Deactivate current environment: deactivate
# 2. Delete the old venv folder: rmdir /s venv  (Windows) or rm -rf venv  (Mac/Linux)
# 3. Create new one with project name: python -m venv 2ndChanceRecovery
# 4. Activate the new one: 2ndChanceRecovery\Scripts\activate  (Windows) or source 2ndChanceRecovery/bin/activate  (Mac/Linux)

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
# Edit .env with your settings
# Example backend/.env content:
# SECRET_KEY=django-insecure-change-this-to-a-random-secret-key-in-production
# DEBUG=True
# FIREBASE_CREDENTIALS_PATH=firebase-credentials.json

# Run migrations
python manage.py makemigrations
python manage.py migrate

# (Optional) Create superuser for Django admin
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Google" (this is required for admin login)
   - Set your support email
   - Save the changes
4. Get Web App Config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click web icon (</>) to add web app
   - Copy the config values
5. Get Service Account Key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file
   - Update `FIREBASE_CREDENTIALS_PATH` in backend `.env`

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit .env with your Firebase config values
# Example frontend/.env content:
# REACT_APP_API_URL=http://localhost:8000/api
# REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
# REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# REACT_APP_FIREBASE_PROJECT_ID=your-project-id
# REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
# REACT_APP_FIREBASE_APP_ID=your-app-id

# Start development server
npm start
```

Frontend will run on `http://localhost:3000`

### 4. Enable Google Sign-In and Create Admin User

1. **Enable Google Sign-In Provider:**
   - Go to Firebase Console > Authentication > Sign-in method
   - Click on "Google" provider
   - Enable it and set your support email
   - Save the changes

2. **Add Admin Users:**
   - Go to Firebase Console > Authentication > Users
   - Click "Add user" 
   - Enter the email address of the admin (must be a Google account)
   - Set a temporary password (user will use Google Sign-In, not password)
   - OR simply allow users to sign in with Google and manually verify admin emails in your Firebase project

3. **Sign In:**
   - Go to `/admin/login` on your website
   - Click "Sign in with Google"
   - Use a Google account that has been added to Firebase Authentication

### 5. Initial Data Setup

After logging into admin panel:

1. **Site Settings**: Go to Site Settings tab and customize:
   - Colors (already set to black, gray, white, red)
   - Hero title and subtitle
   - Contact information
   - About content

2. **Add Programs**: Go to Programs tab and add recovery programs

3. **Add Housing**: Go to Housing tab and add housing options

4. **Add Reviews**: Go to Reviews tab and add testimonials
   - Check "Approved" to show publicly
   - Check "Featured" to show on homepage

## Troubleshooting

### Backend Issues

- **Import errors**: Make sure virtual environment is activated
- **Database errors**: Run `python manage.py migrate` again
- **Firebase auth errors**: Check that `FIREBASE_CREDENTIALS_PATH` is correct

### Frontend Issues

- **Build errors**: Delete `node_modules` and run `npm install` again
- **API connection errors**: Make sure backend is running on port 8000
- **Firebase errors**: Verify all Firebase config values in `.env` are correct

### Common Issues

- **CORS errors**: Backend CORS is configured for `localhost:3000`. If using different port, update `CORS_ALLOWED_ORIGINS` in `backend/recovery_center/settings.py`
- **Authentication not working**: Verify Firebase project has Email/Password auth enabled
- **Images not uploading**: Make sure `media/` directory exists in backend and has write permissions

## Git Workflow (After Initial Setup)

When making changes:

```bash
# Check status of changes
git status

# Add specific files
git add path/to/file

# Or add all changes
git add .

# Commit changes with descriptive message
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## Next Steps

1. Set up Git repository and push to GitHub (see section 0 above)
2. Customize content through admin panel
3. Add your own programs and housing options
4. Add client reviews and testimonials
5. Update contact information
6. Consider adding additional features from the README suggestions
