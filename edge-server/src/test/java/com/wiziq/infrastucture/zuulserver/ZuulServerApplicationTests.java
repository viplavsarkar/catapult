package com.wiziq.infrastucture.zuulserver;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.wiziq.infrastucture.edgeserver.zuul.ZuulServerApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ZuulServerApplication.class)
public class ZuulServerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
