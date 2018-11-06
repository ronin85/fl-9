var inputs = process.argv.slice(2);
    var result = inputs.map((el) => el.slice(0, 1).toUpperCase())
                       .reduce((accumulator, currentValue) => accumulator + currentValue);
    console.log(result);