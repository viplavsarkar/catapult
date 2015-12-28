package com.wiziq.services.cs.user.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.wiziq.services.cs.user.service.FeignService;

@RestController
public class User {

	private final AtomicLong counter = new AtomicLong();

   @Autowired
    private FeignService feignService;
	
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public String feignClient() {
		System.out.println(counter.incrementAndGet() + ". ServiceBController.feignClient");
	    return feignService.feignClient();
	}

	 @RequestMapping(value = "/test", method = RequestMethod.GET)
	 @HystrixCommand(fallbackMethod = "defaultProductComposite")
	 public ResponseEntity<String> test() {
	 System.out.println(counter.incrementAndGet() + ". Userconposite Servic Test");
	 return new ResponseEntity<String>("hello", HttpStatus.OK);
	 }
	 public ResponseEntity<String> defaultProductComposite() {
	
	 return new ResponseEntity<String>("", HttpStatus.BAD_GATEWAY);
	 }

}
