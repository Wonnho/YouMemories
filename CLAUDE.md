# YouMemories - Rolling Paper Web Application

## Project Information

**YouMemories** is a digital rolling paper web application that allows users to create, share, and collaborate on memory collections. Similar to a digital scrapbook, users can add memories, photos, and messages that can be shared with friends and family.

### Technology Stack
- **Frontend**: React 19.1.1 with Vite
- **Backend**: Spring Boot 3.4.10 (Java 17)
- **Database**: MySQL 8.0
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose
- **Languages**: JavaScript, Java

## Goals and Major Functions

### Primary Goals
- Create an intuitive platform for digital memory sharing
- Enable collaborative memory creation and editing
- Provide secure user authentication and data privacy
- Deliver responsive, modern user experience

### Major Functions
- **User Authentication**: Login, registration, password recovery
- **Memory Management**: Create, edit, delete, and organize memories
- **Collaboration**: Share rolling papers with friends and family
- **Media Upload**: Support for photos, videos, and text content
- **Real-time Updates**: Live collaboration features
- **Export/Import**: Download memories in various formats
- **Search & Filter**: Find memories by date, tags, or content

## Technical Skills and Development Environment

### Required Skills
- **Frontend**: React, JavaScript ES6+, HTML5, CSS3, Responsive Design
- **Backend**: Java 17, Spring Boot, Spring Security, JPA/Hibernate
- **Database**: MySQL, Redis, SQL optimization
- **DevOps**: Docker, Docker Compose, Git
- **Tools**: Vite, Maven/Gradle, ESLint, Postman

### Development Environment Setup
```bash
# Prerequisites
- Node.js 18+
- Java 17+
- Docker & Docker Compose
- MySQL 8.0
- Redis 6+

# Clone and setup
git clone https://github.com/Wonnho/YouMemories.git
cd YouMemories
```

## Coding Conventions and Directory Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── services/           # API calls and business logic
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   ├── styles/             # Global styles and themes
│   └── assets/             # Static assets
├── public/                 # Public static files
└── package.json
```

### Backend Structure
```
backend/
├── src/main/java/com/example/backend/
│   ├── controller/         # REST API endpoints
│   ├── service/           # Business logic layer
│   ├── repository/        # Data access layer
│   ├── model/             # Entity classes
│   ├── dto/               # Data transfer objects
│   ├── config/            # Configuration classes
│   └── security/          # Security configurations
├── src/main/resources/
│   ├── application.properties
│   └── application-{env}.properties
└── build.gradle
```

### Coding Standards
- **JavaScript**: Use ES6+ features, arrow functions, async/await
- **React**: Functional components with hooks, prop-types for validation
- **Java**: Follow Spring Boot conventions, use Lombok for boilerplate reduction
- **Naming**: camelCase for variables, PascalCase for components/classes
- **Comments**: Document complex business logic and API endpoints

## Frequently Used Commands

### Development Commands
```bash
# Frontend Development
cd frontend
npm install                 # Install dependencies
npm run dev                # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run preview            # Preview production build

# Backend Development
cd backend
./gradlew bootRun          # Start Spring Boot application
./gradlew build            # Build application
./gradlew test             # Run tests
./gradlew clean            # Clean build artifacts

# Docker Commands
docker-compose up -d       # Start all services
docker-compose down        # Stop all services
docker-compose logs        # View logs
docker-compose build       # Rebuild images

# Database Commands
docker exec -it mysql-container mysql -u root -p
redis-cli                  # Connect to Redis

# Git Workflow
git checkout -b feature/branch-name
git add .
git commit -m "feat: description"
git push origin feature/branch-name
```

### Testing Commands
```bash
# Frontend Testing
npm test                   # Run Jest tests
npm run test:coverage      # Run tests with coverage

# Backend Testing
./gradlew test            # Run all tests
./gradlew test --tests ClassName  # Run specific test class
```

## Team Building Rules

### Development Workflow
1. **Branch Strategy**: Use GitFlow (main, develop, feature/*, hotfix/*)
2. **Code Reviews**: All changes require peer review before merge
3. **Commit Messages**: Follow conventional commits (feat:, fix:, docs:, etc.)
4. **Testing**: Minimum 80% code coverage required
5. **Documentation**: Update documentation for any API changes

### Communication Guidelines
- **Daily Standups**: 9:00 AM - progress, blockers, plans
- **Sprint Planning**: Every 2 weeks
- **Code Review Response**: Within 24 hours
- **Bug Reports**: Use GitHub issues with proper labels

### Quality Standards
- **Definition of Done**: Code reviewed, tested, documented, deployed
- **Performance**: Page load time < 3 seconds
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: Regular dependency updates, no hardcoded secrets

### Collaboration Tools
- **Code**: GitHub for version control
- **Project Management**: GitHub Projects/Issues
- **Communication**: Slack/Discord for team chat
- **Documentation**: This CLAUDE.md file and inline comments

### Environment Management
- **Local Development**: Use Docker Compose for consistent environment
- **Environment Variables**: Use .env files (never commit secrets)
- **Database Migrations**: Version controlled schema changes
- **Deployment**: Automated CI/CD pipeline

## Development Progress

### Completed Features (as of 2025-09-30)

#### Authentication System ✅
- **User Registration (SignUp)**
  - Email validation and duplicate check
  - Nickname validation and duplicate check
  - Password strength validation (8+ chars, special characters)
  - Terms of Service and Privacy Policy agreement
  - Email verification flow
  - Location: `frontend/src/components/SignUp.jsx`

- **User Login**
  - Email/password authentication
  - JWT token-based authentication
  - Remember me functionality
  - Kakao social login integration
  - Location: `frontend/src/components/Login.jsx`

- **Backend Authentication APIs**
  - POST `/api/auth/signup` - User registration
  - POST `/api/auth/login` - User login
  - GET `/api/auth/verify-email` - Email verification
  - GET `/api/auth/check-email` - Email availability check
  - GET `/api/auth/check-nickname` - Nickname availability check
  - GET `/api/auth/kakao` - Kakao OAuth redirect
  - GET `/api/auth/kakao/callback` - Kakao OAuth callback
  - Location: `backend/src/main/java/com/example/backend/controller/AuthController.java`

#### Main Application Pages ✅
- **Main Page**
  - Two main action buttons: "Rolling Paper 생성" and "My Page"
  - Logout functionality
  - Responsive gradient design
  - Location: `frontend/src/components/MainPage.jsx`

- **PostIt Page (Rolling Paper Creation)**
  - Image upload with preview (multiple images)
  - Image removal functionality
  - Text content input (textarea with character count)
  - Form validation
  - Location: `frontend/src/components/PostIt.jsx`

- **My Page**
  - Display list of user's PostIt cards
  - Image preview (up to 3 images per card)
  - Content preview (3 lines max)
  - Delete functionality for each PostIt
  - Empty state UI
  - Loading and error states
  - Location: `frontend/src/components/MyPage.jsx`

#### Frontend Routing ✅
- State-based routing system in App.jsx
- Routes: `/` (auth), `/main`, `/postit`, `/mypage`
- Token persistence in localStorage
- Auto-login on page refresh
- Location: `frontend/src/App.jsx`

#### Database Configuration ✅
- MySQL 8.0 integration with Docker
- User entity model with authentication fields
- JPA/Hibernate configuration
- Spring Security configuration
- Location: `backend/src/main/java/com/example/backend/model/User.java`

### API Endpoints Summary

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email?token={token}` - Verify email
- `GET /api/auth/check-email?email={email}` - Check email availability
- `GET /api/auth/check-nickname?nickname={nickname}` - Check nickname availability
- `GET /api/auth/kakao` - Kakao OAuth login
- `GET /api/auth/kakao/callback?code={code}` - Kakao OAuth callback

#### PostIt (To be implemented)
- `POST /api/postit` - Create new PostIt
- `GET /api/postit/my-postits` - Get user's PostIt list
- `DELETE /api/postit/{id}` - Delete PostIt

### Next Steps / TODO
- [ ] Implement PostIt backend API endpoints
- [ ] Implement image upload/storage service (AWS S3 or local storage)
- [ ] Add PostIt detail view page
- [ ] Implement PostIt edit functionality
- [ ] Add pagination for PostIt list
- [ ] Implement search and filter for PostIt
- [ ] Add sharing functionality (share rolling paper with others)
- [ ] Implement collaborative editing features
- [ ] Add email service for verification emails
- [ ] Add password recovery functionality
- [ ] Implement Redis caching for session management
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline
- [ ] Deploy to production environment

### Database Schema

#### User Table
```sql
- id: BIGINT (Primary Key)
- email: VARCHAR(255) (Unique, Not Null)
- password: VARCHAR(255) (Encrypted, Not Null)
- nickname: VARCHAR(20) (Unique, Not Null)
- emailVerified: BOOLEAN (Default: false)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### PostIt Table (To be implemented)
```sql
- id: BIGINT (Primary Key)
- userId: BIGINT (Foreign Key -> User)
- content: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### PostItImage Table (To be implemented)
```sql
- id: BIGINT (Primary Key)
- postitId: BIGINT (Foreign Key -> PostIt)
- imageUrl: VARCHAR(500)
- createdAt: TIMESTAMP
```

---

*This document should be updated as the project evolves. Last updated: 2025-09-30*