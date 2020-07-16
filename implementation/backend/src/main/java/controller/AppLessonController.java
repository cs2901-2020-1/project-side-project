package controller;

import data.entities.*;
import data.models.TeacherLesson;
import services.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/applesson")
public class AppLessonController {
    
    @Autowired
    private AppLessonService service;

    @RequestMapping(value = "/unapproved", method = RequestMethod.GET)
    public ResponseEntity<?> getUnapprovedLesson() {
        List<TeacherLesson> unapproved = service.findUnapprovedLesson();
        return new ResponseEntity<>(unapproved, HttpStatus.OK);
    }

    @RequestMapping(value = "/approve/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> approveLesson(@PathVariable Long id) {
        AppLesson lesson = service.findOne(id);
        if (lesson.getApproved()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        service.approveLesson(lesson);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}