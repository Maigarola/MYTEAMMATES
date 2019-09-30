// table PAGE

// Create the general table with general information
let url = "https://api.myjson.com/bins/adpvt";

fetch(url, {}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);

}).then(function (json) {

    data = json;

    let myteammates = data.people;
    let table_body = document.getElementById("t_body");

    printtable(myteammates);

    function printtable(lista) {

        let template = " ";

        for (let i = 0; i < lista.length; i++) {
            template += `
            <tr>
                <td> ${lista[i].name}</td>
                <td> ${lista[i].age}</td>
                <td> ${lista[i].role}</td>
                <td> ${lista[i].team}</td>
                <td> ${lista[i].seniority}</td>
                ${window(lista[i])}
            </tr>`;

            table_body.innerHTML = template;
        }

    }

    function window(element) {

        let template = "";
        ournick = (element.contact_info.nickName).replace(/\s/g, "_");
        template += `
        <td ><button class="button" data-fancybox data-options='{"src":"#${ournick}","touch": false, "smallBtn" : false}' href="javascript:;">More info</button>            
        <div class = "thewindow" id= "${ournick}">
            <h3>${element.name}</h3>
            <img src="${element.contact_info.photo}" alt="photo" height = "200px"> 
            <p><span>NickName</span> ${element.contact_info.nickName} </p>
            <p><span>Phone</span> ${element.contact_info.phone} </p>
            <p><span>Site</span> <a href=${element.contact_info.site}> ${element.contact_info.site} </a></p>
            <p><span>Contact</span> <button class="e_button"><a id="mail" href="mailto:${element.contact_info.email}" target="_top">Send me a mail</button></a></p>
            
            <p><button data-fancybox-close  class="c_button">Close</button></p>
            </div>
            </td>
            `
        return template;

    }


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});