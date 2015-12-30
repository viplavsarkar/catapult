package com.wiziq.compositeservice.coursecompositeservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by dinkarthakur on 30/12/15.
 */
@RestController
@RequestMapping(value = "/course")
public class CourseController {
    @RequestMapping(value = "/create")
    public String Create(){
        return "hello";
    }
}
