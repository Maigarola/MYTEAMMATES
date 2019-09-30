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
                ${window(i,lista)}
            </tr>`;

            t_body.innerHTML = template;
        }

    }

    function window(p, lista) {

        let template = "";
        template += `
        <td data-fancybox data-options= '{"src": "#exampleModal", "smallBtn" : false}' href="javascript:;"><button class="button">More info</button></td>
            
        <div class = "window" id="exampleModal">
            ${lista[p].name}
            <h5>${lista[p].name}</h5>
            <img src="${lista[p].contact_info.photo}" alt="photo" height = "200px"> 
            <h6><span>NickName</span> ${lista[p].contact_info.nickName} </p>
            <p><span>Phone</span> ${lista[p].contact_info.phone} </p>
            <p><span>Site</span> <a href=${lista[p].contact_info.site}> ${lista[p].contact_info.site} </a></p>
            <p><span>Contact</span> <button class="e_button" href= "mailto:${lista[p].contact_info.email}">Send me a mail</button></p>

            <p><button data-fancybox-close class="button">Close</button></p>
            </div>
            `
            return template;
            
    }

}).catch(function (error) {
    console.log("Request failed: " + error.message);
});