package data.repositories;

import org.springframework.data.repository.CrudRepository;

import data.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long> {
    Usuario findUsuarioByEmail(String email);
}
