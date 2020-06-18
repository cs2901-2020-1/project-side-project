package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Topic;

public interface TopicRepository extends CrudRepository<Topic, Long> {
}