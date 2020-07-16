package data.models;

import java.util.Date;

public class SubcommentModel {

    private String username;
    private String user_to;
    private String content;
    private Date date;

    public SubcommentModel() {}

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

    public Boolean getIsResponse() {
        return this.user_to.length() > 0;
    }
}
