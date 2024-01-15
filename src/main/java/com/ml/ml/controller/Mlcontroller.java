package com.ml.ml.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Mlcontroller {

    @RequestMapping("/")
    public String re(){
        return "index";
    }
}
