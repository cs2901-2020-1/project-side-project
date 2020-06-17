package services;

import data.entities.Student;
import data.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> findAll(){
        List<Student> items = new ArrayList<>();

        for (Student item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Student findOne(Long id){
        return repository.findById(id).get();
    }

    public Student create(Student item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
