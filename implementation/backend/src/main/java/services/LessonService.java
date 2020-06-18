package services;

import data.entities.AppLesson;
import data.entities.Lesson;
import data.entities.Topic;
import data.models.AppRequest;
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

        lesson.setAppLesson(appLesson);
        lesson.setTopic(topic);
        appLesson.setLesson(lesson);

        appLessonService.create(appLesson);
        return lesson;
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
