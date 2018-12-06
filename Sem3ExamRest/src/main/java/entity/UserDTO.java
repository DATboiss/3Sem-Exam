package entity;

/**
 *
 * @author adams
 */
public class UserDTO {
    private String username;
    private String email;
    private String name;
    private String city;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.name = user.getName();
        this.city = user.getCity();
    }
    
    
    
}
