package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.entities.Role;
import data.entities.Usuario;
import services.RoleService;
import services.UserService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestDataController {
    final static String clientUrl = "*";

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public String createRoles(){
        
        if (roleService.findOneByName("TEACHER") == null) {
            Role teacher = new Role("TEACHER");
            teacher = roleService.create(teacher);

            Usuario uTeacher = new Usuario();
            uTeacher.setEmail("ccupe@utec.edu.pe");
            uTeacher.setPassword("123456");
            uTeacher.setRole(teacher);
            userService.updatePasswordByObject(uTeacher);
        }

        if (roleService.findOneByName("STUDENT") == null) {
            Role student = new Role("STUDENT");
            student = roleService.create(student);

            Usuario uStudent = new Usuario();
            uStudent.setEmail("carlos.cupe@utec.edu.pe");
            uStudent.setPassword("123456");
            uStudent.setRole(student);
            userService.updatePasswordByObject(uStudent);
        }
        return "OK";
    }

}
