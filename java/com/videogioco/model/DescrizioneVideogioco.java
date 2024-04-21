package com.videogioco.model;

public class DescrizioneVideogioco {
    private String nomeVideogioco;
    private String nomeImmagine;
    private String estensioneImmagine;
    private String descrizione;
    public DescrizioneVideogioco() {
    }

    public String getNomeVideogioco() {
        return nomeVideogioco;
    }

    public void setNomeVideogioco(String nomeVideogioco) {
        this.nomeVideogioco = nomeVideogioco;
    }

    public String getNomeImmagine() {
        return nomeImmagine;
    }

    public void setNomeImmagine(String nomeImmagine) {
        this.nomeImmagine = nomeImmagine;
    }

    public String getEstensioneImmagine() {
        return estensioneImmagine;
    }

    public void setEstensioneImmagine(String estensioneImmagine) {
        this.estensioneImmagine = estensioneImmagine;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
}
