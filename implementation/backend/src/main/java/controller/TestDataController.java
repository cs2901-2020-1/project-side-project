package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.entities.Course;
import data.entities.Role;
import data.entities.Topic;
import data.models.AppRequest;
import data.models.StudentSignup;
import data.models.TeacherSignup;
import services.CourseService;
import services.LessonService;
import services.RoleService;
import services.TopicService;
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

    @Autowired
    private CourseService courseService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private LessonService lessonService;

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
        createData();
        return "OK";
    }

    public String createData(){
        
        Course c1 = new Course();
        c1.setName("Matematica");
        courseService.create(c1);

        Topic t1 = new Topic();
        t1.setName("Polinomios");
        t1.setDescription("Definición de polinomio, aritmetica polinomial, suma y resta de polinomios, multiplicación de polinomios");
        t1.setCourse(c1);
        topicService.create(t1);

        Topic t2 = new Topic();
        t2.setName("Factorización de polinomios");
        t2.setDescription("Factorizando monomios, Factores comunes de binomios y trinomios, factorizando polinomios de grado superior");
        t2.setCourse(c1);
        topicService.create(t2);

        Topic t3 = new Topic();
        t3.setName("División polinomial");
        t3.setDescription("Métodos para dividir polinomios, Teorema del resto, dividiendo polinomios por factores lineales");
        t3.setCourse(c1);
        topicService.create(t3);


        Course c2 = new Course();
        c2.setName("Física");
        courseService.create(c2);

        Topic t4 = new Topic();
        t4.setName("Cinemática");
        t4.setDescription("Movimiento rectilineo, vectores movimiento curvilineo");
        t4.setCourse(c2);
        topicService.create(t4);

        Topic t5 = new Topic();
        t5.setName("Leyes de Newton");
        t5.setDescription("Primera, Segunda y tercera ley de Newton");
        t5.setCourse(c2);
        topicService.create(t5);

        Topic t6 = new Topic();
        t6.setName("Leyes de Conservación");
        t6.setDescription("Conservación de la energia, trabajo, potencia. Conservación de la cantidad de movimiento");
        t6.setCourse(c2);
        topicService.create(t6);
        

        AppRequest ap1 = new AppRequest();
        ap1.setTitle("Aritmetica polinomial");
        ap1.setDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fugit repudiandae nobis itaque mollitia unde qui molestiae ipsam soluta ratione.");
        ap1.setVideoPath("video.mp4");
        ap1.setTopicId(t1.getId());
        ap1.setTeacherId(1L);
        lessonService.createAppLesson(ap1);

        AppRequest ap2 = new AppRequest();
        ap2.setTitle("Introducción a los polinomios");
        ap2.setDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fugit repudiandae nobis itaque mollitia unde qui molestiae ipsam soluta ratione.");
        ap2.setVideoPath("video.mp4");
        ap2.setTopicId(t1.getId());
        ap2.setTeacherId(1L);
        lessonService.createAppLesson(ap2);

        AppRequest ap3 = new AppRequest();
        ap3.setTitle("Factorizando monomios");
        ap3.setDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fugit repudiandae nobis itaque mollitia unde qui molestiae ipsam soluta ratione.");
        ap3.setVideoPath("video.mp4");
        ap3.setTopicId(t2.getId());
        ap3.setTeacherId(1L);
        lessonService.createAppLesson(ap3);

        AppRequest ap4 = new AppRequest();
        ap4.setTitle("Métodos para dividir polinomios");
        ap4.setDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fugit repudiandae nobis itaque mollitia unde qui molestiae ipsam soluta ratione.");
        ap4.setVideoPath("video.mp4");
        ap4.setTopicId(t3.getId());
        ap4.setTeacherId(1L);
        lessonService.createAppLesson(ap4);

        AppRequest ap5 = new AppRequest();
        ap5.setTitle("Teorema del resto");
        ap5.setDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et fugit repudiandae nobis itaque mollitia unde qui molestiae ipsam soluta ratione.");
        ap5.setVideoPath("video.mp4");
        ap5.setTopicId(t3.getId());  
        ap5.setTeacherId(1L);
        lessonService.createAppLesson(ap5);
        return "OK";
    }
}
