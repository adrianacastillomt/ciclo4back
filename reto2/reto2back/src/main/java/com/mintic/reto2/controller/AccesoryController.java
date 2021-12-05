package com.mintic.reto2.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mintic.reto2.model.Accesory;
import com.mintic.reto2.service.AccesoryService;

@CrossOrigin
@RestController
@RequestMapping("/api/accessory")

public class AccesoryController {

	@Autowired
	private AccesoryService servicio;

	@GetMapping("/all")
	public List<Accesory> listarAccesorios() {
		return servicio.listarAccesorios();
	}

	@GetMapping("/{reference}")
	public Optional<Accesory> getAccesory(@PathVariable("reference") String reference) {
		return servicio.getAccesory(reference);
	}

	@PostMapping("/new")
	@ResponseStatus(HttpStatus.CREATED)
	public Accesory create(@RequestBody Accesory accesory) {
		return servicio.create(accesory);
	}

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Accesory update(@RequestBody Accesory accesory) {
		return servicio.update(accesory);
	}

	@DeleteMapping("/{reference}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable("reference") String reference) {
		return servicio.delete(reference);
	}

}
