package com.videogioco.service;

import com.videogioco.controller.NegozioController;
import com.videogioco.model.Videogioco;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CatalogoService{
   private List<Videogioco> catalogo;
    private static final Logger logger = LogManager.getLogger(CatalogoService.class);
public List <Videogioco> Creacatalogo(){
    catalogo = new ArrayList<Videogioco>();
    AggiungiVieogioco("pacman",10,1);
    AggiungiVieogioco("Super Mario",24,1);
    AggiungiVieogioco("Sonic",50,3);
    AggiungiVieogioco("Chibi Knight",110,4);
    AggiungiVieogioco("Minecraft",30,1);
    AggiungiVieogioco("Super mario 2",49,1);

    return catalogo;
}


public void AggiungiVieogioco(String nome, int prezzo, int quantita){
    Videogioco videogioco= new Videogioco (nome,prezzo,quantita);
    System.out.println("Sto aggiungendo il gioco "+nome+" che costa "+prezzo+"€ ne ho "+quantita);
    catalogo.add(videogioco);
    logger.info("Gioco-aggiunto");

}

public void aggiungiVideogiocoAlCatalogo(Videogioco videogioco){
    catalogo.add(videogioco);
    logger.info("Gioco-aggiunto");
}

public void rifornisciVideogioco(int numeroCoppie,String nomeVideogioco){
    for(Videogioco videogioco:catalogo){
        if(videogioco.getNomeG().equals(nomeVideogioco)){
            videogioco.aggiungiCopieVideogioco(numeroCoppie);
            logger.info("ho aggiunto :"+numeroCoppie+" al gioco "+nomeVideogioco);
        }

    }

}

public Videogioco cercaVideogioco(String nomeVideogioco){
    for(Videogioco videogioco:catalogo){
        if(videogioco.getNomeG().equals(nomeVideogioco)){
            logger.info("ho trovato il videogioco: "+nomeVideogioco);
            return videogioco;
        }
    }
    logger.info("non ho trovato il videogioco: "+nomeVideogioco);
    return null;
}

public int getPrezzoVideogioco(String nomeVideogioco){
    Videogioco videogioco = cercaVideogioco(nomeVideogioco);
    int prezzo = -1;
    if(videogioco!=null){
        prezzo=videogioco.getPrezzoG();
    }
    videogioco.getPrezzoG();
    logger.info("ho trovato il prezzo del videogioco: "+prezzo);
return prezzo;
}

public void sovrascriviPrezzo(String nomeVideogioco,int nuovoprezzo){
    Videogioco videogioco = cercaVideogioco(nomeVideogioco);
    if(videogioco!=null){
        videogioco.setPrezzoG(nuovoprezzo);
    }
    logger.info("ho ricevuto il nuovo prezzo: "+nuovoprezzo);
}

public void vendiVideogioco(String nomeVideogioco,int coppie){
    Videogioco videogioco = cercaVideogioco(nomeVideogioco);
    if(videogioco!=null){
        videogioco.vendiCopie(coppie);
    }
    logger.info("ho venduto le coppie di:"+coppie);
}

public void StampaCatalogo(){
    System.out.println("Ecco il nostro catalogo");
    for(Videogioco videogioco:catalogo){
        logger.info("-Titolo: "+videogioco.getNomeG()+ " quante coppie abbiamo "+videogioco.getQuantitaG());
    }
}

}
