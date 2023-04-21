package finki.emt.library.backend.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class NotEnoughAvailableCopiesException extends RuntimeException {
    public NotEnoughAvailableCopiesException(Integer requestedCopies, Integer availableCopies) {
        super(String.format("Can't get this book, because the requested number of copies is %d and the available number of copies is %d",
                requestedCopies, availableCopies));
    }
}
