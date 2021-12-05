package com.mintic.reto2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mintic.reto2.model.User;
import com.mintic.reto2.repository.crud.UserCrudRepository;

@Repository
public class UserRepository {

	@Autowired
	private UserCrudRepository repositorio;

	public Optional<User> getUser(int id) {
		return repositorio.findById(id);
	}

	public void update(User user) {
		repositorio.save(user);
	}

	public User create(User user) {
		return repositorio.save(user);
	}

	public List<User> findAll() {
		return repositorio.findAll();
	}

	public boolean existeEmail(String email) {
		Optional<User> usuario = repositorio.findByEmail(email);
		return usuario.isPresent();
	}

	public Optional<User> authenticateUser(String email, String password) {
		return repositorio.findByEmailAndPassword(email, password);
	}

	public void delete(User user) {
		repositorio.delete(user);
	}

	public Optional<User> lastUserId() {
		return repositorio.findTopByOrderByIdDesc();
	}
}
