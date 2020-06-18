package data.entities;

import javax.persistence.*;
import java.io.Serializable;
//import java.util.Set;

@Entity
@Table(name = "likes")
public class Like implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;    
    /*
    @Column(nullable = false)
    private Usuario user;

    @Column(nullable = false)
    private Lesson lesson;
    */
}