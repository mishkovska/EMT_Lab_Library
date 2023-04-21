package finki.emt.library.backend.repository;

import finki.emt.library.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRep extends JpaRepository<Book, Long> {
}