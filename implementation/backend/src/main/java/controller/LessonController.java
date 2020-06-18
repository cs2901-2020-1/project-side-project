package controller;

import services.LessonService;
import services.StorageService;
import data.models.*;

import java.io.IOException;
import java.nio.file.Path;

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

    @RequestMapping(value = "/video", method = RequestMethod.POST)
    public ResponseEntity<?> handleVideoUpload(
            @RequestParam("video") MultipartFile video,
            @RequestParam("doc") MultipartFile doc,
            @RequestParam("appRequest") AppRequest appRequest) throws IOException {
        Path videoFileName = storageService.store(video);
        Path docFileName = storageService.store(doc);
        appRequest.setVideoPath(videoFileName.getFileName().toString());
        appRequest.setDocumentPath(docFileName.getFileName().toString());
        service.createAppLesson(appRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}