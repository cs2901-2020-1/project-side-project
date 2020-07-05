package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Teacher;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {

    public Teacher findByUserId(Long userId);
}
