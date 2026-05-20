function showPage(pageId) {

    let pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {

        page.style.display = 'none';

    });

    document.getElementById(pageId).style.display = 'block';

}


// LOAD METRICS

async function loadMetrics() {

    try {

        const response = await fetch('http://localhost:3000/metrics');

        const data = await response.json();

        document.getElementById('cpu').innerHTML =
            "CPU Usage : " + data.cpu + "%";

        document.getElementById('ram').innerHTML =
            "RAM Usage : " + data.ramUsed + " GB / " + data.ramTotal + " GB";

        document.getElementById('disk').innerHTML =
            "Disk Usage : " + data.diskUsed + "%";

    } catch (err) {

        console.log(err);

    }

}


// LOAD CONTAINERS

async function loadContainers() {

    try {

        const response = await fetch('http://localhost:3000/containers');

        const data = await response.json();

        let html = '';

        data.forEach(function(container) {

            html += `
                <div class="card">
                    <h3>${container.name}</h3>
                    <p>${container.status}</p>
                    <p>${container.ports}</p>
                </div>
            `;

        });

        document.getElementById('containerList').innerHTML = html;

    } catch (err) {

        console.log(err);

    }

}


// LOAD JENKINS
async function loadJenkins() {

    try {

        const response = await fetch('http://localhost:3000/jenkins');

        const data = await response.json();

        let html = '';

        data.forEach(function(build) {

            html += `
                <div class="card">
                    <h3>Build #${build.number}</h3>
                    <p>
                        <a href="${build.url}" target="_blank">
                            Open Build
                        </a>
                    </p>
                </div>
            `;

        });

        document.getElementById('jenkinsBuilds').innerHTML = html;

    } catch (err) {

        console.log(err);

    }

}

// LOAD LOGS

async function loadLogs() {

    try {

        const response = await fetch('http://localhost:3000/logs');

        const data = await response.text();

        document.getElementById('liveLogs').innerHTML =
            "<pre>" + data + "</pre>";

    } catch (err) {

        console.log(err);

    }

}


// LOAD EVERYTHING

async function loadDashboard() {

    await loadMetrics();

    await loadContainers();

    await loadJenkins();

    await loadLogs();

}


loadDashboard();

setInterval(loadDashboard, 5000);
