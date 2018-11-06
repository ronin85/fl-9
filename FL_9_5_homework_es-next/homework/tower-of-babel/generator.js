const max = process.argv[2];
    let FizzBuzz = function* (max){
        let start = 1;
        let returnValue;

        while (start <= max) {
            if(start % 3 === 0 && start % 5 === 0) {
                returnValue = "FizzBuzz"
            } else if(start % 3 === 0) {
                returnValue = 'Fizz'
            } else if(start % 5 === 0) {
                returnValue = 'Buzz'
            } else {
                returnValue = start;
            }
            start++;
            yield returnValue;
        }
    }

    for (var n of FizzBuzz(max)) {
      console.log(n);
    }