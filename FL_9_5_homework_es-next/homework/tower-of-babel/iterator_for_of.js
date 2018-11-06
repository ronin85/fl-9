const max = process.argv[2];
    let FizzBuzz = {
      [Symbol.iterator]() {
        let start = 1;
        return {
            next() {
                let returnValue;
                if(start % 3 === 0 && start % 5 === 0) {
                    returnValue = "FizzBuzz"
                } else if(start % 3 === 0) {
                    returnValue = 'Fizz'
                } else if(start % 5 === 0) {
                    returnValue = 'Buzz'
                } else {
                    returnValue = start;
                }

                if(start <= max) {
                    start++;
                    return {
                        done: false,
                        value: returnValue
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
      }
    }

    for (var n of FizzBuzz) {
      console.log(n);
    }