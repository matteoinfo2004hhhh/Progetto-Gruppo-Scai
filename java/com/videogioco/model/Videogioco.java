package com.videogioco.model;

public class Videogioco {
    private String nomeG;
    private int prezzoG;
    private int quantitaG;

    public Videogioco(String nomeG, int prezzoG, int quantitaG){
        this.nomeG=nomeG;
        this.prezzoG=prezzoG;
        this.quantitaG=quantitaG;
    }
    public Videogioco(){}

    @Override
    public String toString() {
        return "Videogioco{" +
                "nomeG= '" + nomeG + '\'' +
                ", prezzoG= " + prezzoG +
                ", quantitaG= " + quantitaG +
                '}';
    }

    public String getNomeG() {
        return nomeG;
    }

    public void setNomeG(String nomeG) {
        this.nomeG = nomeG;
    }

    public int getPrezzoG() {
        return prezzoG;
    }

    public void setPrezzoG(int prezzoG) {
        this.prezzoG = prezzoG;
    }

    public int getQuantitaG() {
        return quantitaG;
    }

    public void setQuantitaG(int quantitaG) {
        this.quantitaG = quantitaG;
    }

    public void aggiungiCopieVideogioco (int numeroCopie) {
        quantitaG+=numeroCopie;
        System.out.println("Ho aggiunto " + numeroCopie + " al gioco: " + nomeG);
    }

    public void vendiCopie (int numeroDiCopieDaVendere) {
        if (getQuantitaG()>=numeroDiCopieDaVendere) {
            quantitaG-=numeroDiCopieDaVendere;
        }
        else {
            System.out.println("Mi dispiace, ne ho solo " + getQuantitaG() +
                               " copie, non posso venderne " + numeroDiCopieDaVendere);
        }
    }
}
