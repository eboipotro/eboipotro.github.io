!(function() {

	var parseQueryFromURL = function() {
		
		var searchQuery = window.location.search;
		if (!searchQuery) {
			return null;
		}

		var regex = /[?&]([^=#]+)=([^&#]*)/g,
		    params = {},
		    match;
		while (match = regex.exec(searchQuery)) {
			params[match[1]] = match[2];
		}

		if (!params.hasOwnProperty("query")) {
			return null;
		}

		return decodeURIComponent(params.query);

	};

	var scanPosts = function(posts, properties, query) {

		var results = [];
		posts.forEach(function(post) {
			var textToScan = "",
				regex = new RegExp(query, "ig");

			properties.forEach(function(property) {
				if (post.hasOwnProperty(property)) {
					textToScan += post[property];
				}
			});

			if (regex.test(textToScan)) {
				results.push(post);
			}
		});

		return results;

	};

    var outputResults = function(results, el, query) {
	    
	var frag = document.createDocumentFragment();
	results.forEach(function(result, query) {
	    var entry = document.createElement("entry");
	    
	    var search = content
	    var title = document.createElement("title");
            title.innerHTML = result.title;
	    var updated = document.createElement("updated");
            updated.innerHTML = result.updatedate;
	    var imglink = document.createElement("link");
            imglink.href = result.img;
            imglink.type = "image/png";
            imglink.rel = "http://opds-spec.org/image";
            var thumlink = document.createElement("link");
            thumlink.href = result.img;
            thumlink.type = "image/png";
            thumlink.rel = "http://opds-spec.org/image/thumbnail";
            var dlink = document.createElement("link");
            dlink.href = result.dlink;
            dlink.type = "application/epub+zip";
            dlink.rel = "http://opds-spec.org/acquisition";
            var issued = document.createElement("dcterms:issued");
            issued.innerHTML = result.date;
            var author = document.createElement("author");
            var name = document.createElement("name");
            name.innerHTML = result.author;
            var publisher = document.createElement("dcterms:issued");
            publisher.innerHTML = result.pub
            var language = document.createElement("dcterms:language");
            language.innerHTML = result.lang
	    author.appendChild(name);
	    entry.appendChild(title);
            entry.appendChild(dlink);
            entry.appendChild(imglink);
            entry.appendChild(thumlink);
            entry.appendChild(issued);
            entry.appendChild(author);
            entry.appendChild(publisher);
            entry.appendChild(language);
	    frag.appendChild(div);
	    
	});
	
	el.appendChild(frag);
	
    };

	var Search = function(options) {

		options = options || {};
		
		if (!options.selector) {
			throw new Error("We need a selector to find");
		}

		this.el = document.querySelector(options.selector);
		if (!this.el) {
			throw new Error("We need a HTML element to output to");
		}

		this.posts = JEKYLL_POSTS;
		if (!this.posts) {
			return this.el.innerHTML = this.noResultsMessage;
		}

		var defaultMessage = "কিছু পাওয়া যায়নি।";
		this.noResultsMessage = options.noResultsMessage || defaultMessage;

		var defaultProperties = ["title"];
		this.properties = options.properties || defaultProperties;

		this.query = parseQueryFromURL();
		if (!this.query) {
			return this.el.innerHTML = this.noResultsMessage;
		}

		this.results = scanPosts(this.posts, this.properties, this.query);
		if (!this.results.length) {
			return this.el.innerHTML = this.noResultsMessage;
		}

		outputResults(this.results, this.el);

	};

	window.jekyllSearch = Search;

})();
