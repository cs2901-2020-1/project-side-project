package data.models;

public class TeacherSignin {
    
    private String email;
    private String password;

    public TeacherSignin() {}

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
}