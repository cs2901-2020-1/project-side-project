package services;

import data.entities.Lesson;
import data.entities.Topic;
import data.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class TopicService {

    @Autowired
    private TopicRepository repository;

    public List<Topic> findAll(){
        List<Topic> items = new ArrayList<>();

        for (Topic item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Topic findOne(Long id){
        return repository.findById(id).get();
    }

    public Topic findByApprovedLesson(Long id){
        Topic topic = findOne(id);

        if (topic == null) {
            return null;
        }

        Set<Lesson> items = new HashSet<>();

        for (Lesson item : topic.getLessons()) {
            if (item.getAppLesson().getApproved() == null) {
                continue;
            }

            if (item.getAppLesson().getApproved()) {
                items.add(item);
            }
        }

        Topic temp = topic;
        temp.setLessons(items);
        
        return temp;
    }

    public Topic create(Topic item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
