package finki.emt.library.backend.config;

import finki.emt.library.backend.model.dto.AuthorDto;
import finki.emt.library.backend.model.dto.BookDto;
import finki.emt.library.backend.model.dto.CountryDto;
import finki.emt.library.backend.model.enumerations.BookCategory;
import finki.emt.library.backend.service.AuthorService;
import finki.emt.library.backend.service.BookService;
import finki.emt.library.backend.service.CountryService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataInitializer {
    private final BookService bookService;
    private final AuthorService authorService;
    private final CountryService countryService;

    public DataInitializer(BookService bookService, AuthorService authorService, CountryService countryService) {
        this.bookService = bookService;
        this.authorService = authorService;
        this.countryService = countryService;
    }

    private BookCategory randomizeCategory(int number) {
        if (number % 7 == 1) return BookCategory.NOVEL;
        if (number % 7 == 2) return BookCategory.THRILLER;
        if (number % 7 == 3) return BookCategory.HISTORY;
        if (number % 7 == 4) return BookCategory.FANTASY;
        if (number % 7 == 5) return BookCategory.BIOGRAPHY;
        if (number % 7 == 6) return BookCategory.CLASSICS;
        return BookCategory.DRAMA;
    }


    @PostConstruct
    public void initData() {
        for (int i = 1; i < 11; i++) {
            CountryDto countryDto = new CountryDto("Country " + i, "Continent " + i);
            this.countryService.create(countryDto);
            AuthorDto authorDto = new AuthorDto("AuthorName " + i, "AuthorSurname " + i, countryService.listAll().get(i - 1).getId());
            this.authorService.create(authorDto);
            BookDto bookDto = new BookDto("BookName " + i, randomizeCategory(i), authorService.findAll().get(i - 1).getId(), i * 100);
            this.bookService.create(bookDto);
        }
    }
}
