package data.models;

import java.util.Date;
import java.util.List;

public class CommentModel {

    private String fullName;
    private String email;
    private String content;
    private Date date;
    private List<SubcommentModel> subcomments;

    public CommentModel() {}

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public List<SubcommentModel> getSubcomments() {
        return subcomments;
    }

    public void setSubcomments(List<SubcommentModel> subcomments) {
        this.subcomments = subcomments;
    }
}
