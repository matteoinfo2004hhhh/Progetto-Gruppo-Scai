
var games = [
];

function getGamesData() {
    populateTable(games);
}

function populateTable() {
    var table = document.getElementById('gamesTable');
    var intestazione = table.insertRow(0);
    var int0 = intestazione.insertCell(0);
    var int1 = intestazione.insertCell(1);
    var int2 = intestazione.insertCell(2);
    var int3 = intestazione.insertCell(3);

    int0.innerHTML = '<th>Seleziona</th>';
    int1.innerHTML = '<th>Nome</th>';
    int2.innerHTML = '<th>Prezzo</th>';
    int3.innerHTML = '<th>Quantita</th>';

    fetch('http://localhost:8080/negozio/getCatalogo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta fetch');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(game => {
                var row = table.insertRow(-1);
                row.id = 'gameRow_' + game.id;

                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);

                var nuovoID = games.length;
                cell0.innerHTML = '<input type="checkbox" name="gameSelect" data-game-id="' + nuovoID + '">';
                cell1.innerHTML = game.nomeG;
                cell2.innerHTML = game.prezzoG;
                cell3.innerHTML = game.quantitaG;
                games.push({id: nuovoID, nome: game.nomeG, prezzo: parseInt(game.prezzoG), quantita: parseInt(game.quantitaG)});
            });
        })
        .catch(error => console.error('Errore:', error));
}


function toggleTable() {
    var table = document.getElementById("gamesTable");
    if (table.style.visibility === "hidden") {
        table.style.visibility = "visible";
    } else {
        table.style.visibility = "hidden";
    }
}

function aggiungiVideogioco() {
    $('#modaleInserisciVideogioco').modal('show');
}

document.getElementById('newGameForm').onsubmit = function(e) {
    e.preventDefault();

    var nome = document.getElementById('nome').value.trim();
    var prezzo = parseFloat(document.getElementById('prezzo').value.trim());
    var quantita = parseInt(document.getElementById('quantita').value.trim());

    if (nome === "" || isNaN(prezzo) || isNaN(quantita) || prezzo <= 0 || quantita <= 0) {
        alert("Si prega di inserire valori validi per nome, prezzo e quantità.");
        return;
    }

    var nuovoVideogioco = {
        nomeG: nome,
        prezzoG: parseInt(prezzo),
        quantitaG: parseInt(quantita)
    };

    fetch('http://localhost:8080/negozio/aggiungiVideogioco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovoVideogioco)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore durante l\'inserimento del videogioco');
        }

    })
    .then(data => {
        console.log('Videogioco inserito con successo:');
        refreshCatalogo();
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante l\'inserimento del videogioco');
    });

};



function azzeraForm() {
    document.getElementById('nome').value = '';
    document.getElementById('prezzo').value = '';
    document.getElementById('quantita').value = '';
}

$('form input').on('change', function() {
    var nome = document.getElementById('nome').value;
    var prezzo = document.getElementById('prezzo').value;
    var quantita = document.getElementById('quantita').value;

    if (nome && prezzo > 0 && quantita > 0) {
      document.getElementById('submitBtn').disabled = false;
    } else {
      document.getElementById('submitBtn').disabled = true;
    }
});

function eliminaVideogioco() {
    $('#modaleElimina').modal('show');
}

function aggiungiCopie() {
    $('#aggiungicoppie').modal('show');
}
//gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg detaglio
function dettaglio() {
    var immagine_dettaglio = document.getElementById("immagine_dettaglio");

    var selectedGamesIds = [];
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push($(this).data('game-id')); 
    });

    if(selectedGamesIds.length === 1){
        var gameIndex = games.findIndex(function(game) {
            return game.id === selectedGamesIds[0];
        });
        $(document).ready(function() {
            // Effettua una richiesta al servizio backend per ottenere i dati
            $.ajax({
                url: 'http://localhost:8080/negozio/findDettaglioVideogioco?nomeVideogioco=' + encodeURIComponent(games[gameIndex].nome),
                method: 'GET',
                success: function(data) {
                    var urlImmagine ="immagini_sfondo/" + data.nomeImmagine +"."+data.estensioneImmagine;
                    console.log(urlImmagine);
                    immagine_dettaglio.src=urlImmagine;
    
                    // Aggiorna dinamicamente i campi con i dati ricevuti dal backend
                    $('#nome_videogioco').text(data.nome);
                    $('#immagine_dettaglio').attr('src', urlImmagine);
                    $('#descrizione_videogioco').text(data.descrizione);
                },
                error: function(xhr, status, error) {
                    console.error('Errore durante la richiesta al findDettaglio:', error);
                }
            });
        });
    }
    $('#dv').modal('show');



/*
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push($(this).data('game-id')); 
    });

    if(selectedGamesIds.length === 1){
        var gameIndex = games.findIndex(function(game) {
            
        // Chiamata al servizio findDettaglio() per ottenere i dettagli del gioco
        $.ajax({
            url: 'http://localhost:8080/negozio/findDettaglioVideogioco?nomeVideogioco' + encodeURIComponent(games.find(game => game.id === selectedGamesIds[0]).nome),
            method: 'GET',
            success: function(data) {
                $('#nome_videogioco').text(data.nome);
                $('#immagine_dettaglio').attr('src', data.immagineURL);
                $('#descrizione_videogioco').text(data.descrizione);
            },
            error: function(xhr, status, error) {
                console.error('Errore durante la richiesta al findDettaglio:', error);
            }
        });

            return game.id === selectedGamesIds[0];
        });

    } 
*/    
    $('#dd').modal('show');
}


function chiudiModaleDettaglioVideogioco() {
    $('#dv').modal('hide');
}



function aggprezzo() {
    $('#p').modal('show');
}

function vendiCopie() {
    var selectedGamesIds = [];
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push(parseInt($(this).data('game-id')));
    });

    if (selectedGamesIds.length === 0) {
        alert("Nessun videogioco selezionato.");
        return;
    }

    selectedGamesIds.forEach(function(gameId) {
        var gameIndex = games.findIndex(function(game) {
            return game.id === gameId;
        });

        if (gameIndex !== -1) {
            var quantitaDaVendere = prompt("Inserisci la quantità da vendere per il videogioco '" + games[gameIndex].nome + "':");
            quantitaDaVendere = parseInt(quantitaDaVendere);

            if (isNaN(quantitaDaVendere) || quantitaDaVendere <= 0 || quantitaDaVendere > games[gameIndex].quantita) {
                alert("Quantità non valida per il videogioco '" + games[gameIndex].nome + "'.");
                return;
            }

            fetch('http://localhost:8080/negozio/vendiCopie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'nomeVideogioco=' + encodeURIComponent(games[gameIndex].nome) + '&numeroCopie=' + encodeURIComponent(quantitaDaVendere)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante la vendita delle copie del videogioco');
                }
                alert("Hai venduto " + quantitaDaVendere + " copie del videogioco '" + games[gameIndex].nome + "'.");
                // Gestisci la risposta dal backend, se necessario
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Si è verificato un errore durante la vendita delle copie del videogioco');
            });

        }
    });

    refreshCatalogo();
}

function confermaEliminazione() {
    var selectedGamesIds = [];
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push($(this).data('game-id')); 
    });

    if (selectedGamesIds.length === 0) {
        console.log("Nessun videogioco selezionato.");
    }

    selectedGamesIds.forEach(function(gameId) {
        fetch('http://localhost:8080/negozio/deleteVideogioco?nomeVideogioco=' + encodeURIComponent(games.find(game => game.id === gameId).nome), {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'eliminazione del videogioco');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Si è verificato un errore durante l\'eliminazione del videogioco');
        });
    });

    console.log("Hai eliminato " + selectedGamesIds.length + " videogioco/i.");
    games = games.filter(function(game) {
        return !selectedGamesIds.includes(game.id);
    });
    refreshCatalogo();
    chiudiModale();
}


function confermaAggiungiCopieVideogioco() {
    var selectedGamesIds = [];
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push(parseInt($(this).data('game-id')));
    });

    if (selectedGamesIds.length === 0) {
        alert("Nessun videogioco selezionato.");
    }

    var requests = selectedGamesIds.map(function(gameId) {
        var gameIndex = games.findIndex(function(game) {
            return game.id === gameId;
        });

        if (gameIndex !== -1) {
            var quantitaDaAggiungere = prompt("Inserisci la quantità da aggiungere per il videogioco '" + games[gameIndex].nome + "':");
            quantitaDaAggiungere = parseInt(quantitaDaAggiungere);

            if (isNaN(quantitaDaAggiungere) || quantitaDaAggiungere <= 0) {
                alert("Quantità non valida per il videogioco '" + games[gameIndex].nome + "'.");
                return Promise.reject(new Error("Quantità non valida"));
            }

            return fetch('http://localhost:8080/negozio/aggiungiCopie?nomeVideogioco=' + encodeURIComponent(games[gameIndex].nome) + '&numeroCopie=' + encodeURIComponent(quantitaDaAggiungere), {
                method: 'POST'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante l\'aggiunta delle copie del videogioco');
                }
            })
            .then(data => {
                console.log("Hai aggiunto " + quantitaDaAggiungere + " copie del videogioco '" + games[gameIndex].nome + "'.");
                refreshCatalogo();
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Si è verificato un errore durante l\'aggiunta delle copie del videogioco');
                return Promise.reject(error);
            });
        }
    });

    Promise.all(requests)

}

function NuovoPrezzo(){
    var selectedGamesIds = [];
    $("input[name='gameSelect']:checked").each(function() {
        selectedGamesIds.push(parseInt($(this).data('game-id')));
    });

    if (selectedGamesIds.length === 0) {
        alert("Nessun videogioco selezionato.");
    }

    var requests = selectedGamesIds.map(function(gameId) {
        var gameIndex = games.findIndex(function(game) {
            return game.id === gameId;
        });

        if (gameIndex !== -1) {
            var quantitaDaAggiungere = prompt("Inserisci la quantità da aggiungere per il videogioco '" + games[gameIndex].nome + "':");
            quantitaDaAggiungere = parseInt(quantitaDaAggiungere);

       
            if (isNaN(quantitaDaAggiungere) || quantitaDaAggiungere <= 0) {
                alert("Quantità non valida per il videogioco '" + games[gameIndex].nome + "'.");
                return Promise.reject(new Error("Quantità non valida"));
            }

            if(prezzo<0){
                games[gameIndex].prezzo = quantitaDaAggiungere;
            }


            return fetch('http://localhost:8080/negozio/nuovoPrezzo?nomeVideogioco=' + encodeURIComponent(games[gameIndex].nome) + '&numeroPrezzo=' + encodeURIComponent(quantitaDaAggiungere), {
                method: 'POST'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante l\'aggiunta delle copie del videogioco');
                }
            })
            .then(data => {
                console.log("Hai aggiunto " + quantitaDaAggiungere + " copie del videogioco '" + games[gameIndex].nome + "'.");
                refreshCatalogo();
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Si è verificato un errore durante l\'aggiunta delle copie del videogioco');
                return Promise.reject(error);
            });
        }
    });

    Promise.all(requests)
}

function chiudiModale() {
    $('#modaleElimina').modal('hide');
    $('#modaleInserisciVideogioco').modal('hide');
    $('#aggiungicoppie').modal('hide');
    $('#dd').modal('hide');
    $('#p').modal('hide');
    azzeraForm(); 
}

$("input[name='gameSelect']").change(function() {
    $('#eliminaVideogioco').prop('disabled', false);
    console.log("gioco selezionato");
});

function refreshCatalogo() {
    $('#gamesTable tbody').empty();
    populateTable(games);
    console.log("refreshato");
}

window.onload = getGamesData;