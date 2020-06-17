package data.models;

public class AuthToken {

    private String userId;
    private String token;
    private String role;

    public AuthToken() {}

    public AuthToken(String userId, String token, String role){
        this.userId = userId;
        this.token = token;
        this.role = role;
    }

    public AuthToken(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
