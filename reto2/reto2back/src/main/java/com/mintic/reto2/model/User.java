package com.mintic.reto2.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	private Integer id;
	private String identification;
	private String name;
//	private Date birthDay;
//	private String monthBirthDay;
	private String address;
	private String cellPhone;
	private String email;
	private String password;
	private String zone;
	private String type;

}
