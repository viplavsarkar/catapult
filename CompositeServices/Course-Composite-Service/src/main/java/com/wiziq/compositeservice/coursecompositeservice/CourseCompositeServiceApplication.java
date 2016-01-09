package com.wiziq.compositeservice.coursecompositeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Created by dinkarthakur on 30/12/15.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class CourseCompositeServiceApplication {

	
//	@Bean
//	AlwaysSampler alwaysSampler(){
//		return new AlwaysSampler();
//	}
	
	public static void main(String[] args) {
		SpringApplication.run(CourseCompositeServiceApplication.class, args);
	}
}
