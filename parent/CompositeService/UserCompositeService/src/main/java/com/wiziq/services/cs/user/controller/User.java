package com.wiziq.services.cs.user.controller;

import java.util.concurrent.atomic.AtomicLong;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wiziq.services.cs.user.component.UserSignUp;
import com.wiziq.services.cs.user.service.FeignService;

@RestController
public class User {

	private final AtomicLong counter = new AtomicLong();

	@Autowired
	private FeignService feignService;

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String feignClient(@Valid @RequestBody UserSignUp userSignUp, BindingResult bindResult){
		System.out.println(counter.incrementAndGet() + ". ServiceBController.feignClient");
		//if(bindResult.hasErrors()) return bindResult.getAllErrors();
		return feignService.feignClient();
	}

}
