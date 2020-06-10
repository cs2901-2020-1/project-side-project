package services;

import data.entities.Role;
import data.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository repository;

    public List<Role> findAll(){
        List<Role> items = new ArrayList<>();

        for (Role item :repository.findAll()) {
            items.add(item);
        }
        return items;
    }

    public Role findOneByName(String name){
        return repository.findRoleByName(name);
    }

    public Role findOne(long id){
        return repository.findById(id).get();
    }

    public Role create(Role item){
        return repository.save(item);
    }

    public void delete(Long id){
        repository.delete(findOne(id));
    }
}
