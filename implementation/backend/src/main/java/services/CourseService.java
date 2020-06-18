package services;

import data.entities.Course;
import data.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CourseService {

    @Autowired
    private CourseRepository repository;

    public List<Course> findAll(){
        List<Course> items = new ArrayList<>();

        for (Course item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Course findOne(Long id){
        return repository.findById(id).get();
    }

    public Course create(Course item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
