package data.models;

import data.entities.Lesson;

public class AppRequest {

    private String title;
    private String description;
    
    private String videoPath;
    private String documentPath;

    private Long topicId;

    public AppRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoPath() {
        return videoPath;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public String getDocumentPath() {
        return documentPath;
    }

    public void setDocumentPath(String documentPath) {
        this.documentPath = documentPath;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = Long.parseLong(topicId);
    }

    public Lesson getLesson() {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setVideoPath(videoPath);
        lesson.setDocumentPath(documentPath);
        return lesson;
    }
}