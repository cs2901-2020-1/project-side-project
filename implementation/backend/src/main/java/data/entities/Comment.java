package data.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

import data.models.CommentModel;
import data.models.SubcommentModel;

import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "comment")
public class Comment implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String content;
    
    @Column(updatable = false)
    @CreationTimestamp
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @JsonIgnore
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Subcomment> subcomments = new HashSet<>();

    public Comment() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public Set<Subcomment> getSubcomments() {
        return subcomments;
    }

    public void setSubcomments(Set<Subcomment> subcomments) {
        this.subcomments = subcomments;
    }

    public CommentModel getModel() {
        CommentModel model = new CommentModel();

        model.setContent(content);
        model.setDate(date);
        model.setId(id);
        model.setEmail(user.getEmail());
        model.setFullName(user.getFullName());

        List<SubcommentModel> items = new ArrayList<SubcommentModel>();
        for (Subcomment subcomment : this.subcomments) {
            items.add(subcomment.getModel());
        }
        model.setSubcomments(items);

        return model;
    }
}