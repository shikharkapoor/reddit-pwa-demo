var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var hbs = require('express-handlebars');

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));

app.set('views', path.join(__dirname, '/public/templates'));
app.set('view engine', '.hbs');


app.engine('.hbs', hbs({
	'extname': '.hbs'
}));
var inlineStyles = fs.readFileSync(path.resolve(__dirname) + '/public/css/shell-styles.css', 'utf8');

app.get('/sw.js', function (req, res) {
	res.set('Content-Type', 'application/javascript');
	res.end(fs.readFileSync(path.resolve(__dirname) + '/public/js/sw.js', 'utf8'));
});

app.get('/manifest.json', function(req, res) {
	res.set('Content-Type', 'application/json');
	res.end(fs.readFileSync(path.resolve(__dirname) + 'manifest.json', 'utf8'));
});


app.get('/', function (req, res) {
	var templateVars = {
		'inlineStyles': inlineStyles
	};
	res.render('index', templateVars);
});

app.listen(port, function () {
	console.log('Demo app listening on port 3000!');
});
