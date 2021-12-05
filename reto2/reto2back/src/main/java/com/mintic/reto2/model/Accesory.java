package com.mintic.reto2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "accesories")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Accesory {
	
	@Id
	private String reference;
	private String brand;
	private String category;
	private String material;
	private String description;
	private boolean avaliability = true;
	private double price;
	private int quantity;
	private String photography;
	
	

}
