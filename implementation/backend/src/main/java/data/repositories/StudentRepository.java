package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Student;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
