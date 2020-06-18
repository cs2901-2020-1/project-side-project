package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Course;

public interface CourseRepository extends CrudRepository<Course, Long> {
}