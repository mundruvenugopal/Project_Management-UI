package com.purpletalk.pm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class Index {
    @GetMapping("/home")
    public String dashboard() {
        return "forward:/AdminLogin.html";
    }
}

