package services;

import data.entities.Subcomment;
import data.repositories.SubcommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SubcommentService {

    @Autowired
    private SubcommentRepository repository;

    public List<Subcomment> findAll(){
        List<Subcomment> items = new ArrayList<>();

        for (Subcomment item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Subcomment findOne(Long id){
        return repository.findById(id).get();
    }

    public Subcomment create(Subcomment item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
