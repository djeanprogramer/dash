function addZeroes(num, len) {
    var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;
      
  while(counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
    counter++;
    }  
  
  return numberWithZeroes;
}

const listDetails = async (vDATAC) => {
    let vparametro = ``;

    if (vDATAC !== undefined){
        vparametro = ``;
        vparametro = vDATAC;
   } else {
        let hoje = new Date();
        vparametro = new Intl.DateTimeFormat('pt-BR').format(hoje);
        vparametro = vparametro.replaceAll('/','',);
    }

   var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");    
    myHeaders.append("user-agent", "Mozilla/5.0");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = ``; 
    url = 'http://187.108.16.57:18081/dash/log_portabilidades/';
    const response = await fetch(url, requestOptions);
    const users = await response.json();

    let auxcelular = ``;
    let vcelular = ``;
    let tableBody = ``;
    users.forEach((user, index) => {
        
        vcelular = user.MSISDN;
        auxcelular = `${vcelular.slice(0,2)}  ${vcelular.slice(2,7)}.${vcelular.slice(7,12)}`;


        //let auxbgcolor = `table-light `;
        let auxbgcolor = `table-light text_bold`;
        let marcador = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-check-all' viewBox='0 0 16 16'>
                        <path d='M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z'/></svg>`;

        if (user.MESSAGE != '[Port IN Concluido com sucesso!]') {
            auxbgcolor = `table-light text-danger text_bold`;
            
            marcador = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#FF0000' class='bi bi-check' viewBox='0 0 16 16'>
                        <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>`;
        }

        tableBody += `<tr class='${auxbgcolor}'>
            <td class='centered'><h5>${marcador}</h5></td>
            <td class='centered'><h5>${user.PORTABILITY}</h5></td>
            <td class='centered'><h5>${user.SCHEDULED_DATE}</h5></td>
            <td class='left'><h5>${user.NAME}</h5></td>
            <td class='centered'><h5>${user.STATUS}</h5></td>
            <td class='centered'><h5>${auxcelular}</h5></td>
            <td class='centered'><h5>${user.MESSAGE}</h5></td>
        </tr>`;
    });
    // document.getElementById("tableBody_Users").innerHTML = tableBody;
    tableBody_Users.innerHTML = tableBody;
};

const listCabecalho = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");    
    myHeaders.append("user-agent", "Mozilla/5.0");  
    myHeaders.append("Access-Control-Allow-Origin", "*");  
        
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = ``;
    url = 'http://187.108.16.57:18081/dash/cardcabecalhotelecall/';
    const response = await fetch(url, requestOptions);
    const cards = await response.json();

    let erro = 0;
    let sucesso = 0;
    let fila = 0;
    
    cards.forEach((card, index) => {
        if (card.fila >= 0) fila = addZeroes(card.fila,2);
        
        if (card.sucesso >= 0) sucesso = addZeroes(card.sucesso,2);
    
        if (card.erro > 0) {
            erro = addZeroes(card.erro,2);
            cardErroValue.innerHTML = erro;
            document.getElementById("cardErro").classList.add("bg-danger");
            document.getElementById("cardErroFooter").classList.add("text-danger");            
        }
        else {
            erro = addZeroes(card.erro,2);
            cardErroValue.innerHTML = erro;
            document.getElementById("cardErro").classList.add("bg-secondary");
            document.getElementById("cardErroFooter").classList.add("text-secondary");
        }

    })
    
    document.getElementById("cardValueSucesso").innerHTML = sucesso;
    document.getElementById("cardValueFila").innerHTML = fila;
    
    let vHoje = ``;
    vHoje = new Intl.DateTimeFormat('pt-BR').format(new Date());

    let vHora = new Date().toLocaleTimeString();
    cardEnvioFooter.innerHTML = vHoje + ' ' + vHora;
};

window.addEventListener("load", function () {
    const auth =  localStorage.getItem("auth");
    console.log('auth ' + auth)
   
    listCabecalho();
    listDetails();
});