package com.wiziq.service.ms.userregistration.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Registration {

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String hello() {
		System.out.println("sdfasd");
		return "hiiiiiiii Dinkar  rtrt";
	}

}
