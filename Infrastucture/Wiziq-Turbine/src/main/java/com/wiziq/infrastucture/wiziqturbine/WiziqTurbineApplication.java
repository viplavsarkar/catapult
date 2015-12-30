package com.wiziq.infrastucture.wiziqturbine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.turbine.stream.EnableTurbineStream;

@SpringBootApplication
@EnableTurbineStream
@EnableDiscoveryClient
public class WiziqTurbineApplication {

	public static void main(String[] args) {
		SpringApplication.run(WiziqTurbineApplication.class, args);
	}
}
