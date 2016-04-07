var container = document.getElementById('container');
var catContainer = document.getElementsByClassName('cat-container');
var catName = document.getElementsByClassName('cat-name');
var catImg = document.getElementsByClassName('cat-img');
var counter = document.getElementsByClassName('counter-number');
var catArray = [];
var index = 0;

function newSection() {
	var catContainerClone = catContainer[0].cloneNode(true);
	container.appendChild(catContainerClone);
}

//Cat class constructor
function Cat(name, img) {
	this.count = 0;
	this.name = name;
	this.img = 'img/' + img;
}

Cat.prototype.fillOutSection = function(index) {
	var textNode = document.createTextNode('Meet ' + this.name);
	catName[index].appendChild(textNode);
	catImg[index].setAttribute('src', this.img);
	catImg[index].addEventListener('click', function() {
		catArray[index].count += 1;
		counter[index].innerHTML = catArray[index].count;
	});
};

// Instances of Cat class
catArray.push(new Cat('Stanley', 'cute-cat.jpg'));
catArray.push(new Cat('Herbert', 'cute-cat-2.jpg'));
catArray.push(new Cat('Jorge', 'cute-cat-3.jpg'));

// Store number of cats
var numberOfCats = catArray.length;

// Create HTML containers
for (var i = 1; i < numberOfCats; i++) {
	newSection();
}

// Fill out containers
for (var k = 0; k < numberOfCats; k++) {
	catArray[k].fillOutSection(k);
}