package com.wiziq.infrastucture.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;
/**
 * Created by dinkarthakur on 30/12/15.
 */
@SpringBootApplication
@EnableConfigServer
@EnableDiscoveryClient
@EnableCircuitBreaker
public class ConfigServerApplication {

    public static void main(String[] args) {


        SpringApplication.run(ConfigServerApplication.class, args);


    }
}
