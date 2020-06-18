package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Lesson;

public interface LessonRepository extends CrudRepository<Lesson, Long> {
}