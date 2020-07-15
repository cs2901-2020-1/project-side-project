package data.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import data.entities.AppLesson;

public interface AppLessonRepository extends CrudRepository<AppLesson, Long> {

    public List<AppLesson> findByApproved(Boolean approved);
}