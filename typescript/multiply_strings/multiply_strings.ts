function multiply(num1: string, num2: string): string {
    if (num1 == "0" || num2 == "0") {
        return "0";
    }

    const l1: number = num1.length;
    const l2: number = num2.length;
    let ml = Math.max(l1, l2);
    let nums: string[] = [];
    for (let i = 0; i < l2; i++) {
        let carry: number = 0;
        let num: string = '0'.repeat(i);
        let d2 = Number(num2[l2 - i - 1]);
        for (let k = 0; k < l1; k++) {
            let d1 = Number(num1[l1 - k - 1]);
            let m = (d1 * d2 + carry).toString();
            num = m[m.length - 1] + num;
            carry = Number(m.substring(0, m.length - 1));
        }
        if (carry > 0) {
            num = carry.toString() + num;
        }
        ml = Math.max(ml, num.length);
        nums.push(num);
    }

    let res = '';
    let carry: number = 0;
    for (let i = 0; i < ml; i++) {
        let v = carry;
        for (let n of nums) {
            if (n.length > i) {
                let d = Number(n[n.length - i - 1]);
                v += d;
            }
        }
        let s = v.toString();
        res = s[s.length - 1] + res;
        carry = (v - v % 10) / 10;
    }

    if (carry > 0) {
        res = carry.toString() + res;
    }

    return res;
};
function testSol(inp, func, result) {
    if (result !== undefined) {
        if (func.apply(void 0, inp) === result) {
            console.log("PASS: " + JSON.stringify(inp));
        }
        else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    }
    else {
        console.log("For input " + JSON.stringify(inp));
        var sol = func.apply(void 0, inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}
var f = multiply;
testSol(["2", "3"], f, "6");
testSol(["123", "456"], f, "56088");
testSol(["999", "999"], f, "998001");