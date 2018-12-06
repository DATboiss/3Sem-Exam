package entity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.mindrot.jbcrypt.BCrypt;

@Entity
@Table(name = "users")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "email", length = 25)
    private String email;

    @Basic(optional = false)
    @NotNull
    @Column(name = "name", length = 25)
    private String name;

    @Basic(optional = false)
    @NotNull
    @Column(name = "city", length = 25)
    private String city;

    @Basic(optional = false)
    @NotNull
    @Column(name = "username", length = 25)
    private String username;

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "user_pass")
    private String userPass;

    @JoinTable(name = "user_roles", joinColumns = {
        @JoinColumn(name = "username", referencedColumnName = "username")}, inverseJoinColumns = {
        @JoinColumn(name = "role_name", referencedColumnName = "role_name")})
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<Role> roleList = new ArrayList();

    public List<String> getRolesAsStrings() {
        if (roleList.isEmpty()) {
            return null;
        }
        List<String> rolesAsStrings = new ArrayList();
        for (Role role : roleList) {
            rolesAsStrings.add(role.getRoleName());
        }
        return rolesAsStrings;
    }

    public User() {
    }

    public boolean verifyPassword(String pw) {
        return BCrypt.checkpw(pw, userPass);
    }

    public User(String username, String userPass) {
        this.username = username;
        this.userPass = BCrypt.hashpw(userPass, BCrypt.gensalt());
    }

    public User(String email, String name, String city, String username, String userPass) {
        this.email = email;
        this.name = name;
        this.city = city;
        this.username = username;
        this.userPass = BCrypt.hashpw(userPass, BCrypt.gensalt());
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserPass() {
        return this.userPass;
    }

    public void setUserPass(String userPass) {
        this.userPass = userPass;
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    public void addRole(Role userRole) {
        roleList.add(userRole);
    }

    public void encryptUserPass() {
        this.setUserPass(BCrypt.hashpw(this.getUserPass(), BCrypt.gensalt()));
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", email=" + email + ", name=" + name + ", city=" + city + ", userName=" + username + ", userPass=" + userPass + ", roleList=" + roleList + '}';
    }

}
