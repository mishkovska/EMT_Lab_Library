package finki.emt.library.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidNumberOfBookCopiesException extends RuntimeException {
    public InvalidNumberOfBookCopiesException() {
        super("The number of books cannot be less than zero");
    }
}
