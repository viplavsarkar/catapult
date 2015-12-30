package com.wiziq.infrastucture.clouddashboard;

import com.github.vanroy.cloud.dashboard.config.EnableCloudDashboard;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableCloudDashboard
@EnableDiscoveryClient
public class WiziqCloudDashBoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(WiziqCloudDashBoardApplication.class, args);
	}
}
