package finki.emt.library.backend.service.impl;

import finki.emt.library.backend.repository.AuthorRep;
import finki.emt.library.backend.model.Author;
import finki.emt.library.backend.model.Country;
import finki.emt.library.backend.model.dto.AuthorDto;
import finki.emt.library.backend.model.exceptions.CountryNotFoundException;
import finki.emt.library.backend.service.AuthorService;
import finki.emt.library.backend.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRep authorRepository;
    private final CountryService countryService;

    public AuthorServiceImpl(AuthorRep authorRepository, CountryService countryService) {
        this.authorRepository = authorRepository;
        this.countryService = countryService;
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public Optional<Author> create(AuthorDto authorDto) {
        String name = authorDto.getName();
        String surname = authorDto.getSurname();
        Long countryId = authorDto.getCountryId();

        if (name.isEmpty() || surname.isEmpty())
            return Optional.empty();

        Country country = countryService.findById(countryId).orElseThrow(() -> new CountryNotFoundException(countryId));
        Author author = new Author(name, surname, country);

        return Optional.of(authorRepository.save(author));
    }

//    @Override
//    public Optional<Author> update(Long id, String name, String surname, Long countryId) {
//        Author author = findById(id).orElseThrow(() -> new AuthorNotFoundException(id));
//        Country country = countryService.findById(countryId).orElseThrow(() -> new CountryNotFoundException(countryId));
//
//        author.setName(name);
//        author.setSurname(surname);
//        author.setCountry(country);
//
//        return Optional.of(authorRepository.save(author));
//    }

    @Override
    public void delete(Long id) {
        authorRepository.deleteById(id);
    }
}
