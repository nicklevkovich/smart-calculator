class SmartCalculator {

  constructor(initialValue) {
    this.stack = [];
    this.stack.push({
        num: initialValue,
        operand: null,
        priority: 0
    });
  }

  add(number) {
    this.stack.push({
        num: number,
        operand: (a, b) => a + b,
        priority: 2
    });
    return this;
  }

  subtract(number) {
    this.stack.push({
        num: -number,
        operand: (a, b) => a + b,
        priority: 1
    });
    return this;
  }

  multiply(number) {
    this.stack.push({
        num: number,
        operand: (a, b) => a * b,
        priority: 4
    });
    return this;
  }

  devide(number) {
    this.stack.push({
        num: number,
        operand: (a, b) => a / b,
        priority: 3
    });
    return this;
  }

  pow(number) {
    this.stack.push({
        num: number,
        operand: (a, b) => a ** b,
        priority: 5
    });
    return this;
  }
  valueOf() {
    let result = 0;
    if (this.stack.length === 0) result = 0
    else if (this.stack.length === 1) result = this.stack[0].num
    else {
        for (let i = 5; i > 0; i--) {
            for (let j = this.stack.length - 1; j >= 0; j--) {
                if (this.stack[j].priority === i) {
                    let func = this.stack[j].operand;
                    this.stack[j - 1].num = func(this.stack[j - 1].num, this.stack[j].num);
                    if (this.stack[j - 1].num > 0 
                        && this.stack[j - 1].priority === 1 
                        && this.stack[j].priority === 5) { 
                        this.stack[j - 1].num = -this.stack[j - 1].num;
                        }
                    this.stack.splice(j, 1);
                }
            }
        }
        result = this.stack[0].num;
    }
    return result;
  }
}

module.exports = SmartCalculator;