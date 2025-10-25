// API Configuration
const API_BASE_URL = 'http://localhost:8081/students';

// Global Variables
let students = [];
let editingStudentId = null;

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');
const noStudents = document.getElementById('noStudents');
const loadingSpinner = document.getElementById('loadingSpinner');
const refreshBtn = document.getElementById('refreshBtn');
const cancelEditBtn = document.getElementById('cancelEdit');
const deleteModal = document.getElementById('deleteModal');
const messageContainer = document.getElementById('messageContainer');

// Form Elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
    // Form submission
    studentForm.addEventListener('submit', handleFormSubmit);
    
    // Refresh button
    refreshBtn.addEventListener('click', loadStudents);
    
    // Cancel edit button
    cancelEditBtn.addEventListener('click', cancelEdit);
    
    // Modal event listeners
    setupModalEventListeners();
}

function setupModalEventListeners() {
    const closeBtn = document.querySelector('.close');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    
    closeBtn.addEventListener('click', closeModal);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            closeModal();
        }
    });
}

// API Functions
async function fetchStudents() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

async function createStudent(studentData) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

async function deleteStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

// UI Functions
async function loadStudents() {
    showLoading(true);
    try {
        students = await fetchStudents();
        renderStudents();
        showMessage('Students loaded successfully!', 'success');
    } catch (error) {
        showMessage('Failed to load students. Please check if the backend server is running.', 'error');
        console.error('Error loading students:', error);
    } finally {
        showLoading(false);
    }
}

function renderStudents() {
    if (students.length === 0) {
        studentsList.style.display = 'none';
        noStudents.style.display = 'block';
        return;
    }
    
    noStudents.style.display = 'none';
    studentsList.style.display = 'block';
    
    studentsList.innerHTML = students.map(student => `
        <div class="student-card" data-id="${student.id}">
            <div class="student-info">
                <div class="student-name">${escapeHtml(student.name)}</div>
                <div class="student-email">
                    <i class="fas fa-envelope"></i>
                    ${escapeHtml(student.email)}
                </div>
                <div class="student-course">
                    <i class="fas fa-book"></i>
                    ${escapeHtml(student.course)}
                </div>
            </div>
            <div class="student-actions">
                <button class="btn btn-edit" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-delete" onclick="showDeleteModal(${student.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function showLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
    studentsList.style.display = show ? 'none' : 'block';
    noStudents.style.display = show ? 'none' : 'none';
}

// Form Handling
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(studentForm);
    const studentData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        course: formData.get('course').trim()
    };
    
    // Validation
    if (!studentData.name || !studentData.email || !studentData.course) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(studentData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        if (editingStudentId) {
            // Update existing student
            await updateStudent(editingStudentId, studentData);
            showMessage('Student updated successfully!', 'success');
            cancelEdit();
        } else {
            // Create new student
            await createStudent(studentData);
            showMessage('Student added successfully!', 'success');
        }
        
        studentForm.reset();
        await loadStudents();
    } catch (error) {
        showMessage('Failed to save student. Please try again.', 'error');
        console.error('Error saving student:', error);
    }
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    editingStudentId = id;
    
    // Populate form with student data
    nameInput.value = student.name;
    emailInput.value = student.email;
    courseInput.value = student.course;
    
    // Update form appearance
    studentForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> Update Student';
    cancelEditBtn.style.display = 'inline-flex';
    
    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    
    showMessage('Student loaded for editing. Make your changes and click Update.', 'success');
}

function cancelEdit() {
    editingStudentId = null;
    studentForm.reset();
    studentForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> Add Student';
    cancelEditBtn.style.display = 'none';
}

// Delete Functionality
function showDeleteModal(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    document.getElementById('deleteStudentName').textContent = student.name;
    document.getElementById('deleteStudentEmail').textContent = student.email;
    document.getElementById('deleteStudentCourse').textContent = student.course;
    
    // Store the ID for deletion
    confirmDeleteBtn.onclick = () => performDelete(id);
    
    deleteModal.style.display = 'block';
}

async function performDelete(id) {
    try {
        await deleteStudent(id);
        showMessage('Student deleted successfully!', 'success');
        closeModal();
        await loadStudents();
    } catch (error) {
        showMessage('Failed to delete student. Please try again.', 'error');
        console.error('Error deleting student:', error);
    }
}

function closeModal() {
    deleteModal.style.display = 'none';
}

function confirmDelete() {
    // This function is set dynamically in showDeleteModal
    // The actual delete logic is in performDelete
}

// Utility Functions
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    messageContainer.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Error Handling for Network Issues
window.addEventListener('online', function() {
    showMessage('Connection restored. You can now perform operations.', 'success');
});

window.addEventListener('offline', function() {
    showMessage('You are offline. Some features may not work.', 'error');
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // Escape key to close modal
    if (event.key === 'Escape') {
        if (deleteModal.style.display === 'block') {
            closeModal();
        }
        if (editingStudentId) {
            cancelEdit();
        }
    }
    
    // Ctrl/Cmd + R to refresh (prevent default and use our refresh)
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        loadStudents();
    }
});

// Auto-refresh every 30 seconds (optional)
setInterval(() => {
    if (!editingStudentId && deleteModal.style.display === 'none') {
        loadStudents();
    }
}, 30000);
