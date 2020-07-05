package data.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import data.models.TeacherLesson;
import org.hibernate.annotations.Type;

import data.models.CommentModel;
import data.models.LessonModel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "lesson")
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String description;

    @Column(nullable = false)
    private String videoPath;

    private String documentPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @OneToOne(mappedBy = "lesson")
    private AppLesson appLesson;

    @JsonIgnore
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Like> likes;

    public Lesson() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    @JsonIgnore
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    @JsonIgnore
    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public AppLesson getAppLesson() {
        return appLesson;
    }

    public void setAppLesson(AppLesson appLesson) {
        this.appLesson = appLesson;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Like> getLikes() {
        return likes;
    }

    public void setLikes(Set<Like> likes) {
        this.likes = likes;
    }
    
    public LessonModel getModel() {
        LessonModel model = new LessonModel();

        model.setTitle(title);
        model.setDescription(description);

        model.setVideoPath(videoPath);
        model.setDocumentPath(documentPath);
        model.setTeacher(teacher.getUser().getFullName());

        List<CommentModel> items = new ArrayList<>();

        for (Comment comment : comments) {
            items.add(comment.getModel());
        }
        
        model.setComments(items);

        Long numLikes = (long) likes.size();

        model.setNumLikes(numLikes);

        return model;
    }

    @JsonIgnore
    public TeacherLesson getTeacherLesson() {
        TeacherLesson teacherLesson = new TeacherLesson();

        teacherLesson.setLessonId(this.id);
        teacherLesson.setTitle(this.title);
        teacherLesson.setDescription(this.description);
        teacherLesson.setDate(this.getAppLesson().getApplicationDate());
        teacherLesson.setApproved(this.getAppLesson().getApproved());
        teacherLesson.setVideoPath(this.videoPath);
        teacherLesson.setDocumentPath(this.documentPath);
        teacherLesson.setTeacher(this.teacher.getUser().getFullName());

        teacherLesson.setTopicId(this.topic.getId());
        teacherLesson.setTopic(this.topic.getName());
        Course course = this.topic.getCourse();
        teacherLesson.setCourseId(course.getId());
        teacherLesson.setCourse(course.getName());

        return teacherLesson;
    }
}