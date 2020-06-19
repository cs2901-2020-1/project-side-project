package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {
}
