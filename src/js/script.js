var contentContainer = document.getElementById('content-container');

// Method to insert HTML framework
function htmlFramework() {
	var catContainer = document.createElement('div');
	var heading = document.createElement('h2');
	var description = document.createElement('p');
	var image = document.createElement('img');
	var counterContainer = document.createElement('div');
	var counterDescription = document.createElement('p');
	var counterNumber = document.createElement('p');

	catContainer.setAttribute('id', 'cat-container');
	heading.setAttribute('id', 'cat-name');
	description.setAttribute('id', 'cat-description');
	image.setAttribute('class', 'cat-img');
	counterContainer.setAttribute('id', 'counter-container');
	counterDescription.setAttribute('id', 'counter-description');
	counterNumber.setAttribute('id', 'counter-number');

	contentContainer.appendChild(catContainer);
	catContainer.appendChild(heading);
	catContainer.appendChild(description);
	catContainer.appendChild(image);
	catContainer.appendChild(counterContainer);
	counterContainer.appendChild(counterDescription);
	counterContainer.appendChild(counterNumber);

	counterDescription.innerHTML = 'Number of clicks: ';
}

htmlFramework();

var catList = document.getElementById('cat-list');
var catName = document.getElementById('cat-name');
var catDescription = document.getElementById('cat-description');
var catImg = document.getElementsByClassName('cat-img');
var counter = document.getElementById('counter-number');

// Cat class constructor
function Cat(name, img, description) {
	this.count = 0;
	this.name = name;
	this.img = 'img/' + img;
	this.description = description;
}

// Method to attach cat info to HTML framework
Cat.prototype.fillOutSection = function(index) {
	catName.innerHTML = 'Meet ' + this.name;
	catDescription.innerHTML = this.description;
	counter.innerHTML = this.count;
	catImg[0].setAttribute('src', this.img);
	catImg[0].setAttribute('alt', this.name + ' the cat');
	catImg[0].setAttribute('id', index);
	// This clone thing is a hack to strip the existing EventListeners from the image.
	// When you clone a node, it leaves the listeners behind.
	// The counts were getting really messed up. Is there a more elegant solution?
	var clone = catImg[0].cloneNode(true);
	catImg[0].parentNode.replaceChild(clone, catImg[0]);
	document.getElementById(index).addEventListener('click', (function(thisCopy, counterCopy) {
		return function() {
			thisCopy.count += 1;
			counterCopy.innerHTML = thisCopy.count;
		};
	})(this, counter));
};

// Method to create cat list
Cat.prototype.createMenu = function(index) {
	var listNode = document.createElement('li');
	var listText = document.createTextNode(this.name);
	listNode.appendChild(listText);
	catList.appendChild(listNode);
	listNode.addEventListener('click', (function(object, indexCopy) {
		return function() {
			object.fillOutSection(indexCopy);
		};
	})(this, index));
};

// Instances of Cat class
var catArray = [];
catArray.push(new Cat('Stanley', 'cute-cat.jpg', 'Awww, adorbs.'));
catArray.push(new Cat('Herbert', 'cute-cat-2.jpg', 'Purty kitty.'));
catArray.push(new Cat('Jorge', 'cute-cat-3.jpg', 'What a villain.'));

// Store number of cats
var numberOfCats = catArray.length;

// Create cat list
for (var k = 0; k < numberOfCats; k++) {
	catArray[k].createMenu(k);
}

catArray[0].fillOutSection(0);