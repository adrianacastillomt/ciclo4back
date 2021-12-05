package com.mintic.reto2;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mintic.reto2.model.User;
import com.mintic.reto2.repository.crud.AccesoryCrudRepository;
import com.mintic.reto2.repository.crud.UserCrudRepository;

@SpringBootApplication
public class Reto2Application implements CommandLineRunner {

	@Autowired
	private UserCrudRepository userRepo;

	@Autowired
	private AccesoryCrudRepository accesoryCrud;

	public static void main(String[] args) {
		SpringApplication.run(Reto2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepo.deleteAll();
		accesoryCrud.deleteAll();
		
//		SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
//		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		
		
//		userRepo.saveAll
//				(List.of(		
//				new User (1, "1212121", "Juana La Loca", "cll 34", "3124932614", "adri@gmail.com", "123", "Zona 1", "ADM"),
//				new User (2, "1212121", "Tutu Messias el loco", "cra 14", "3124032614", "tutu@gmail.com", "123", "Zona 1", "ADM")
//
//						
//						));
//		
//		accesoryCrud.saveAll
//			(List.of(
//					new Accesory("ap902", "Acme", "material1", "presentaicon1", "descripción", true, 233, 2, "adri")
//			
//					));
//					
//			
//	System.out.println("Listado de usuarios");
//	userRepo.findAll().forEach(System.out::println);
//	
//	System.out.println("Listado de usuarios");
//	accesoryCrud.findAll().forEach(System.out::println);
//	
	
//	Optional<User> usuario = userRepo.findByEmail("adri@gmail.com");
//	
//	if (usuario.isPresent()) {
//		System.out.println("datos del usuario: " +usuario.get());
//	}
//	
//	usuario = userRepo.findByEmailAndPassword ("tutu@gmail.com", "123");
//	
//	if (usuario.isPresent()) {
//		System.out.println("datos del usuario: " +usuario.get());
//	}
//	
		
	}

}
