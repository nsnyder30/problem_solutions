/*
Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.


1 <= words.length <= 300
1 <= words[i].length <= 20
words[i] consists of only English letters and symbols.
1 <= maxWidth <= 100
words[i].length <= maxWidth

*/
function fullJustify(words: string[], maxWidth: number): string[] {
    let res = [];
    let ctr = 0;
    let i = 0;
    while (words.length) {
        ctr += words[i].length;
        if (ctr + i > maxWidth) {
            ctr = i > 0 ? ctr - words[i].length : ctr;
            i = i > 0 ? i - 1 : i;
            addLine(i);
            ctr = 0;
            i = 0;
            continue;
        }

        i += 1;
        if (i == words.length) {
            addLine(i);
        }
    }

    function addLine(i: number) {
        let wset = words.splice(0, i + 1);
        if (i == 0 || !words.length) {
            let out = wset.join(' ');
            out = out + ' '.repeat(maxWidth - out.length);
            res.push(out);
            return;
        }

        let spaces = Math.floor((maxWidth - ctr) / (wset.length - 1));
        let rem = maxWidth - (ctr + spaces * (wset.length - 1));
        for (let k = 0; k < rem; k++) {
            wset[k] = wset[k] + ' ';
        }
        let delim = ' '.repeat(spaces);

        res.push(wset.join(delim));
        return;
    }
    return res;
};

function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        if (JSON.stringify(func(...inp)) === JSON.stringify(result)) {
            console.log("PASS: " + JSON.stringify(inp));
        } else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    } else {
        console.log("For input " + JSON.stringify(inp));
        let sol = func(...inp);
        console.log("The solution is " + sol.toString() + "\n");
    }
}

var f = fullJustify;
testSol([["This", "is", "an", "example", "of", "text", "justification."], 16], f, [
    "This    is    an",
    "example  of text",
    "justification.  "
]);
testSol([["What", "must", "be", "acknowledgment", "shall", "be"], 16], f, [
    "What   must   be",
    "acknowledgment  ",
    "shall be        "
]);
testSol([["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20], f, [
    "Science  is  what we",
    "understand      well",
    "enough to explain to",
    "a  computer.  Art is",
    "everything  else  we",
    "do                  "
]);
