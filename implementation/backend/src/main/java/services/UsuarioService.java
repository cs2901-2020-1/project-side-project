package services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import data.entities.Role;
import data.entities.Student;
import data.entities.Teacher;
import data.entities.Usuario;
import data.models.*;
import data.repositories.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;

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

    public Usuario findOne(Long id){
        return repository.findById(id).get();
    }

    public Usuario createStudent(StudentSignup studentSignup) {
        Role role = roleService.findOneByName("STUDENT");
        Usuario user = studentSignup.getUsuario();
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        user.setRole(role);

        Student student = studentSignup.getStudent();
        user.setStudent(student);
        student.setUser(user);

        studentService.create(student);
        return user;
    }

    public Usuario createTeacher(TeacherSignup teacherSignup) {
        Role role = roleService.findOneByName("TEACHER");
        Usuario user = teacherSignup.getUsuario();
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        user.setRole(role);

        Teacher teacher = teacherSignup.getTeacher();
        user.setTeacher(teacher);
        teacher.setUser(user);

        teacherService.create(teacher);
        return user;
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}