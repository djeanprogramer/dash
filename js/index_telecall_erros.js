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
    url = 'http://187.108.16.57:18081/dash/log_portabilidades_erros/';
    //url = 'http://localhost:18081/dash/log_portabilidades_erros/';
    const response = await fetch(url, requestOptions);
    const users = await response.json();

    let auxcelular = ``;
    let vcelular = ``;
    let tableBody = ``;
    let auxbgcolor = ``;
    let marcador = ``;
    let cor = '';
    let corstatus = '';
    users.forEach((user, index) => {
        
        vcelular = user.MSISDN;
        auxcelular = `${vcelular.slice(0,2)}  ${vcelular.slice(2,7)}.${vcelular.slice(7,12)}`;


        //let auxbgcolor = `table-light `;
        auxbgcolor = `table-light `;
        cor = `text-tcheturbo-azul`;
        corstatus = 'text-danger';
        marcador = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#9FF781' class='bi bi-person-plus-fill' viewBox='0 0 16 16'>
        <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/>
        <path fill-rule='evenodd' d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/></svg>`;

        if (user.PORTABILITY == 'OUT'){
            cor = 'text-tcheturbo-roxo';
            corstatus = '';
            marcador = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#d73187' class='bi bi-person-dash-fill' viewBox='0 0 16 16'>
            <path fill-rule='evenodd' d='M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z'/>
            <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/></svg>`;
        }

        tableBody += `<tr class='${auxbgcolor + ' ' + cor}'>
            <td class='centered'>${marcador}</td>
            <td class='centered'>${user.PORTABILITY}</td>
            <td class='left'>${user.NAME}</td>
            <td class='centered'>${user.STATUS}</td>
            <td class='centered'>${auxcelular}</td>
            <td class='centered'>${user.REQUESTED_DATE}</td>
            <td class='centered'>${user.SCHEDULED_DATE}</td>
            <td class='left'>${user.MESSAGE}</td>
        </tr>`;
    });
    // document.getElementById("tableBody_Users").innerHTML = tableBody;
    tableBody_Users.innerHTML = tableBody;

    let vHoje = ``;
    vHoje = new Intl.DateTimeFormat('pt-BR').format(new Date());

    let vHora = new Date().toLocaleTimeString();
    lbHora.innerHTML = vHoje + ' ' + vHora;    
};

window.addEventListener("load", function () {
    listDetails();
});