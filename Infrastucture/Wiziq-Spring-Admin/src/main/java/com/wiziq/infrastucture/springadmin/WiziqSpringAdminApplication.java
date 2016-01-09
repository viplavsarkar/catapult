package com.wiziq.infrastucture.springadmin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.boot.admin.config.EnableAdminServer;

@SpringBootApplication
@EnableAdminServer
public class WiziqSpringAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(WiziqSpringAdminApplication.class, args);
	}
}
