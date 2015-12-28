package com.wiziq.services.cs.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@Service
public class FeignService  {

	@Autowired
    private UserRegistrationClient userRegistrationClient;
	
	@FeignClient(value="USERMICROSERVICE")
	public interface UserRegistrationClient {
	    @RequestMapping(method = RequestMethod.GET, value = "/test")
	    String hello();
	}
	
    @HystrixCommand(fallbackMethod = "fallback")
    public String feignClient() {
        String messageBean = userRegistrationClient.hello();
        System.out.println("yahooo");
        return messageBean;
    }

    @SuppressWarnings("unused")
	private String fallback() {
       // MessageBean messageBean = new MessageBean("Fallback Method");
        System.out.println("dinkar");
        return "kjkj";
    }

	
	
}
