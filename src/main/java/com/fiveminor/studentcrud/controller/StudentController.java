package com.fiveminor.studentcrud.controller;

import com.fiveminor.studentcrud.model.Student;
import com.fiveminor.studentcrud.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "file://"})
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    // ➕ CREATE
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return repo.save(student);
    }

    // 📖 READ ALL
    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // 📖 READ BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // ✏️ UPDATE
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student newData) {
        return repo.findById(id).map(student -> {
            student.setName(newData.getName());
            student.setEmail(newData.getEmail());
            student.setCourse(newData.getCourse());
            return repo.save(student);
        }).orElse(null);
    }

    // ❌ DELETE
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
        return "Student deleted with ID: " + id;
    }
}
