package angular.kit.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PrefillController {

    @GetMapping("/")
    public String hello() {
        return "Hello World";
    }
}