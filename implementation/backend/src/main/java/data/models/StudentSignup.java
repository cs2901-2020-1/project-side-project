package data.models;

import java.util.Date;

import data.entities.Student;
import data.entities.Usuario;

public class StudentSignup {
    
    private String email;
    private String password;
    
    private String name;
    private String lastName;

    private String school;
    private String schoolYear;
    private Date birthdate;

    public StudentSignup() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(String schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Usuario getUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setPassword(password);
        usuario.setName(name);
        usuario.setLastName(lastName);
        return usuario;
    }

    public Student getStudent() {
        Student student = new Student();
        student.setSchool(school);
        student.setSchoolYear(schoolYear);
        student.setBirthdate(birthdate);
        return student;
    }
}