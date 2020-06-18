package controller;

import services.CourseService;
import data.entities.Course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/course")
public class CourseController {
    
    @Autowired
    private CourseService service;
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> getAll() {
        List<Course> courses = service.findAll();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}