var patt = new RegExp("xyz")

var  r= "xababab".match(patt);
console.log(r)
// while((result = patt.exec("xababab")) !== null){
// 	console.log(result);
// 	console.log(patt.lastIndex);
// 	if(result.index === patt.lastIndex){
// 		patt.lastIndex+=1;
// 	}
// }