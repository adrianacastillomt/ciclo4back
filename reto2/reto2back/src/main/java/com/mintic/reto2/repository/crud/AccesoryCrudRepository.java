package com.mintic.reto2.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mintic.reto2.model.Accesory;


public interface AccesoryCrudRepository extends MongoRepository<Accesory, String>{
	

}
