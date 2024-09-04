echo "remove ./lib/client"
rm -rf ./lib/client
echo "remove openapi.json"
rm ./commands/generate-client/openapi.json
echo "downloading openapi.json"
curl http://localhost:8000/openapi.json > ./commands/generate-client/openapi.json
echo "running modify-openapi-operations.js"
node ./commands/generate-client/modify-openapi-operationids.js
echo "running openapi"
node ./commands/generate-client/create-client.js