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

    console.log(myteammates[0]);
    
    printtable(myteammates);

    let table_body = document.getElementById("t_body");

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

            <td data-fancybox data-options='{"src": "#exampleModal", "touch": false, "smallBtn" : false}' href="javascript:;" "><button class="button">More info</button></td>
            
            <div style="display:none; max-width:500px;" id="exampleModal">
            <img src="${lista[i].name}" alt="contact"> 
            </div>

        </tr>
        `;
            t_body.innerHTML = template;
        }

    }

}).catch(function (error) {
    console.log("Request failed: " + error.message);
});