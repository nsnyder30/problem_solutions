function countAndSay(n: number): string {
    if(n == 1){return "1";}
    let ret = "";
    let str = countAndSay(n-1);
    let x = str[0];;
    n = 0;
    for(let i = 0; i < str.length; i++) {
        let v = str[i];
        if(v == x) {
            n += 1;
        } else {
            ret += n.toString() + x.toString();
            x = v;
            n = 1;
        }
    }
    ret += n.toString() + x.toString();
    return ret;
};

let inp = 1;
console.log("For input: "+inp.toString(), " CountAndSay = '"+countAndSay(inp)+"'");

inp = 4;
console.log("For input: "+inp.toString(), " CountAndSay = '"+countAndSay(inp)+"'");

inp = 5;
console.log("For input: "+inp.toString(), " CountAndSay = '"+countAndSay(inp)+"'");

inp = 6;
console.log("For input: "+inp.toString(), " CountAndSay = '"+countAndSay(inp)+"'");

inp = 10;
console.log("For input: "+inp.toString(), " CountAndSay = '"+countAndSay(inp)+"'");