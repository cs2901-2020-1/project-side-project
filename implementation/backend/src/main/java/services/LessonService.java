package services;

import data.entities.*;
import data.models.AppRequest;
import data.models.CommentRequest;
import data.models.LikeModel;
import data.models.TeacherLesson;
import data.repositories.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LessonService {

    @Autowired
    private LessonRepository repository;

    @Autowired
    private AppLessonService appLessonService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private LikeService likeService;

    public List<Lesson> findAll(){
        List<Lesson> items = new ArrayList<>();

        for (Lesson item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public List<TeacherLesson> getTeacherLessons(Long userId){
        Teacher teacher = teacherService.findAsUser(userId);

        if (teacher == null) {
            return null;
        }

        List<TeacherLesson> lessons = new ArrayList<>();

        for (Lesson item : repository.findByTeacherIdOrderByIdDesc(teacher.getId())) {
            lessons.add(item.getTeacherLesson());
        }

        return lessons;
    }

    public Lesson findOne(Long id){
        return repository.findById(id).get();
    }

    public Lesson create(Lesson item){
        return repository.save(item);
    }

    public Lesson createAppLesson(AppRequest appRequest) {
        Topic topic = topicService.findOne(appRequest.getTopicId());
        Teacher teacher = teacherService.findAsUser(appRequest.getTeacherId());
        Lesson lesson = appRequest.getLesson();
        AppLesson appLesson = new AppLesson();

        lesson.setTopic(topic);
        lesson.setTeacher(teacher);
        create(lesson);

        lesson.setAppLesson(appLesson);
        appLesson.setLesson(lesson);

        appLessonService.create(appLesson);
        return lesson;
    }

    public Comment commentLesson(CommentRequest commentRequest) {
        Usuario user = usuarioService.findOne(commentRequest.getUserId());
        if (user == null) {
            return null;
        }

        Lesson lesson = findOne(commentRequest.getLessonId());
        if (lesson == null) {
            return null;
        }

        Comment comment = new Comment();

        comment.setContent(commentRequest.getContent());
        comment.setLesson(lesson);
        comment.setUser(user);

        commentService.create(comment);

        return comment;
    }

    public LikeModel likeLesson(LikeModel likeModel) {
        Usuario user = usuarioService.findOne(likeModel.getUserId());
        if (user == null) {
            return null;
        }

        Lesson lesson = findOne(likeModel.getLessonId());
        if (lesson == null) {
            return null;
        }
        
        Like like = likeService.findOneByUserAndLesson(user, lesson);
        if (like == null && likeModel.getLike()) {
            like = new Like();
            like.setUser(user);
            like.setLesson(lesson);
            likeService.create(like);
            return likeModel;
        }

        if (like != null && !likeModel.getLike()) {
            likeService.deleteClass(like);
            return likeModel;
        }

        return null;
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
