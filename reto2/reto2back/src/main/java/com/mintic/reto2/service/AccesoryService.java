package com.mintic.reto2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mintic.reto2.model.Accesory;
import com.mintic.reto2.repository.AccesoryRepository;

@Service
public class AccesoryService {

	@Autowired
	private AccesoryRepository repositorio;

	public List<Accesory> listarAccesorios() {
		return repositorio.findAll();

	}

	public Optional<Accesory> getAccesory(String reference) {
		return repositorio.getAccesory(reference);
	}

	public Accesory create(Accesory accesory) {

		if (accesory.getReference() == null) {
			return accesory;
		} else {
			return repositorio.create(accesory);

		}
	}

	public Accesory update(Accesory accesory) {

		if (accesory.getReference() != null) {
			Optional<Accesory> accesoryDb = repositorio.getAccesory(accesory.getReference());

			if (!accesoryDb.isEmpty()) {

				if (accesory.getBrand() != null) {
					accesoryDb.get().setBrand(accesory.getBrand());
				}
				if (accesory.getCategory() != null) {
					accesoryDb.get().setCategory(accesory.getCategory());
				}
				if (accesory.getMaterial() != null) {
					accesoryDb.get().setMaterial(accesory.getMaterial());
				}
				if (accesory.getDescription() != null) {
					accesoryDb.get().setDescription(accesory.getDescription());
				}
				if (accesory.getPrice() != 0.0) {
					accesoryDb.get().setPrice(accesory.getPrice());
				}
				if (accesory.getQuantity() != 0) {
					accesoryDb.get().setQuantity(accesory.getQuantity());
				}
				if (accesory.getPhotography() != null) {
					accesoryDb.get().setPhotography(accesory.getPhotography());
				}

				repositorio.update(accesoryDb.get());
				return accesoryDb.get();
			} else {
				return accesory;
			}
		} else {
			return accesory;
		}
	}

	public boolean delete(String reference) {
		Boolean aBoolean = getAccesory(reference).map(accesory -> {
			repositorio.delete(accesory);
			return true;
		}).orElse(false);
		return aBoolean;
	}

}