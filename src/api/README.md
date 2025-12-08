# API Documentation

This folder contains all API integration files for the Ansar College web application.

## Structure

```
src/api/
├── apiClient.ts          # Base axios configuration
├── alumniApi.ts          # Alumni CRUD operations
├── memoriesApi.ts        # Memories CRUD operations
├── jobsApi.ts            # Jobs/Occupations CRUD operations
├── notificationApi.ts    # Notifications CRUD operations
├── eventsApi.ts          # Events CRUD operations
├── newsApi.ts            # News CRUD operations
├── coursesApi.ts         # Courses CRUD operations
├── departmentApi.ts      # Departments CRUD operations
├── authApi.ts            # Authentication operations
└── index.ts              # Exports all APIs
```

## Base Configuration

The API client is configured to use: `https://silent-fox-94fa.tunnl.gg`

All requests automatically include:
- Authorization header with JWT token (if available)
- Automatic token refresh handling
- Error handling with 401 redirect to login

## Usage Examples

### Import APIs

```typescript
// Import specific APIs
import { getAllAlumni, createAlumni } from '@/api/alumniApi';
import { login, logout } from '@/api/authApi';

// Or import from index
import { getAllAlumni, login } from '@/api';
```

### Authentication

```typescript
// Login
const handleLogin = async () => {
  try {
    const response = await login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Logout
const handleLogout = () => {
  logout(); // Clears token and redirects to login
};
```

### Alumni Operations

```typescript
// Get all alumni
const fetchAlumni = async () => {
  try {
    const alumni = await getAllAlumni({ 
      jobId: 1, 
      limit: 10, 
      page: 1 
    });
    console.log(alumni);
  } catch (error) {
    console.error(error);
  }
};

// Create alumni
const createNewAlumni = async () => {
  const formData = new FormData();
  formData.append('name', 'John Doe');
  formData.append('email', 'john@example.com');
  formData.append('phone', '1234567890');
  formData.append('course', 'Computer Science');
  formData.append('startYear', '2020');
  formData.append('endYear', '2024');
  formData.append('className', 'CS-A');
  formData.append('password', 'password123');
  formData.append('confirmPassword', 'password123');
  formData.append('jobId', '1');
  
  // Add photo if available
  if (photoFile) {
    formData.append('photos', photoFile);
  }
  
  try {
    const result = await createAlumni(formData);
    console.log('Alumni created:', result);
  } catch (error) {
    console.error('Error creating alumni:', error);
  }
};

// Delete alumni
const removeAlumni = async (id: number) => {
  try {
    await deleteAlumni(id);
    console.log('Alumni deleted');
  } catch (error) {
    console.error('Error deleting alumni:', error);
  }
};
```

### Memories Operations

```typescript
// Get all memories
const fetchMemories = async () => {
  const memories = await getAllMemories({ status: 'active' });
  console.log(memories);
};

// Create memory with photos
const createNewMemory = async () => {
  const formData = new FormData();
  formData.append('description', 'Great college memories!');
  formData.append('status', 'active');
  formData.append('userId', '1');
  
  // Add multiple photos
  photoFiles.forEach(file => {
    formData.append('photos', file);
  });
  
  const result = await createMemory(formData);
  console.log(result);
};
```

### Events Operations

```typescript
// Get all events
const fetchEvents = async () => {
  const events = await getAllEvents({ status: 'upcoming' });
  console.log(events);
};

// Create event
const createNewEvent = async () => {
  const formData = new FormData();
  formData.append('name', 'Annual Day');
  formData.append('location', 'Main Auditorium');
  formData.append('status', 'upcoming');
  formData.append('date', '2024-12-25');
  
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const result = await createEvent(formData);
  console.log(result);
};
```

### News Operations

```typescript
// Get all news
const fetchNews = async () => {
  const news = await getAllNews({ limit: 10, page: 1 });
  console.log(news);
};

// Create news
const createNewsArticle = async () => {
  const formData = new FormData();
  formData.append('title', 'New Campus Opening');
  formData.append('content', 'We are excited to announce...');
  formData.append('author', 'Admin');
  
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const result = await createNews(formData);
  console.log(result);
};
```

### Notifications

```typescript
// Get all notifications
const fetchNotifications = async () => {
  const notifications = await getAllNotifications();
  console.log(notifications);
};

// Create notification
const sendNotification = async () => {
  const formData = new FormData();
  formData.append('title', 'Exam Schedule');
  formData.append('message', 'Final exams start next week');
  formData.append('audiance', 'students');
  
  if (attachmentFile) {
    formData.append('file', attachmentFile);
  }
  
  const result = await createNotification(formData);
  console.log(result);
};
```

### Jobs/Occupations

```typescript
// Get all jobs
const fetchJobs = async () => {
  const jobs = await getAllJobs();
  console.log(jobs);
};

// Create job
const createNewJob = async () => {
  const formData = new FormData();
  formData.append('name', 'Software Developer');
  
  if (iconFile) {
    formData.append('icon', iconFile);
  }
  
  const result = await createJob(formData);
  console.log(result);
};
```

## Error Handling

All API calls should be wrapped in try-catch blocks:

```typescript
try {
  const data = await getAllAlumni();
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Error:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

## TypeScript Types

All APIs include TypeScript interfaces for type safety. Import them as needed:

```typescript
import type { Alumni, AlumniQueryParams } from '@/api/alumniApi';
import type { Memory, MemoryQueryParams } from '@/api/memoriesApi';
import type { Event, EventQueryParams } from '@/api/eventsApi';
```

## Notes

- All file uploads use `FormData`
- Authentication token is automatically included in requests
- Token is stored in `localStorage` as `authToken`
- 401 errors automatically redirect to login page
- Base URL can be changed in `apiClient.ts`
