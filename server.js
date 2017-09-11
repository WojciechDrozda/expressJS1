var express = require('express');
var fs = require('fs');
var app= express();
var bodyParser = require('body-parser');
var fileContent;

app.use(bodyParser.json());


app.get('/getNote', function(req,res) {
	fs.readFile('./test.json', 'utf8', function(err, data) {
	if (err) throw err;
	fileContent = data;
	res.send(data);
	});

});


app.post('/updateNote/:note', function(req, res) {

	var tmpFileContent = JSON.parse(fileContent);
	tmpFileContent.push({content: req.params.note});
	fileContent = JSON.stringify(tmpFileContent, null, 2)

	fs.writeFile('./test.json', fileContent, function(err, data) {
	if (err) throw err;
	console.log('file update');
	});

	res.send(req.params.note);
});


app.use(function (req, res, next) {
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});


app.listen(3000);