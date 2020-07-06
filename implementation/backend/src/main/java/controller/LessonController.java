package controller;

import services.*;
import data.entities.Comment;
import data.entities.Lesson;
import data.entities.Like;
import data.entities.Usuario;
import data.models.*;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/lesson")
public class LessonController {
    
    @Autowired
    private LessonService service;

    @Autowired
    private StorageService storageService;

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Lesson lesson = service.findOne(id);
        if (lesson == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        LessonModel model = lesson.getModel();

        Usuario user = userService.getCurrentUser();
        Like like = likeService.findOneByUserAndLesson(user, lesson);
        model.setLike(like != null);

        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @RequestMapping(value = "/teacher/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getLessons(@PathVariable Long id) {
        List<TeacherLesson> lessons = service.getTeacherLessons(id);
        if (lessons == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public ResponseEntity<?> commentLesson(@RequestBody CommentRequest commentRequest) {
        Comment comment = service.commentLesson(commentRequest);
        if (comment == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(comment.getModel(), HttpStatus.OK);
    }

    @RequestMapping(value = "/like", method = RequestMethod.POST)
    public ResponseEntity<?> likeLesson(@RequestBody LikeModel model) {
        model = service.likeLesson(model);
        if (model == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @RequestMapping(value = "/video", method = RequestMethod.POST)
    public ResponseEntity<?> handleVideoUpload(
            @RequestPart("video") MultipartFile video,
            @RequestPart("doc") MultipartFile doc,
            @RequestPart("request") String request) throws IOException {
        
        ObjectMapper mapper = new ObjectMapper();
        AppRequest appRequest = new AppRequest();

        try {
            appRequest = mapper.readValue(request, AppRequest.class);
        } catch (IOException e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Path videoFileName = storageService.store(video);
        Path docFileName = storageService.store(doc);
        appRequest.setVideoPath(videoFileName.getFileName().toString());
        appRequest.setDocumentPath(docFileName.getFileName().toString());
        
        service.createAppLesson(appRequest);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
}