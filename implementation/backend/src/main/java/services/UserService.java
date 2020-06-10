package services;

import data.entities.Usuario;
import data.entities.Role;
import data.repositories.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service(value = "userService")
public class UserService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = repository.findUsuarioByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private List<SimpleGrantedAuthority> getAuthority(Usuario user) {
        Role role = user.getRole();
        return Arrays.asList(new SimpleGrantedAuthority(role.getName()));
    }

    public List<Usuario> findAll() {
        List<Usuario> list = new ArrayList<>();
        repository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    public void delete(long id) {
        repository.deleteById(id);
    }

    public Usuario findOne(String username) {
        return repository.findUsuarioByEmail(username);
    }

    public Usuario findById(long id) {
        Optional<Usuario> optionalUser = repository.findById(id);
        return optionalUser.isPresent() ? optionalUser.get() : null;
    }

    public Usuario updatePassword(Long codigo) {
        Usuario user = findById(codigo);
        if(user != null) {
            user.setPassword(bcryptEncoder.encode(user.getPassword()));
            repository.save(user);
        }
        return user;
    }

    public Usuario save(Usuario user) {
        Usuario newUser = new Usuario();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        return repository.save(newUser);
    }

    public String getUsername() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        if (authentication == null) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return null;
    }

    public Usuario getCurrentUser() {
        String username = getUsername();
        Usuario currentUser = findOne(username);
        return currentUser;
    }

    public Long getCurrentUserRoleId() {
        return getCurrentUser().getRole().getId();
    }

    public Usuario updatePasswordByObject(Usuario item) {
        item.setPassword(bcryptEncoder.encode(item.getPassword()));
        return repository.save(item);
    }

    public Boolean isSuperAdmin() {
        return this.getCurrentUserRoleId() == 1;
    }
}
