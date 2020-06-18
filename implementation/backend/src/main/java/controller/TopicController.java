package controller;

import services.TopicService;
import data.entities.Topic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/topic")
public class TopicController {
    
    @Autowired
    private TopicService service;
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> getAll() {
        List<Topic> topics = service.findAll();
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Topic topic = service.findOne(id);
        if (topic == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(topic, HttpStatus.OK);
    }
}