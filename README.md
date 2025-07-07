# 👨‍💻 SkillBridge - User Service

A microservice for managing user authentication, authorization, and profile data for the SkillBridge platform — a peer-to-peer micro-internship platform connecting students and mentors.

---

## 📚 Overview

The User Service handles:
- ✅ User registration and login (JWT-based)
- ✅ Role-based access (STUDENT / MENTOR / ADMIN)
- ✅ User profile data (bio, skills, social links, etc.)
- ✅ Authentication token validation
- ✅ Secure password storage with encryption
- ✅ Exception handling and clean error responses

---

## 🏗️ Project Architecture


---

## ⚙️ Tech Stack

| Layer           | Technology                |
|----------------|---------------------------|
| Language        | Java 17                   |
| Framework       | Spring Boot 3.x           |
| Auth            | Spring Security + JWT     |
| Data Access     | Spring Data JPA           |
| Database        | MySQL                     |
| API Docs        | SpringDoc OpenAPI (Swagger) |
| Dev Tools       | Lombok, MapStruct (optional) |
| Testing         | JUnit, Mockito            |
| Build Tool      | Maven / Gradle            |

---

## 🚀 API Endpoints

| Endpoint                    | Method | Description             | Access  |
|----------------------------|--------|-------------------------|---------|
| `/api/users/auth/register` | POST   | Register new user       | Public  |
| `/api/users/auth/login`    | POST   | Login & get JWT token   | Public  |
| `/api/users/me`            | GET    | Get current user info   | Private |
| `/api/users?role=MENTOR`   | GET    | List all mentors        | Public  |

📘 Full API docs available at:



---

## 🛡️ Security

- Role-based access using `@PreAuthorize`
- JWT token authentication
- Password encryption using `BCrypt`
- CORS configured for frontend communication

---

## 🧪 Sample JSON for Sign-Up

```json
{
  "name": "Akash T",
  "email": "akash@example.com",
  "password": "securePass123",
  "role": "STUDENT",
  "profileImageUrl": "https://example.com/images/avatar.png",
  "bio": "Final year Java developer passionate about microservices.",
  "location": "Mumbai, India",
  "githubUrl": "https://github.com/akash-t",
  "linkedInUrl": "https://linkedin.com/in/akash-t",
  "skills": ["Java", "Spring Boot", "React", "Docker"]
}


🔧 How to Run
Clone the repository: 
git clone https://github.com/your-username/skillbridge-user-service.git
cd skillbridge-user-service
