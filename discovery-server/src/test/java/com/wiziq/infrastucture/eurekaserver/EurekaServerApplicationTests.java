package com.wiziq.infrastucture.eurekaserver;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.wiziq.infrastucture.discovery.eurekaserver.EurekaServerApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = EurekaServerApplication.class)
public class EurekaServerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
