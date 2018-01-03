(function() {
	var sortTableElement = document.getElementById('sortTable');
	var addRowElement = document.getElementById('addRow');
	var addColumnElement = document.getElementById('addColumn');
	var deleteRowElement = document.getElementById('deleteRow');
	var deleteColumnElement = document.getElementById('deleteColumn');
	var tableElement = document.getElementById("excel");

	var selectedRowIndex, selectedColumnIndex;

	tableElement.addEventListener('click', function(event) {
		window.console.log(tableElement);
	});

	function getCharCode(index) {
		return String.fromCharCode("A".charCodeAt(0) + index - 1);
	}

	function createTable(rows, columns) {
		for (var i = 0; i <= rows; i++) {
			var row = tableElement.insertRow(-1);
			for (var j = 0; j <= columns; j++) {
				var letter = (i === 0 && j === 0) ? '' : getCharCode(j);
				row.insertCell(-1).innerHTML = i && j ? "<input id='" + letter + i + "'/>" : i || letter;
			}
		}
	};


	function createArrayFromTable() {
		var tableData = [];
		var rows = tableElement.rows;
		for (var i = 1; i < rows.length; i++) {
			var rowData = [];
			for (var j = 1; j < rows[i].cells.length; j++) {
				rowData.push(rows[i].cells[j].lastChild.value);
			}
			tableData.push(rowData);
		}
		return tableData;
	}

	function sortTableArrayByIndex(array, index) {
		return array.sort(function(a, b) {
			if (a[index] === b[index]) {
				return 0;
			} else {
				return (a[index] < b[index]) ? -1 : 1;
			}
		});
	}

	function renderSortedDataInTable(sortedArray) {
		var rows = tableElement.rows;
		for (var i = 1; i < rows.length; i++) {
			var rowData = sortedArray[i - 1];
			for (var j = 1; j < rows[i].cells.length; j++) {
				rows[i].cells[j].lastChild.value = rowData[j - 1];
			}
		}
	}

	function sort() {
		var tableDataAsArray = createArrayFromTable();
		var sortedArray = sortTableArrayByIndex(tableDataAsArray, 0);
		renderSortedDataInTable(sortedArray);
	}


	function addRow() {
		var rowLength = tableElement.rows.length,
			lastRowIndex = rowLength - 1,
			row = tableElement.insertRow(rowLength);

		for (var i = 0; i < tableElement.rows[0].cells.length; i++) {
			var letter = (i === 0) ? rowLength : getCharCode(i);
			row.insertCell(-1).innerHTML = i ? "<input class='input' id='" + letter + rowLength + "'/>" : letter;
		}
	}

	function addColumn() {
		var rowsLength = tableElement.rows.length;

		if(rowsLength === 0) {
			addRow();
		}
		var cellsLength = tableElement.rows[0].cells.length;

		for (var i = 0; i < rowsLength; i++) {
			var letter = getCharCode(cellsLength);
			tableElement.rows[i].insertCell(-1).innerHTML = i ? "<input class='input' id='" + letter + i + "'/>" : letter;
		}
	}

	function deleteRow() {
		tableElement.deleteRow(-1);
	}

	function deleteColumn() {
		var rows = tableElement.rows;
		for (var i = 0; i < rows.length; i++) {
			rows[i].deleteCell(-1);
		}
	}

	function init() {
		createTable(3, 3);

		addRowElement.addEventListener('click', function() {
			addRow();
		});

		addColumnElement.addEventListener('click', function() {
			addColumn();
		});

		deleteRowElement.addEventListener('click', function() {
			deleteRow();
		});

		deleteColumnElement.addEventListener('click', function() {
			deleteColumn();
		});

		sortTableElement.addEventListener('click', function() {
			sort();
		});
	}

	init();

})();