# 2nd Chance Recovery Website

A comprehensive website for a drug and alcohol recovery center built with Django REST API backend and React frontend.

## Features

- **Home Page**: Hero section, quick links, and featured reviews
- **About Page**: Information about the recovery center
- **Programs & Housing Page**: Display of recovery programs and housing options
- **Contact Form**: Public contact form submission
- **Admin Panel**: Full content management system with:
  - Contact form management (view, edit, delete, status tracking)
  - Review management (approve, feature, edit, delete)
  - Program management (create, edit, delete)
  - Housing management (create, edit, delete)
  - Site settings customization (colors, backgrounds, content)

## Tech Stack

- **Backend**: Django 4.2, Django REST Framework
- **Frontend**: React 18, React Router
- **Authentication**: Firebase Auth
- **Database**: SQLite (default, can be changed to PostgreSQL/MySQL)

## Project Structure

```
2ndChanceRecovery/
├── backend/                 # Django backend
│   ├── api/                # API app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # API routes
│   ├── recovery_center/    # Django project settings
│   └── manage.py
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, Settings)
│   │   └── config/         # Configuration files
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

5. Update `.env` with your settings:
```
SECRET_KEY=your-secret-key-here
DEBUG=True
FIREBASE_CREDENTIALS_PATH=path/to/firebase-credentials.json
```

6. Set up Firebase:
   - Go to Firebase Console (https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Go to Project Settings > Service Accounts
   - Generate a new private key and save it as `firebase-credentials.json`
   - Update `FIREBASE_CREDENTIALS_PATH` in `.env`

7. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

8. Create a superuser (optional, for Django admin):
```bash
python manage.py createsuperuser
```

9. Run the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

4. Update `.env` with your Firebase configuration:
   - Go to Firebase Console > Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web app icon (</>) to get your config
   - Copy the values to `.env`

5. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Firebase Authentication Setup

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Google" provider (required for admin login)
3. Set your support email and save
4. Admin users can sign in with any Google account that has been added to Firebase Authentication
5. To restrict access, manually add specific Google accounts in Firebase Console > Authentication > Users

## Color Scheme

The default color scheme is:
- **Primary (Black)**: #000000
- **Secondary (Gray)**: #808080
- **Accent (Red)**: #DC143C
- **Background (White)**: #FFFFFF

Colors can be customized through the Admin Panel > Site Settings.

## API Endpoints

- `GET /api/settings/public/` - Get public site settings
- `POST /api/contact-forms/submit/` - Submit contact form (public)
- `GET /api/contact-forms/` - List contact forms (admin)
- `GET /api/reviews/featured/` - Get featured reviews (public)
- `GET /api/reviews/public/` - Get approved reviews (public)
- `GET /api/programs/` - List programs (public)
- `GET /api/housing/` - List housing options (public)

All admin endpoints require Firebase authentication token in the Authorization header.

## Additional Features to Consider

Here are some additional features you might want to add:

1. **Blog/News Section**: Share recovery stories, news, and updates
2. **Events Calendar**: Show support group meetings, workshops, and events
3. **Resources Page**: Links to helpful resources, articles, and tools
4. **FAQ Section**: Frequently asked questions about recovery
5. **Photo Gallery**: Images of facilities, events, and success stories
6. **Testimonials Page**: Extended testimonials and success stories
7. **Staff Page**: Introduce team members and their expertise
8. **Insurance Information**: Details about accepted insurance plans
9. **Admission Process**: Step-by-step guide for admission
10. **Virtual Tour**: Video or 360° tour of facilities
11. **Online Chat**: Live chat support for immediate assistance
12. **Newsletter Signup**: Email subscription for updates
13. **Social Media Integration**: Links and feeds from social platforms
14. **Emergency Contact**: 24/7 crisis hotline information
15. **Multilingual Support**: Support for multiple languages

## Deployment

### Backend Deployment

For production deployment:
1. Set `DEBUG=False` in `.env`
2. Update `ALLOWED_HOSTS` in `settings.py`
3. Use a production database (PostgreSQL recommended)
4. Set up static file serving
5. Use a production WSGI server (Gunicorn, uWSGI)

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `build` folder to a static hosting service (Netlify, Vercel, AWS S3, etc.)

## License

This project is proprietary software for 2nd Chance Recovery.

## Support

For issues or questions, please contact the development team.
