package services;

import data.entities.Lesson;
import data.entities.Like;
import data.entities.Usuario;
import data.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LikeService {

    @Autowired
    private LikeRepository repository;

    public List<Like> findAll(){
        List<Like> items = new ArrayList<>();

        for (Like item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Like findOneByUser(Usuario user){
        return repository.findLikeByUser(user);
    }

    public Like findOneByUserAndLesson(Usuario user, Lesson lesson){
        return repository.findLikeByUserAndLesson(user, lesson);
    }

    public Like findOne(Long id){
        return repository.findById(id).get();
    }

    public Like create(Like item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }

    public void deleteClass(Like like){
        repository.delete(like);
    }
}
