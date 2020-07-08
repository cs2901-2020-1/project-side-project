package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Lesson;

import java.util.List;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

    public List<Lesson> findByTeacherIdOrderByIdDesc(Long teacherId);
}