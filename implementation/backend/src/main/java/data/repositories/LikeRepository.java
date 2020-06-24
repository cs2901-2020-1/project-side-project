package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Lesson;
import data.entities.Like;
import data.entities.Usuario;

public interface LikeRepository extends CrudRepository<Like, Long> {
    Like findLikeByUser(Usuario user);
    Like findLikeByUserAndLesson(Usuario user, Lesson lesson);
}