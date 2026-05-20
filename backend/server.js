const express = require('express');
const si = require('systeminformation');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

const port = 3000;


// ================= HOME =================

app.get('/', (req,res)=>{

    res.send('DeployPulse AI Backend Running');

});


// ================= CPU + RAM =================

app.get('/metrics', async (req,res)=>{
    console.log('[INFO] Metrics API Called');

    try{

        const cpu = await si.currentLoad();

        const mem = await si.mem();

        const disk = await si.fsSize();

        res.json({

            cpu: cpu.currentLoad.toFixed(2),

            ramUsed: (mem.used / 1024 / 1024 / 1024).toFixed(2),

            ramTotal: (mem.total / 1024 / 1024 / 1024).toFixed(2),

            diskUsed: disk[0].use.toFixed(2)

        });

    }catch(err){

        res.status(500).json({error:err.message});

    }

});


// ================= DOCKER CONTAINERS =================

app.get('/containers', (req,res)=>{
    console.log('[INFO] Containers API Called');

    fs.readFile('/app/data/containers.json','utf8',(err,data)=>{

        if(err){

            return res.status(500).json({error:err.message});

        }

        res.json(JSON.parse(data));

    });

});


// ================= JENKINS BUILDS =================

app.get('/jenkins', async (req,res)=>{
    console.log('[INFO] Jenkins API Called');

    try{

        const axios = require('axios');

        const response = await axios.get(
            'http://host.docker.internal:8080/job/DeployPulse-AI/api/json'
        );

        const builds = response.data.builds.slice(0,5);

        res.json(builds);

    }catch(err){

        res.status(500).json({
            error: err.message
        });

    }

});

// ================= LIVE LOGS =================

app.get('/logs', (req,res)=>{
    console.log('[INFO] Logs API Called');

    fs.readFile('/app/data/logs.txt','utf8',(err,data)=>{

        if(err){

            return res.status(500).json({
                error: err.message
            });

        }

        res.send(data);

    });

});

// ================= START SERVER =================

app.listen(port,()=>{

    console.log(`Server running on ${port}`);

});
