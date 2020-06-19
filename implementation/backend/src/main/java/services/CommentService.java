package services;

import data.entities.Comment;
import data.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public List<Comment> findAll(){
        List<Comment> items = new ArrayList<>();

        for (Comment item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Comment findOne(Long id){
        return repository.findById(id).get();
    }

    public Comment create(Comment item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
