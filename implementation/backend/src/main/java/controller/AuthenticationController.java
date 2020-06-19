package controller;

import services.UserService;
import services.UsuarioService;
import config.JwtTokenUtil;
import data.entities.*;
import data.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UsuarioService usuarioService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<AuthToken> webLogin(@RequestBody LoginWeb loginUser) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));
        final Usuario user = userService.findOne(loginUser.getEmail());
        final String token = jwtTokenUtil.generateToken(user);
        final String role = user.getRole().getName();
        final String fullName = user.getFullName();
        return new ResponseEntity<>(new AuthToken(user.getId().toString(), fullName, token, role), HttpStatus.OK);
    }

    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public ResponseEntity<?> webStudentSignin(@RequestBody StudentSignup student) {
        if (usuarioService.findOneByEmail(student.getEmail()) != null) {
            return new ResponseEntity<>("Correo ya existente", HttpStatus.CONFLICT);    
        }
        final Usuario user = usuarioService.createStudent(student);
        final String token = jwtTokenUtil.generateToken(user);
        final String role = user.getRole().getName();
        final String fullName = user.getFullName();
        return new ResponseEntity<>(new AuthToken(user.getId().toString(), fullName, token, role), HttpStatus.OK);
    }

    @RequestMapping(value = "/teacher", method = RequestMethod.POST)
    public ResponseEntity<?> webTeacherSignin(@RequestBody TeacherSignup teacher) {
        if (usuarioService.findOneByEmail(teacher.getEmail()) != null) {
            return new ResponseEntity<>("Correo ya existente", HttpStatus.CONFLICT);    
        }
        final Usuario user = usuarioService.createTeacher(teacher);
        final String token = jwtTokenUtil.generateToken(user);
        final String role = user.getRole().getName();
        final String fullName = user.getFullName();
        return new ResponseEntity<>(new AuthToken(user.getId().toString(), fullName, token, role), HttpStatus.OK);
    }
}
