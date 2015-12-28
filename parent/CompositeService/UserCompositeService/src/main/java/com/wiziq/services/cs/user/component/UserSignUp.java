package com.wiziq.services.cs.user.component;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.stereotype.Component;

@Component
public class UserSignUp {

	@NotNull
	private String userEmail;
	
	@NotNull
	@NotEmpty
	private String password;
	
	

}
