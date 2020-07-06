package services;

import data.entities.Teacher;
import data.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TeacherService {

    @Autowired
    private TeacherRepository repository;

    public List<Teacher> findAll(){
        List<Teacher> items = new ArrayList<>();

        for (Teacher item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Teacher findAsUser(long id) {
        return repository.findByUserId(id);
    }

    public Teacher findOne(Long id){
        return repository.findById(id).get();
    }

    public Teacher create(Teacher item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
