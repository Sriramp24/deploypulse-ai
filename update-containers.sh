#!/bin/bash

docker ps -a --format '{"name":"{{.Names}}","status":"{{.Status}}","ports":"{{.Ports}}"}' \
| jq -s . > ./data/containers.json
