package finki.emt.library.backend.repository;

import finki.emt.library.backend.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRep extends JpaRepository<Country, Long> {
}
