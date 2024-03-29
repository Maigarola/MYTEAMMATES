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
    let herecheckfilters = document.getElementById("checkroles");
    let heresearchfilters = document.getElementById("searching");

    //filters creation

    // checkboxes
    let checkroles = howmanyroles(myteammates);

    for (let i = 0; i < checkroles.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "mycheckboxs");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = checkroles[i].replace(/\s/g, "-");

        let label = document.createElement("label");
        label.htmlFor = checkroles[i].replace(/\s/g, "-");
        label.append(document.createTextNode(checkroles[i]));
        herecheckfilters.append(div);
        div.append(checkbox);
        div.append(label);
    }

    //search
    let search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Search...";
    search.id = "tsearch";
    let bsearch = document.createElement("button");
    bsearch.setAttribute("id", "bsearch");
    bsearch.append(document.createTextNode("Search!"));

    heresearchfilters.append(search);
    heresearchfilters.append(bsearch);

    //eventlisteners

    //search
    document.getElementById("bsearch").addEventListener("click", searchfilter);

    //
    for (let i = 0; i < checkroles.length; i++) {
        document.getElementById(checkroles[i].replace(/\s/g, "-")).addEventListener("click", searchfilter);
    }
    //order

    document.getElementById("up").addEventListener("click", () => orderup(searchfilter()));
    document.getElementById("down").addEventListener("click", () => orderdown(searchfilter()));


    printtable(myteammates);

    function whochecked() {
        let wchecked = [];
        for (let i = 0; i < checkroles.length; i++) {
            if (document.getElementById(checkroles[i].replace(/\s/g, "-")).checked) {
                wchecked.push(checkroles[i]);

            }
        }
        return wchecked;
    }

    function orderup(lista) {
        console.log("funciono hacia arriba");
        lista.sort(function (a, b) {
            return (b.age - a.age);
        });
        printtable(lista);
    }

    function orderdown(lista) {
        console.log("funciono hacia abajo");
        lista.sort(function (a, b) {
            return (a.age - b.age);
        });
        printtable(lista);
    }

    function searchfilter() {

        document.getElementById("t_body").innerHTML = ""; //clean table

        //set values
        let s = document.getElementById("tsearch").value;
        let c = whochecked();

        let filtered = [];

        for (let i = 0; i < myteammates.length; i++) {
            if (c.length == 0 && s == "") { //we must see all the registres
                filtered = myteammates;
            } else {
                if ((myteammates[i].name.includes(s) || myteammates[i].contact_info.nickName.includes(s)) && ((c.includes(myteammates[i].role) || c.length == 0))) { // c&s filtered
                    filtered.push(myteammates[i]);
                }
            }

        }
        if (filtered.length == 0) { //no data

            let t_body = document.getElementById("t_body");
            let nodata = document.createElement("img");
            nodata.setAttribute("src", "./images/nodata.png");
            t_body.append(nodata);

        } else { //data filtered
            printtable(filtered);
        }
        return filtered;
    }

    function printtable(lista) { //typical print

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

    function window(element) { //function for showing fancy

        let template = "";
        ournick = (element.contact_info.nickName).replace(/\s/g, "_");
        template += `
        <td ><button class="button" data-fancybox data-options='{"src":"#${ournick}","touch": false, "smallBtn" : false}' href="javascript:;">More info</button>            
        <div class = "thewindow" id= "${ournick}">
            <h3>${element.name}</h3>
            <img src="${element.contact_info.photo}" alt="photo"> 
            <p><span>NickName</span> ${element.contact_info.nickName} </p>
            <p><span>Phone</span> ${element.contact_info.phone} </p>
            <p><span>Site</span> <a href=${element.contact_info.site}> ${element.contact_info.site} </a></p>
            <p><span>Contact</span>`

        if (element.contact_info.email == null) {
            template += ` We don't have any contact info`
        } else {
            template += ` <button class="e_button"><a id="mail" href="mailto:${element.contact_info.email}" target="_top">Send me a mail</button></a></p>`
        }

        template += `
            <p><button data-fancybox-close  class="c_button">Close</button></p>
            </div>
            </td>`

        return template;

    }

    function howmanyroles(lista) {

        let roles = [];

        for (let i = 0; i < lista.length; i++) {
            if (!roles.includes(lista[i].role)) {
                roles.push(lista[i].role);
            }
        }
        roles.sort();
        return roles;
    }


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});