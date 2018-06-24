var myIndex = 0;
//var time =[9000, 5000, 7000 , 7000, 5000, 3000 , 5000, 3000] ;
var time =[11000, 5500, 2500, 10000, 4500, 3500, 1500, 9000, 5000, 3000, 6000, 1500, 10000] ; //TOTAL = 73 secondes
//var time =[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 90000, 100, 100] ; //TOTAL = secondes

carousel();

function carousel( ) {
    var i;
    var x = document.getElementsByClassName("watch_imgs");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1;
    }    



    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, time[myIndex-1]); 
}