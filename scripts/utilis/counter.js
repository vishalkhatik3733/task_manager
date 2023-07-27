//export const counter = (function (){
 //   var count = 0;
  
 //  return () => ++count;
//   function counter() {
//    return ++count;
//  }
 //  return counter;

//}) ();

export function* autoGen(){
    var count = 0;
    while (true){
       count++;
       yield count;
    }
}