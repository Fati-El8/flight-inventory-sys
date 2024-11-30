package com.next1.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hello {
    @GetMapping("yahya")
    public String sayhello(){
        return "hello yahya";
    }
}
