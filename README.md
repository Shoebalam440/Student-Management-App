# Student Management System

A modern, responsive web application for managing students with full CRUD operations. This project consists of a Spring Boot backend and a vanilla HTML/CSS/JavaScript frontend.

## Features

### Backend (Spring Boot)
- **RESTful API** with full CRUD operations
- **MySQL Database** integration with JPA/Hibernate
- **Student Model** with fields: ID, Name, Email, Course
- **CORS enabled** for frontend integration
- **Port**: 8081

### Frontend (Vanilla JS)
- **Modern, Responsive Design** with gradient backgrounds and smooth animations
- **Real-time CRUD Operations**:
  - ➕ Add new students
  - 📖 View all students
  - ✏️ Edit existing students
  - ❌ Delete students with confirmation
- **User-friendly Interface**:
  - Form validation
  - Loading states
  - Success/error messages
  - Confirmation modals
  - Auto-refresh functionality
- **Responsive Design** that works on desktop, tablet, and mobile
- **Keyboard Shortcuts** (Escape to cancel, Ctrl+R to refresh)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create a new student |
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Modern web browser

### Backend Setup

1. **Database Setup**:
   ```sql
   CREATE DATABASE studentcrudapp;
   ```

2. **Update Database Configuration**:
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/studentcrudapp
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the Backend**:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8081`

### Frontend Setup

1. **Open the Frontend**:
   Simply open `index.html` in your web browser, or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Access the Application**:
   Open `http://localhost:8000` (or your chosen port) in your browser

## Usage

### Adding a Student
1. Fill in the form with student details (Name, Email, Course)
2. Click "Add Student"
3. The student will appear in the list below

### Editing a Student
1. Click the "Edit" button next to any student
2. The form will populate with the student's current information
3. Make your changes and click "Update Student"
4. Click "Cancel Edit" to discard changes

### Deleting a Student
1. Click the "Delete" button next to any student
2. Confirm the deletion in the modal that appears
3. The student will be removed from the list

### Refreshing Data
- Click the "Refresh" button to reload all students
- The application auto-refreshes every 30 seconds
- Use Ctrl+R (or Cmd+R on Mac) as a keyboard shortcut

## Project Structure

```
studentcrud/
├── src/main/java/com/fiveminor/studentcrud/
│   ├── StudentcrudApplication.java          # Main Spring Boot application
│   ├── controller/StudentController.java    # REST API endpoints
│   ├── model/Student.java                   # Student entity
│   └── repository/StudentRepository.java    # Data access layer
├── src/main/resources/
│   └── application.properties               # Database configuration
├── index.html                               # Frontend HTML
├── styles.css                               # Frontend styling
├── script.js                                # Frontend JavaScript
└── README.md                                # This file
```

## Technologies Used

### Backend
- **Spring Boot 3.5.7** - Main framework
- **Spring Data JPA** - Data persistence
- **MySQL** - Database
- **Lombok** - Code generation
- **Maven** - Dependency management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **Vanilla JavaScript** - Functionality and API integration
- **Font Awesome** - Icons
- **Responsive Design** - Mobile-first approach

## Features in Detail

### Responsive Design
- **Desktop**: Two-column layout with form on left, student list on right
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single column with touch-friendly buttons

### User Experience
- **Loading States**: Spinner while fetching data
- **Form Validation**: Client-side validation for required fields and email format
- **Error Handling**: Graceful error messages for network issues
- **Confirmation Dialogs**: Prevent accidental deletions
- **Auto-save**: Form data persists during editing
- **Keyboard Navigation**: Escape to cancel, Enter to submit

### Performance
- **Efficient API Calls**: Only fetch data when needed
- **Optimized Rendering**: Minimal DOM manipulation
- **Caching**: Students list cached in memory
- **Auto-refresh**: Background updates every 30 seconds

## Troubleshooting

### Common Issues

1. **Backend not starting**:
   - Check if MySQL is running
   - Verify database credentials in `application.properties`
   - Ensure port 8081 is not in use

2. **Frontend not loading students**:
   - Check if backend is running on port 8081
   - Open browser developer tools to check for CORS errors
   - Verify API endpoints are accessible

3. **Database connection issues**:
   - Ensure MySQL server is running
   - Check database name, username, and password
   - Verify MySQL connector dependency in `pom.xml`

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository or contact the development team.
"# Student-Management-App" 
