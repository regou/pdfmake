
module.exports = function (self) {
	self.addEventListener('message',function (ev){
		var printer = ev.data.printer;
		var options = ev.data.options;

		var doc = printer.createPdfKitDocument(this.docDefinition, options);
		var chunks = [];
		var result;

		doc.on('data', function(chunk) {
			chunks.push(chunk);
		});
		doc.on('end', function() {
			result = Buffer.concat(chunks);
			self.postMessage([result, doc._pdfMakePages]);
		});
		doc.end();
	});
};
