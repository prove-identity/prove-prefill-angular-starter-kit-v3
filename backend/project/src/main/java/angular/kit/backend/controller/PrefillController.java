package angular.kit.backend.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrefillController {

    @GetMapping("/")
    public string hello() {
        return "Hello World";
    }
}