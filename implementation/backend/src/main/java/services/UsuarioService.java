package services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import data.entities.Role;
import data.entities.Usuario;
import data.models.StudentSignin;
import data.models.TeacherSignin;
import data.repositories.RoleRepository;
import data.repositories.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public List<Usuario> findAll(){
        List<Usuario> items = new ArrayList<>();

        for (Usuario item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Usuario findOneByEmail(String email){
        return repository.findUsuarioByEmail(email);
    }

    public Usuario findOne(long id){
        return repository.findById(id).get();
    }

    public Usuario createStudent(StudentSignin user) {
        Usuario newUser = new Usuario();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        Role role = roleRepository.findRoleByName("STUDENT");
        newUser.setRole(role);

        return repository.save(newUser);
    }

    public Usuario createTeacher(TeacherSignin user) {
        Usuario newUser = new Usuario();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        Role role = roleRepository.findRoleByName("TEACHER");
        newUser.setRole(role);
        
        return repository.save(newUser);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}