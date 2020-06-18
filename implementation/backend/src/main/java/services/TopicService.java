package services;

import data.entities.Topic;
import data.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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

    public Topic create(Topic item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
