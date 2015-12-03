
// function to create the chessboard
var chess = {
    createBoard: function (dimension) {
        if (!dimension || isNaN(dimension) || !parseInt(dimension, 10)) {
            return false;
        } else {
            dimension = typeof dimension === 'string' ? parseInt(dimension, 10) : dimension;
            var table = document.createElement('table'),
                tbody = document.createElement('tbody'),
                row = document.createElement('tr'),
                cell = document.createElement('td'),
                rowClone,
                cellClone;
            table.appendChild(tbody);
            for (var r = 0; r < dimension; r++) {
                rowClone = row.cloneNode(true);
                tbody.appendChild(rowClone);
                for (var c = 0; c < dimension; c++) {
                    cellClone = cell.cloneNode(true);
                    rowClone.appendChild(cellClone);
                }
            }
            document.body.appendChild(table);
			table.setAttribute("class", "middle border");
            chess.enumerateBoard(table);
        }
    },
    enumerateBoard : function (board) {
        var rows = board.getElementsByTagName('tr'),
            text = document.createTextNode(""),
            rowCounter,
            len,
            cells;
        for (var r = 0, size = rows.length; r<size; r++){
            cells  = rows[r].getElementsByTagName('td');
            len = cells.length;
            rows[r].className = r%2 == 0 ? 'even' : 'odd';
            for (var i = 0; i<len; i++){
                cells[i].className = i%2 == 0 ? 'even' : 'odd';
				var id = "" + r + i;
				cells[i].setAttribute("id", "" + r + i);
				cells[i].addEventListener("click",myFunction);
			//  var span1 = document.createElement('span');
			//  span1.setAttribute("class" , "queen");
            //  cells[i].appendChild(span1);
            //  cells[i].firstChild.nodeValue = "";
			
            }
        }
    }
};

function clickme()
{
	var btn = document.getElementById("btn1");
	btn.disabled = true;
	chess.createBoard(8);
	document.getElementById('btn2').addEventListener("click",clear);
	document.getElementById('btn3').addEventListener("click",MySolution);
}

// function to place dots and queens on the chessboard
function myFunction()
{
	if(sol_flag == 1)
    {
     	sol_flag = 0;
        clear();
    }
	if($(this).attr('id') != null)
	{
		var spans = document.getElementsByTagName('span');
		var id = $(this).attr('id');
		var cell = document.getElementById(id);
		if($(this).children().length == 0)
		{
			var span1 = document.createElement('span');
			span1.setAttribute("class" , "queen");
			cell.appendChild(span1);
			var row = parseInt(id/10);
			var col = parseInt(id%10);
			
			for ( var i = 0 ; i < 8; i++)
			{
				var id2 = "" + i + col;
				var id3 = "" + row + i;
				putDot(id2);
				putDot(id3);
			}
			
			for ( var j = row , k = col ; j >= 0 && k < 8; j--, k++)
			{
				var id4 = "" + j + k;
				putDot(id4);
			}
			
			for ( var j = row , k = col ; j < 8 && k < 8; j++, k++)
			{
				var id5 = "" + j + k;
				putDot(id5);
			}
			
			for ( var j = row , k = col ; j >= 0 && k >= 0; j--, k--)
			{
				var id6 = "" + j + k;
				putDot(id6);
			}			
			for ( var j = row , k = col ; j < 8 && k >= 0; j++, k--)
			{
				var id7 = "" + j + k;
				putDot(id7);
			}
		}
		if(spans.length >= 64)
		{
			var queens = $(".queen");
			if(queens.length < 8)
			{
				alert('No Solution. Try Again');
				return;
			}
			else
			{
				alert('Congratulations. You have found the solution.');
				return;
			}
		}
	}
}

function putDot( id )
{
	var cell = document.getElementById(id);
	if ( cell.childNodes.length == 0)
	{
		var span3 = document.createElement('span');
		span3.setAttribute("class" , "circle");
		cell.appendChild(span3);
	}
}

var Result = {};
var count = 0;
var flag = 1;
var Unique = {};
var x = 1;
var sol_flag = 0;

function putQueen( id )
{
	var cell = document.getElementById(id);
	if ( cell.childNodes.length == 0)
	{
		var span3 = document.createElement('span');
		span3.setAttribute("class" , "queen");
		cell.appendChild(span3); 
	}
}

function removeQueen( id )
{
	var cell = document.getElementById(id);
	if ( cell.childNodes.length > 0)
	{
		cell.removeChild(cell.lastChild);
	}
}

function clear()
{
	//clearResult();
	var col = document.getElementsByTagName("td");
	for( var i = 0 ; i < col.length ; i++)
	{
		if(col[i].hasChildNodes())
		{
		col[i].removeChild(col[i].lastChild);
		}
	}
}

function MySolution()
{
	sol_flag = 1;
	document.getElementById('btn3').innerText = "Next Solution";
	var col = document.getElementsByTagName("td");
	for( var i = 0 ; i < col.length ; i++)
	{
		if(col[i].hasChildNodes())
		{
		col[i].removeChild(col[i].lastChild);
		}
	}
	var Board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	solution(Board,0);
}

function solution(Board, col )
{
	// condition to check whether all the solutions have been displayed
	if (countProperties(Result) >= 92)
	{
		if(flag == 1)
		{	
			flag = 0;
			alert('All unique solutions have been displayed.');
		}
		//function to print unique solutions which were stored in a temporary variable
		disp();
		return; 
	}
	if(col>= 8)
	{
		// If all the columns are placed with a queen then the solution is obtained. 
		var temp = Board;
		if(count == 0)
		{
			// Storing all the reflections and mirror images in the object Result and storing the unique solution in Unique
			count++;
			var z = 1;
			Unique[z] = temp;
			Result[z] = temp;
			var ref1 = temp;
			ref1 = mirror(temp);
			z++;
			Result[z] = ref1;
			ref1 = first_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			ref1 = second_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			ref1 = third_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			return true;
		}
		else
		{
			count++;
			for(var t = 1; t<=countProperties(Result); t++)
			{
				var test = Result[t];
				if(isEqual(test,temp))
					return false;
			}
			var uniq = countProperties(Unique);
			Unique[uniq + 1] = temp;
			var items = countProperties(Result);
			z = items + 1; 
			Result[z] = temp;
			var ref1 = temp;
			ref1 = mirror(temp);
			z++;
			Result[z] = ref1;
			ref1 = first_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			ref1 = second_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			ref1 = third_ref( temp );
			z++;
			Result[z] = ref1;
			ref1 = mirror(ref1);
			z++;
			Result[z] = ref1;
			return true;
		}
	}
	for(var i = 0; i< Board.length; i++)
	{
		if(isSafe(Board,i,col))
		{
			Board[i][col] = 1;
			putQueen("" + i + col);
			// Backtracking algorithm
			if(solution(Board, col+1))
				return true;
			// Undo changes if no solution found
			Board[i][col] = 0;
			removeQueen("" + i + col);		
		}
	}
	return false;
}

function isSafe(Board,row,col)
{
	var i , j;
	for(i = 0; i<col; i++)
	{
		if(Board[row][i] == 1)
			return false;
	}
	
	for (i=row, j=col; i>=0 && j>=0; i--, j--)
	{
        if (Board[i][j] == 1)
            return false;
	}
	
    for (i=row, j=col; j>=0 && i<Board.length; i++, j--)
	{
        if (Board[i][j] == 1)
			return false;
	}
	return true;
}

function countProperties(obj) {
    var count2 = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count2;
    }

    return count2;
}

function isEqual( A , B )
{
	for(var m = 0 ; m < A.length; m++)
	{
		for (var n = 0; n < A.length; n++)
		{
			if(A[m][n] != B[m][n])
			{
				return false;
			}
		}
	}
	return true;
}

function clearResult()
{
	for( var i = 0; i < countProperties(Result); i++)
	{
		var chr = String.fromCharCode(97 + i); 
		delete Result.chr;
	}
}

function first_ref( M )
{
	var B = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	var i,j,m,n;
	for( i = 0, m = 7 ; i < 8 && m >=0 ; i++ , m--)
	{
		for( j = 0, n = 7 ; j < 8 && n >= 0 ; j++ , n--)
		{
			B[i][j] = M[m][n];
		}
	}
	return B;
}

function second_ref( M )
{
	var B = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	var i,j,m,n;
	for( i = 0, m = 7 ; i < 8 && m >= 0 ; i++ , m--)
	{
		for( j = 0, n = 0 ; j < 8 && n < 8 ; j++ , n++)
		{
			B[i][j] = M[n][m];
		}
	}
	return B;
}

function third_ref( M )
{
	var B = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	var i,j,m,n;
	for( i = 0, m = 0 ; i < 8 && m < 8 ; i++ , m++)
	{
		for( j = 0, n = 7 ; j < 8 && n >= 0 ; j++ , n--)
		{
			B[i][j] = M[n][m];
		}
	}
	return B;
}
function mirror( M )
{
	var B = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	var i,j,n;
	for( i = 0; i < 8; i++ )
	{
		for( j = 0, n = 7 ; j < 8 && n >= 0 ; j++ , n--)
		{
			B[i][j] = M[i][n];
		}
	}
	return B;
}

function disp()
{
	while(1<2)
	{
		if( x > 12 )
			 x = 1;
		for( var i = 0; i < 8; i++)
		{
			for( var j = 0; j < 8 ; j++)
			{
				var sol = Unique[x];
				if (sol[i][j] == 1)
					putQueen( "" + i + j);
			}
		}
		x++;
		return;
	}
}

