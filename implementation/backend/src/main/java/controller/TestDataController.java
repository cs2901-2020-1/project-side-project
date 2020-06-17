package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.entities.Role;
import data.models.StudentSignup;
import data.models.TeacherSignup;
import services.RoleService;
import services.UsuarioService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestDataController {
    final static String clientUrl = "*";

    @Autowired
    private RoleService roleService;

    @Autowired
    private UsuarioService usuarioService;

    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public String createRoles(){
        
        if (roleService.findOneByName("TEACHER") == null) {
            Role rTeacher = new Role("TEACHER");
            roleService.create(rTeacher);

            TeacherSignup teacher = new TeacherSignup();
            teacher.setEmail("ccupe@utec.edu.pe");
            teacher.setPassword("123456");
            teacher.setName("Carlos");
            teacher.setLastName("Cupe");
            teacher.setSchool("UTEC");
            usuarioService.createTeacher(teacher);
        }

        if (roleService.findOneByName("STUDENT") == null) {
            Role rStudent = new Role("STUDENT");
            roleService.create(rStudent);

            StudentSignup student = new StudentSignup();
            student.setEmail("carlos.cupe@utec.edu.pe");
            student.setPassword("123456");
            student.setName("Carlos");
            student.setLastName("Cupe");
            student.setSchool("CMSPP");
            usuarioService.createStudent(student);
        }
        return "OK";
    }

}
