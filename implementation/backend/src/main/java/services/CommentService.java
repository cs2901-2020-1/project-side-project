package services;

import data.entities.Comment;
import data.entities.Subcomment;
import data.models.SubcommentRequest;
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

    @Autowired
    private SubcommentService subcommentService;

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

    public Subcomment subcommentLesson(SubcommentRequest subcommentRequest) {
        Comment comment = findOne(subcommentRequest.getCommentId());

        if (comment == null) {
            return null;
        }

        Subcomment subcomment = new Subcomment();

        subcomment.setComment(comment);
        subcomment.setContent(subcommentRequest.getContent());
        subcomment.setUser_to(subcommentRequest.getUser_to());
        subcomment.setUsername(subcommentRequest.getUsername());

        subcommentService.create(subcomment);

        return subcomment;
    }

    public Comment create(Comment item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
