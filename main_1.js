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
        lista.sort(function (a, b) {
            return (b.age - a.age);
        });
        printtable(lista);
    }

    function orderdown(lista) {
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

    function printtable(lista) { //typical print

        for (let i = 0; i < lista.length; i++) {

            let tr = document.createElement("tr");
            let element = lista[i];

            for (let j in element) {
                let td = document.createElement("td");

                if (typeof (element[j]) == 'object') {

                    let nm = element[j].nickName.replace(/\s/g, "-");
                    let nmopen = nm.concat("-open");
                    let nmclose = nm.concat("-close");

                    //button moreinfo
                    let moreinfo = document.createElement("button");
                    moreinfo.setAttribute("id", nmopen);
                    moreinfo.setAttribute("class", "button");
                    moreinfo.innerHTML = "More info";

                    //the modal
                    let div = document.createElement("div");
                    div.setAttribute("id", nm);
                    div.setAttribute("class", "modal");

                    //modal content
                    let c_div = document.createElement("div");
                    c_div.setAttribute("class", "modal-content");

                    let name = document.createElement("h3");
                    name.innerHTML = element.name;

                    let b_close = document.createElement("button");
                    b_close.setAttribute("id", nmclose);
                    b_close.innerHTML = "Close";

                    c_div.append(name, b_close);

                    let mymodal = document.getElementById(nm);

                    div.append(c_div);
                    moreinfo.append(div);
                    td.append(moreinfo);
                    tr.append(td);
                    
                    console.log(typeof(nmopen));
                    document.getElementById(nmopen).addEventListener("click", () => openModal(mymodal));

                    //NO SE PORQUE ME DA ERROR EL ID, SI LO HE CREADO Y EN EL ELEMENTS SE VE QUE SE HA CREADO PERFECTO Y ES UN STRING Y CADA UNO TIENE EL SUYO
                    // document.getElementById(nmclose).addEventListener("click", closeModal);

                } else {
                    td.innerHTML = element[j];
                }
                tr.append(td);
            }
            table_body.append(tr);

        }

        function openModal(modal) {
            modal.style.display = "block";
        }

        function closeModal() {
            modal.style.display = "none";
        }
    }



}).catch(function (error) {
    console.log("Request failed: " + error.message);
});