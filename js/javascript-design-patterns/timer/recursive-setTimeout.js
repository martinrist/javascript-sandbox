setTimeout(function count(num) {
    num += 1;
    console.log('Counting : ' + num);
    setTimeout(count, 1000, num)
}, 1000, 0);