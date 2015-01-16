(function() {


  //=================== ELEMENT SELECTORS ==============================
      //-- Display Elements
  var $display = document.getElementsByClassName('display-text')[0],
      $displayHist = document.getElementsByClassName('display-hist')[0],
      //-- Numbers
      $btnNumbers = document.getElementsByClassName('num');
      //-- Operators
      $btnOperators = document.getElementsByClassName('operator');
      $btnEquals = document.getElementsByClassName('equals')[0];
      $btnClear = document.getElementsByClassName('clear')[0];
      $btnInverse = document.getElementsByClassName('inverse')[0];
      $btnDot = document.getElementsByClassName('dot')[0];

  //=================== CALCULATION FUNCTIONS ==========================
  var calculator = {};

  calculator.heldValue = null;
  calculator.currentValue = null;
  calculator.currentTotal = 0;
  calculator.memoryBank = [];
  calculator.queuedOperation = null;


  //--- Input
  calculator.getNumber = function(n) {  };
  calculator.getOperator = function(op) {
      if (this.queuedOperation !== null) { this.myEval(); }
      if (!this.heldValue) { this.heldValue = this.currentValue; }
      this.addToDisplayHist(this.currentValue);
      this.queuedOperation = op.target.getAttribute('data-op');
      this.addToDisplayHist(op.target.textContent);
      console.log(this.queuedOperation);
      $display.value = "";
  };
  //--- Do Math
  calculator.myEval = function() {
    switch(this.queuedOperation) {
      case "add":
        this.currentTotal = this.myAdd(this.heldValue, this.currentValue);
      break;
      case "subtract":
        this.currentTotal = this.mySubtract(this.heldValue, this.currentValue);
      break;
      case "multiply":
        this.currentTotal = this.myMultiply(this.heldValue, this.currentValue);
      break;
      case "divide":
        this.currentTotal = this.myDivide(this.heldValue, this.currentValue);
      break;
      default:
      break;
    }
    this.heldValue = this.currentTotal;
    this.queuedOperation = null;
    console.log(this.currentTotal);
  };

  calculator.myAdd = function(a, b) { return a + b; };
  calculator.mySubtract = function(a, b) { return a - b; };
  calculator.myMultiply = function(a, b) { return a * b; };
  calculator.myDivide = function(a, b) { return a / b; };


  //--- Display / Output
  calculator.showNum = function(n) {
    $display.value += n;
    this.currentValue = +($display.value);
    console.log(this.currentValue);
  };
  calculator.addToDisplayHist = function(val) {
    $displayHist.textContent += val + " ";
  };
  calculator.showTotal = function() {
    this.myEval();
    $display.value = this.currentTotal;
  };
  calculator.clearDisplay = function() {
    $display.value = '';
    $displayHist.textContent = '';
  };
  calculator.clearMemory = function() {
    calculator.heldValue = null;
    calculator.currentValue = null;
    calculator.currentTotal = 0;
    calculator.memoryBank = [];
    calculator.queuedOperation = null;
  };
  calculator.posNeg = function() {
    this.currentTotal = 0 - this.currentTotal;
    $display.value = this.currentTotal;
  };
  calculator.addDot = function() {
    $display.value += '.';
  };

  //===================== EVENT LISTENERS ==============================
  $display.addEventListener('input', function(e) { });
  Array.prototype.forEach.call($btnNumbers, function(el) {
    el.addEventListener('click', function(e) { calculator.showNum(e.target.textContent); });
    });
  Array.prototype.forEach.call($btnOperators, function(el) {
    el.addEventListener('click', function(e) { calculator.getOperator(e); });
  });
  $btnClear.addEventListener('click', function(e) {
    calculator.clearDisplay();
    calculator.clearMemory();
  });
  $btnEquals.addEventListener('click', function(e) { calculator.showTotal(); });
  $btnInverse.addEventListener('click', function(e) { calculator.posNeg(); });
  $btnDot.addEventListener('click', function(e) { calculator.addDot(); });


})();
