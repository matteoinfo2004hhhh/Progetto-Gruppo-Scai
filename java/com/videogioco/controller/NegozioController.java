package com.videogioco.controller;

import com.videogioco.model.DescrizioneVideogioco;
import com.videogioco.model.Videogioco;
import com.videogioco.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/negozio")
@CrossOrigin(origins = "*")
public class NegozioController {

    @Autowired
    private DatabaseService databaseService;
    private static final Logger logger = LogManager.getLogger(NegozioController.class);
    @PostMapping("/aggiungiVideogioco")
    public ResponseEntity<Void> aggiungiVideogioco(
            @RequestBody Videogioco videogioco) {
        logger.info("chiamato servizio /aggiungiVideogioco");
        databaseService.aggiungiVideogioco(videogioco);
        URI location = null;
        return ResponseEntity.created(location)
                .build();
    }

    @GetMapping("/getCatalogo")
    public List<Videogioco> getCatalogo() {
        logger.info("chiamato servizio /getCatalogo");
        List<Videogioco> catalogo = databaseService.findAll();
        return catalogo;
    }

    @GetMapping("/findVideogioco")
    public ResponseEntity<Videogioco> findVideogioco(
            @RequestParam(value = "nomeVideogioco") String nomeVideogioco) {
        Videogioco videogioco = databaseService.findVideogioco(nomeVideogioco);
        logger.info("chiamato servizio /findVideogioco");
        if (videogioco != null) {
            return ResponseEntity.ok().body(videogioco);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateVideogioco")
    public Videogioco updateVideogioco(
            @RequestBody Videogioco videogioco) {
        logger.info("chiamato servizio /updateVideogioco");
        databaseService.updateVideogioco(videogioco);
        return videogioco;
    }

    @PostMapping("/deleteVideogioco")
    public ResponseEntity<Void> deleteVideogioco(
            @RequestParam(value = "nomeVideogioco") String nomeVideogioco) {
        logger.info("chiamato servizio /deleteVideogioco");
        databaseService.deleteVideogioco(nomeVideogioco);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/aggiungiCopie")
    public Videogioco aggiungiCopie(

            @RequestParam(value = "nomeVideogioco") String nomeVideogioco,
            @RequestParam(value = "numeroCopie") int numeroCopie) {

        Optional<Videogioco> videogiocoOptional = Optional.ofNullable(databaseService.findVideogioco(nomeVideogioco));
        logger.info("chiamato servizio /aggiungiCopie");
        if (videogiocoOptional.isPresent()) {
            Videogioco videogioco = videogiocoOptional.get();
            videogioco.setQuantitaG(videogioco.getQuantitaG() + numeroCopie);
            databaseService.updateVideogioco(videogioco);
            return videogioco;
        } else {
            return null;
        }
    }

    @PostMapping("/nuovoPrezzo")
    public Videogioco NuovoPrezzo(

            @RequestParam(value = "nomeVideogioco") String nomeVideogioco,
            @RequestParam(value = "numeroPrezzo") int numeroPrezzo) {

        Optional<Videogioco> videogiocoOptional = Optional.ofNullable(databaseService.findVideogioco(nomeVideogioco));
        logger.info("chiamato servizio /niovoprezzo");
        if (videogiocoOptional.isPresent()) {
            Videogioco videogioco = videogiocoOptional.get();
            videogioco.setPrezzoG(videogioco.getPrezzoG() + numeroPrezzo);
            databaseService.updateVideogioco(videogioco);
            return videogioco;
        } else {
            return null;
        }
    }



    // Costruttore che accetta un oggetto DatabaseService
    public NegozioController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/findDettaglioVideogioco")
    public DescrizioneVideogioco findDescrizioneVideogioco(String nomeVideogioco) {
        DescrizioneVideogioco descrizioneVideogioco = databaseService.findDescrizioneVideogioco(nomeVideogioco);
        return descrizioneVideogioco;
    }

    @PostMapping("/vendiCopie")
    public Videogioco vendiCopie(

            @RequestParam(value = "nomeVideogioco") String nomeVideogioco,
            @RequestParam(value = "numeroCopie") int numeroCopie) {

         Optional<Videogioco> videogiocoOptional = Optional.ofNullable(databaseService.findVideogioco(nomeVideogioco));
        logger.info("chiamato servizio /vendiCopie");
        if (videogiocoOptional.isPresent()) {
            Videogioco videogioco = videogiocoOptional.get();
            int nuovaQuantita = videogioco.getQuantitaG() - numeroCopie;
            if (nuovaQuantita >= 0) {
                videogioco.setQuantitaG(nuovaQuantita);
                databaseService.updateVideogioco(videogioco);
                return videogioco;
            } else {
                return videogioco;
            }
        } else {
            return null;
        }
    }
}
