package services;

import data.entities.AppLesson;
import data.entities.Comment;
import data.entities.Lesson;
import data.entities.Topic;
import data.entities.Usuario;
import data.models.AppRequest;
import data.models.CommentRequest;
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
    private UsuarioService usuarioService;

    @Autowired
    private CommentService commentService;

    public List<Lesson> findAll(){
        List<Lesson> items = new ArrayList<>();

        for (Lesson item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Lesson findOne(Long id){
        return repository.findById(id).get();
    }

    public Lesson create(Lesson item){
        return repository.save(item);
    }

    public Lesson createAppLesson(AppRequest appRequest) {
        Topic topic = topicService.findOne(appRequest.getTopicId());
        Lesson lesson = appRequest.getLesson();
        AppLesson appLesson = new AppLesson();

        lesson.setTopic(topic);
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

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
