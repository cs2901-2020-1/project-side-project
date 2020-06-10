package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}
