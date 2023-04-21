package finki.emt.library.backend.repository;

import finki.emt.library.backend.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRep extends JpaRepository<Author, Long> {
}
