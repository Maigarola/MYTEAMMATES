// table PAGE

// Create the general table with general information
let url = "https://api.myjson.com/bins/adpvt";

fetch(url, {}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);

}).then(function (json) {

    let myteammates = json.people;
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

    heresearchfilters.append(search);

    //eventlisteners

    //search
    document.getElementById("tsearch").addEventListener("keyup", searchfilter);

    //moreinfo eventlistener
    for (let i = 0; i < checkroles.length; i++) {
        document.getElementById(checkroles[i].replace(/\s/g, "-")).addEventListener("click", searchfilter);
    }
    //order

    document.getElementById("up").addEventListener("click", () => order(searchfilter(), "up"));
    document.getElementById("down").addEventListener("click", () => order(searchfilter(), "down"));

    printtable(myteammates);


    function printtable(lista) { //typical print

        // de esta manera cada vez que hace print se asegura de que la tabla esté vacía

        let erase = document.getElementById("t_body");
        erase.innerHTML = " ";

        for (let i = 0; i < lista.length; i++) {

            let tr = document.createElement("tr");
            let element = lista[i];

            for (let j in element) {
                let td = document.createElement("td");

                if (typeof (element[j]) == 'object') {

                    let nm = element[j].nickName.replace(/\s/g, "-");

                    //button moreinfo
                    let moreinfo = document.createElement("button");
                    moreinfo.setAttribute("id", nm);
                    moreinfo.setAttribute("class", "button");
                    moreinfo.innerHTML = "More info";

                    td.append(moreinfo);
                    tr.append(td);

                } else {
                    td.innerHTML = element[j];
                }
                tr.append(td);
            }
            table_body.append(tr);
        }

        for (let i = 0; i < lista.length; i++) {
            let nmo = lista[i].contact_info.nickName.replace(/\s/g, "-");
            let point = document.getElementById(nmo);
            point.addEventListener("click", () => createModal(lista[i]));
        }
    }

    //FILTERS

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

    function whochecked() {
        let wchecked = [];
        for (let i = 0; i < checkroles.length; i++) {
            if (document.getElementById(checkroles[i].replace(/\s/g, "-")).checked) {
                wchecked.push(checkroles[i]);
            }
        }
        return wchecked;
    }

    function order(lista, sense) {
        if (sense == "up") {
            lista.sort(function (a, b) {
                return (b.age - a.age);
            });
        } else {
            lista.sort(function (a, b) {
                return (a.age - b.age);
            });
        }
        printtable(lista);
    }


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});

//FILTERS

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

//THE MODAL
function createModal(element) {

    let nmopen = element.contact_info.nickName.replace(/\s/g, "-");
    let nmodal = element.contact_info.nickName.replace(/\s/g, "-").concat("modal");
    let nmclose = element.contact_info.nickName.replace(/\s/g, "-").concat("close");

    let template = "";

    template += `
        <div  class = "modal-content">
        <h3>${element.name}</h3>
        <p><img src="${element.contact_info.photo}" alt="photo"></p>
        <p><span>NickName</span> ${element.contact_info.nickName} </p>
        <p><span>Phone</span> ${element.contact_info.phone} </p>
        <p><span>Site</span> <a href=${element.contact_info.site}> ${element.contact_info.site} </a></p>
        <p><span>Contact</span>`

    if (element.contact_info.email == null) {
        template += ` We don't have any contact info`
    } else {
        template += `<button class="e_button"><a id="mail" href="mailto:${element.contact_info.email}" target="_top">Send me a mail</button></a></p>`
    }
    template += `
        <p><button id = ${nmclose} class="c_button">Close</button></p>
        </div>
        </td>`

    let mymodal = document.getElementById("t_body");
    let divmodal = document.createElement("div");
    divmodal.setAttribute("id", nmodal);
    divmodal.setAttribute("class", "modal");
    mymodal.append(divmodal);
    divmodal.innerHTML = template;

    document.getElementById(nmodal).style.display = "block";

    let closebutton = document.getElementById(nmclose);
    closebutton.addEventListener("click", () => closemodal(element));
}

function closemodal(element) {
    let nmymodal = element.contact_info.nickName.replace(/\s/g, "-").concat("modal");
    document.getElementById(nmymodal).style.display = "none";

}