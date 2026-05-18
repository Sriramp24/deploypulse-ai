const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req,res)=>{

    res.send('DeployPulse AI Backend Running');

});

app.get('/status',(req,res)=>{

    res.json({
        runningContainers:4,
        failedBuilds:1,
        cpuUsage:'45%'
    });

});

app.listen(port,()=>{

    console.log(`Server running on ${port}`);

});
