function addZeroes(num, len) {
    var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;
      
  while(counter < len) {
      numberWithZeroes = "0" + numberWithZeroes;
    counter++;
    }  
  
  return numberWithZeroes;
}

const listUsers = async (vDATAC) => {
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

    //vparametro = '22062022';
    let url = ``;
    url = 'http://187.108.16.57:18081/dash/log_envios/' + vparametro;
    const response = await fetch(url, requestOptions);
    const users = await response.json();

    let aux = ``;
    let auxsend = ``;
    let auxbgcolor = ``;
    let auxnull = ``;
    let auxcelular = ``;
    let vcelular = ``;
    let tableBody = ``;
    users.forEach((user, index) => {

        aux = ``;
        if (user.mensagem_id==1) //COBRANÇA
            aux = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#FF0000' class='bi bi-calendar-x' viewBox='0 0 16 16'>
            <path d='M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z'/>
            <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z'/></svg>`
        else if (user.mensagem_id==2) //BOAS VINDAS
            aux = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#239B56' class='bi bi-house-heart-fill' viewBox='0 0 16 16'>
            <path d='M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z'/>
            <path d='m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z'/></svg>`
        else if (user.mensagem_id==7) //BOAS VINDAS MOVEL
            aux = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#239B56' class='bi bi-chat-heart-fill' viewBox='0 0 16 16'>
            <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z'/></svg>`
        else if (user.mensagem_id==3) //AVISO BLOQUEIO
            aux = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#FB5B00' class='bi bi-bell-fill' viewBox='0 0 16 16'><path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z'/></svg>`            
        else if (user.mensagem_id==4) //SERASA SPC
            aux = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#FF0000' class='bi bi-calendar-minus-fill' viewBox='0 0 16 16'>
            <path d='M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1z'/></svg>`            

        auxsend = ``;
        auxbgcolor = ``;
        if (user.status==200) {//SUCESSO
            auxbgcolor = `table-light text-primary`;
            auxsend = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#2AFF00' class='bi bi-check-all' viewBox='0 0 16 16'>
            <path d='M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z'/></svg>`
        }
        else {
            auxbgcolor = `table-secondary text-danger`; 
            auxsend = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#c90a02' class='bi bi-check' viewBox='0 0 16 16'>
            <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>`;
        }

        /*if (user.frt_id != null || user.frt_id !== undefined)
            auxnull = ``;
        else 
            auxnull = user.frt_id;*/
        
        vcelular = user.celular.substring(2);
        auxcelular = `${vcelular.slice(0,2)}  ${vcelular.slice(2,7)}-${vcelular.slice(7,12)}`;

        tableBody += `<tr class='${auxbgcolor}'>
        <td class='centered'>${aux}</td>
        <td class='centered'>${user.id}</td>        
        <td class='centered'>${user.hora_envio }</td>                        
        <td class='centered'>${user.contract_id}</td>
        <td class='centered'>${user.client_id}</td>
        <td class='left'>${user.nome}</td>
        <td class='centered'>${auxcelular}</td>        
        <td class='left'>${auxsend}</td>                
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
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGplYW5AdGNoZXR1cmJvLmNvbS5iciIsImV4cGlyZXMiOiIyMDIyLTA2LTMwVDEyOjI4OjIxLjQ4MTA0OCJ9.q908pqyDJ37sVSOrZHp-3J87pN9QpdS-RBZFvBXod7k")
        
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    let url = ``;
    url = 'http://187.108.16.57:18081/dash/cardcabecalho/';
    const response = await fetch(url, requestOptions);
    const cards = await response.json();

    let verro = 0;
    let vsucesso = 0;
    let vfila = 0;
    let vdata = ``;
    let vhora = ``;

    cards.forEach((card, index) => {
        if (card.vfila >= 0) vfila = addZeroes(card.vfila,2);
        
        if (card.vsucesso >= 0) vsucesso = addZeroes(card.vsucesso,2);
    
        if (card.verro > 0) {
            verro = addZeroes(card.verro,2);
            cardErroValue.innerHTML = verro;
            document.getElementById("cardErro").classList.add("bg-danger");
            document.getElementById("cardErroFooter").classList.add("text-danger");            
        }
        else {
            verro = addZeroes(card.verro,2);
            cardErroValue.innerHTML = verro;
            document.getElementById("cardErro").classList.add("bg-secondary");
            document.getElementById("cardErroFooter").classList.add("text-secondary");
        }

        vdata = card.data_ultimo_envio;
        vhora = card.hora_ultimo_envio;
    
    })
    
    document.getElementById("cardValueSucesso").innerHTML = vsucesso;
    document.getElementById("cardValueFila").innerHTML = vfila;
    
    let vHoje = ``;
    vHoje = new Intl.DateTimeFormat('pt-BR').format(new Date());
    if (vdata == vHoje){
        document.getElementById("cardEnvio").classList.add("gb-tcheturbo-azul");
        document.getElementById("cardEnvioFooter").classList.add("text-tcheturbo-azul");

        cardEnvioFooter.innerHTML = vdata + ' ' + vhora;
    }
    else{
        document.getElementById("cardEnvio").classList.add("bg-warning");
        document.getElementById("cardEnvioFooter").classList.add("text-warning");
        cardEnvioFooter.innerHTML = vdata + ' ' + vhora;
    }
};

window.addEventListener("load", function () {
    const auth =  localStorage.getItem("auth");
    console.log('auth ' + auth)
   
    listCabecalho();
    listUsers();
});