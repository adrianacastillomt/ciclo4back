package com.mintic.reto2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mintic.reto2.model.Accesory;
import com.mintic.reto2.repository.crud.AccesoryCrudRepository;

@Repository
public class AccesoryRepository {

	@Autowired
	private AccesoryCrudRepository repositorio;

	public List<Accesory> findAll() {
		return repositorio.findAll();
	}

	public Optional<Accesory> getAccesory(String reference) {
		return repositorio.findById(reference);
	}

	public Accesory create(Accesory accesory) {
		return repositorio.save(accesory);
	}

	public void update(Accesory accesory) {
		repositorio.save(accesory);
	}

	public void delete(Accesory accesory) {
		repositorio.delete(accesory);
	}
	
}
