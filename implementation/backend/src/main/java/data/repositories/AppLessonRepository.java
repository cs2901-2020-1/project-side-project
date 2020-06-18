package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.AppLesson;

public interface AppLessonRepository extends CrudRepository<AppLesson, Long> {
}