package services;

import data.entities.AppLesson;
import data.repositories.AppLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AppLessonService {

    @Autowired
    private AppLessonRepository repository;

    public List<AppLesson> findAll(){
        List<AppLesson> items = new ArrayList<>();

        for (AppLesson item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public AppLesson findOne(Long id){
        return repository.findById(id).get();
    }

    public List<AppLesson> findUnapprovedLesson(){
        return repository.findByApproved(false);
    }

    public AppLesson approveLesson(AppLesson item){
        item.setApproved(true);
        return create(item);
    }

    public AppLesson create(AppLesson item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
