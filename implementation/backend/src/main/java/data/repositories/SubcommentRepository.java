package data.repositories;

import data.entities.Subcomment;
import org.springframework.data.repository.CrudRepository;

public interface SubcommentRepository extends CrudRepository<Subcomment, Long> {
}
