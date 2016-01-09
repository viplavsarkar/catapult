package com.wiziq.infrastucture.edgeserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
@EnableCircuitBreaker
public class EdgeServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EdgeServerApplication.class, args);
    }
}
