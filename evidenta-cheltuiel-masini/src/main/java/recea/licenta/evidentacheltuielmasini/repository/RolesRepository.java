package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.Role;

public interface RolesRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
