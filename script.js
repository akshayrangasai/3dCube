		var snap = 1;
/* Disable righclick */
		document.oncontextmenu =  function()
		{
		return false;
		};


/*					*/
				var starttime,endtime = 0;
				var dateObj = new Date();
				var drag = 0;
        var xAngle = 0, yAngle = 0;
        var cubeSide = 360;
		function coords(x,y)
				{
				this.x = x;
				this.y = y;
				}
		function omega(start,end,timediff)
				{
				var diffx = (end.x-start.x > 0)?-1*(end.x-start.x):(end.x-start.x);
				var xAngle_local = Math.floor((diffx)*2/360)*90;
				//alert(timediff);
				//alert(xAngle_local);
				var diffy = (end.y-start.y > 0)?-1*(end.y-start.y):(end.y-start.y);
				yAngle += 0;//xAngle_local;
				var yAngle_local = Math.floor((diffy)*2/360)*90;
				xAngle += 0;//yAngle_local;
				if(snap == 1)
				{
				document.getElementById('cubecontainer').style.webkitTransition = "-webkit-transform 1s linear";
				document.getElementById('cubecontainer').style.MozTransition = "-moz-transform 1s linear";
				document.getElementById('cubecontainer').style.transition = "transform 1s linear";
				rotate();
				}
				//alert(xAngle);
				} 		
				var starting = new coords(0,0);
				var ending = new coords(0,0);
				var drag_start = new coords(0,0);
				var drag_end = new coords(0,0);
				document.addEventListener('mousedown', function(e)
				{
				drag = 1;
				drag_start.x = e.clientX;
				drag_start.y = e.clientY;
				//document.getElementById("Events").innerHTML += "DOWN";
				starttime = dateObj.getTime();
				starting.x = e.clientX;
				starting.y = e.clientY;
				},false);   
				
				document.addEventListener('mouseup', function(e)
				{
				drag = 0;
				//document.getElementById("Events").innerHTML += "UP";
				endtime = dateObj.getTime();
				ending.x = e.clientX;
				ending.y = e.clientY;
				omega(starting,ending,(endtime-starttime));
				
				},false);  
				document.addEventListener('mousemove',function(e)
				{
				document.getElementById('bodyid').style.cursor = "move" ;
				if(drag == 1)
					{
					document.getElementById('cubecontainer').style.webkitTransition = "-webkit-transform 0s linear";
					document.getElementById('cubecontainer').style.MozTransition = "-moz-transform 0s linear";
					document.getElementById('cubecontainer').style.transition = "transform 0s linear";
					document.getElementById('cubecontainer').style.cursor = "move";
					drag_end.x = e.clientX;
					drag_end.y = e.clientY;
					setTimeout(rotate_drag,10);
					}
					else
					{
					document.getElementById('cubecontainer').style.webkitTransition = "-webkit-transform 1s linear";
					document.getElementById('cubecontainer').style.MozTransition = "-moz-transform 1s linear";
					document.getElementById('cubecontainer').style.transition = "transform 1s linear";
					}
				}
				,false);
        document.addEventListener('keydown', function(e)
        {
                switch(e.keyCode)
                {

                        case 37: // left
                                yAngle -= 90;
                                break;

                        case 38: // up
                                xAngle += 90;
                                break;

                        case 39: // right
                                yAngle += 90;
                                break;

                        case 40: // down
                                xAngle -= 90;
                                break;
                };
                rotate();
        }, false);
		function rotate_drag()
			{
			var diffx = (drag_end.x-drag_start.x > 0)?1*(drag_end.x-drag_start.x):(drag_end.x-drag_start.x);
			var diffy = (drag_end.y-drag_start.y > 0)?-1*(drag_end.y-drag_start.y):-1*(drag_end.y-drag_start.y);
			var diag = Math.sqrt(2*Math.pow((cubeSide/2),2));
			
			var tan0x = ((Math.PI/4 - Math.atan((cubeSide - diffx*2)/(cubeSide)))/(2*Math.PI))*360;
			var tan0y = ((Math.PI/4 - Math.atan((cubeSide - diffy*2)/(cubeSide)))/(2*Math.PI))*360;
			var factor = 1;
			//document.getElementById('diffs').innerHTML += tan0x+"\t"+tan0y;
			yAngle += tan0x*factor;
			xAngle += tan0y*factor;
			//document.getElementById('diffs').innerHTML += tan0x+"\t\t";
			document.getElementById('cubecontainer').style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
            document.getElementById('cubecontainer').style.MozTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
            document.getElementById('cubecontainer').style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
			drag_start.x = drag_end.x;
			drag_start.y = drag_end.y;
			}
        function rotate()
        		{
				
				if(xAngle%90 >= 45 || xAngle%90 <= -45)
					{
					//document.getElementById('diffs').innerHTML += xAngle+"\t"+xAngle%90;
					if(xAngle < 0)
					{
					xAngle = Math.ceil((xAngle/90))*90;
					}
					else
					{
					xAngle = Math.floor((xAngle/90))*90;
					}
					}
					else
					{
					//document.getElementById('diffs').innerHTML += xAngle+"\tELSE\t"+xAngle%90;
					if(xAngle < 0)
					{
					xAngle = Math.ceil((xAngle/90))*90;
					}
					else
					{
					xAngle = Math.floor((xAngle/90))*90;
					}
					
					}
				if(yAngle%90 <= 45 || yAngle%90 >= -45)
					{
					if(yAngle < 0)
					{
					yAngle = Math.floor((yAngle/90))*90;
					}
					else
					{
					yAngle = Math.ceil((yAngle/90))*90;
					}
					}
				else
					{
					if(yAngle < 0)
					{
					yAngle = Math.ceil((yAngle/90))*90;
					}
					else
					{
					yAngle = Math.floor((yAngle/90))*90;
					}
					}
			
        	document.getElementById('cubecontainer').style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
            document.getElementById('cubecontainer').style.MozTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
            document.getElementById('cubecontainer').style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
        		}
			function toggleSnap()
				{
				var html = "";
				if(snap == 0)
					{
					snap = 1;
					html = "Snap is <span class = "+"'green'"+">On</span>";
					rotate();
					}
				else
					{
					snap = 0;
					html = "Snap is <span class = "+"'red'"+">Off</span>";
					}
				document.getElementById('snapval').innerHTML = html;
				}
