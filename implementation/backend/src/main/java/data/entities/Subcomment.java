package data.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import data.models.SubcommentModel;

import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "subcomment")
public class Subcomment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Column(updatable = false)
    @CreationTimestamp
    private Date date;

    private String username;

    private String user_to;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;


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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUser_to() {
        return user_to;
    }

    public void setUser_to(String user_to) {
        this.user_to = user_to;
    }

    @JsonIgnore
    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public SubcommentModel getModel() {
        SubcommentModel model = new SubcommentModel();

        model.setUsername(username);
        model.setUser_to(user_to);
        model.setDate(date);
        model.setContent(content);

        return model;
    }
}
