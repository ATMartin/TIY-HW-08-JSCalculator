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
      $btnEuler = document.getElementsByClassName('euler')[0];
      $btnPi = document.getElementsByClassName('pi')[0];
      $btnPhi = document.getElementsByClassName('phi')[0];
      $btnAvogadro = document.getElementsByClassName('avogadro')[0];
      $btnSin = document.getElementsByClassName('sin')[0];
      $btnCos = document.getElementsByClassName('cos')[0];
      $btnTan = document.getElementsByClassName('tan')[0];
      $btnSinh = document.getElementsByClassName('sinh')[0];
      $btnCosh = document.getElementsByClassName('cosh')[0];
      $btnTanh = document.getElementsByClassName('tanh')[0];
      $btnLog10 = document.getElementsByClassName('log10')[0];
      $btnLn = document.getElementsByClassName('ln')[0];
      $btnLogX = document.getElementsByClassName('logx')[0];
      $btnSqRt = document.getElementsByClassName('rt2')[0];
      $btnCubeRt = document.getElementsByClassName('rt3')[0];
      $btnXRt = document.getElementsByClassName('rtx')[0];
      $btnExp2 = document.getElementsByClassName('exp2')[0];
      $btnExp3 = document.getElementsByClassName('exp3')[0];
      $btnExpX = document.getElementsByClassName('expx')[0];
      $btnRandom = document.getElementsByClassName('random')[0];
      //-- Memory
      $btnMemStore = document.getElementsByClassName('mem-store')[0];
      $btnMemAdd = document.getElementsByClassName('mem-add')[0];
      $btnMemSubtract = document.getElementsByClassName('mem-subtract')[0];
      $btnMemRecall = document.getElementsByClassName('mem-recall')[0];
      $btnMemClear = document.getElementsByClassName('mem-clear')[0];

  //=================== CALCULATION FUNCTIONS ==========================
  var calculator = {};

  calculator.heldValue = null;
  calculator.currentValue = null;
  calculator.currentTotal = 0;
  calculator.memory = 0;
  calculator.queuedOperation = null;


  //--- Input
  calculator.getNumber = function(n) {  };
  calculator.getOperator = function(op) {
      if (this.queuedOperation !== null) { this.myEval(); }
      if (!this.heldValue) { this.heldValue = this.currentValue; }
      this.addToDisplayHist(this.currentValue);
      this.queuedOperation = op.target.getAttribute('data-op');
      this.addToDisplayHist('(' + op.target.textContent + ')');
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
      case "exponent":
        this.currentTotal = this.myExpX(this.heldValue, this.currentValue);
        break;
      case "log":
        this.currentTotal = this.myLogX(this.currentValue, this.heldValue);
        break;
      case "root":
        this.currentTotal = this.myRootX(this.heldValue, this.currentValue);
        break;
      default:
      break;
    }
    this.heldValue = this.currentTotal;
    this.queuedOperation = null;
  };

  calculator.myAdd = function(a, b) { return a + b; };
  calculator.mySubtract = function(a, b) { return a - b; };
  calculator.myMultiply = function(a, b) { return a * b; };
  calculator.myDivide = function(a, b) { return a / b; };
  calculator.myExpX = function(a, b) { return Math.pow(a, b); }; // a ^ b
  calculator.myLogX = function(a, b) { return Math.log(b) / Math.log(a); }; //log(base a)b
  calculator.myRootX = function(a, b) { return Math.pow(b, 1/a); }; //a(root)b


  //--- Memory Functions
  calculator.memStore = function() {
    this.memory = this.currentValue;
    console.log(this.currentValue + " stored to memory!");
    calculator.clearDisplay();
    };
  calculator.memAdd = function() { this.memory += this.currentValue; };
  calculator.memSubtract = function() { this.memory -= this.currentValue; };
  calculator.memRecall = function() {
    calculator.clearDisplay();
    calculator.showNum(this.memory);
  };
  calculator.memClear = function() {
    this.memory = 0;
    calculator.clearDisplay();
    console.log("Memory cleared!");
  };

  //--- Display / Output
  calculator.showNum = function(n) {
    $display.value = n;
    this.currentValue = +($display.value);
    console.log(this.currentValue);
  };
  calculator.appendNum = function(n) {
    $display.value += n;
    this.currentValue = +($display.value);
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
  calculator.clearCache = function() {
    calculator.heldValue = null;
    calculator.currentValue = null;
    calculator.currentTotal = 0;
    calculator.queuedOperation = null;
  };
  calculator.clearMemory = function() {
    calculator.memoryBank = 0;
  };
  calculator.posNeg = function() {
    this.currentTotal = 0 - this.currentTotal;
    $display.value = this.currentTotal;
  };
  calculator.addDot = function() {
    $display.value += '.';
  };
  calculator.addEulersNumber = function() {
    this.showNum(Math.E);
  };
  calculator.addPi = function() {
    this.showNum(Math.PI);
  };
  calculator.addPhi = function() {
    this.showNum(1.6180339887);
  };
  calculator.addAvogadro = function() {
    alert("Silly chemist - go buy a real calculator!");
  };
  calculator.doSin = function() {
    this.showNum(Math.sin(this.currentValue));
  };
  calculator.doCos = function() {
    this.showNum(Math.cos(this.currentValue));
  };
  calculator.doTan = function() {
    this.showNum(Math.tan(this.currentValue));
  };
  calculator.doHSin = function() {
    this.showNum(Math.sinh(this.currentValue));
  };
  calculator.doHCos = function() {
    this.showNum(Math.cosh(this.currentValue));
  };
  calculator.doHTan = function() {
    this.showNum(Math.tanh(this.currentValue));
  };
  calculator.doLog10 = function() {
    this.showNum(Math.log(this.currentValue) / Math.log(10));
  };
  calculator.doLn = function() {
    this.showNum(Math.log(this.currentValue));
  };
  calculator.doRoot = function(n) {
    this.showNum(Math.pow(this.currentValue, 1/n));
  };
  calculator.doExp = function(n) {
    this.showNum(Math.pow(this.currentValue, n));
  };
  calculator.doRandom = function() {
    this.showNum(Math.floor(Math.random() * this.currentValue));
  };

  //===================== EVENT LISTENERS ==============================
  $display.addEventListener('input', function(e) { });
  Array.prototype.forEach.call($btnNumbers, function(el) {
    el.addEventListener('click', function(e) { calculator.appendNum(e.target.textContent); });
    });
  Array.prototype.forEach.call($btnOperators, function(el) {
    el.addEventListener('click', function(e) { calculator.getOperator(e); });
  });
  $btnClear.addEventListener('click', function(e) {
    calculator.clearDisplay();
    calculator.clearCache();
    calculator.clearMemory();
  });
  $btnEquals.addEventListener('click', function(e) { calculator.showTotal(); });
  $btnInverse.addEventListener('click', function(e) { calculator.posNeg(); });
  $btnDot.addEventListener('click', function(e) { calculator.addDot(); });
  $btnEuler.addEventListener('click', function(e) {calculator.addEulersNumber(); });
  $btnPi.addEventListener('click', function(e) { calculator.addPi(); });
  $btnPhi.addEventListener('click', function(e) { calculator.addPhi(); });
  $btnAvogadro.addEventListener('click', function(e) { calculator.addAvogadro(); });
  $btnSin.addEventListener('click', function(e) { calculator.doSin(); });
  $btnCos.addEventListener('click', function(e) { calculator.doCos(); });
  $btnTan.addEventListener('click', function(e) { calculator.doTan(); });
  $btnSinh.addEventListener('click', function(e) { calculator.doHSin(); });
  $btnCosh.addEventListener('click', function(e) { calculator.doHCos(); });
  $btnTanh.addEventListener('click', function(e) { calculator.doHTan(); });
  $btnLog10.addEventListener('click', function(e) { calculator.doLog10(); });
  $btnLn.addEventListener('click', function(e) { calculator.doLn(); });
  $btnSqRt.addEventListener('click', function(e) { calculator.doRoot(2); });
  $btnCubeRt.addEventListener('click', function(e) { calculator.doRoot(3); });
  $btnExp2.addEventListener('click', function(e) { calculator.doExp(2); });
  $btnExp3.addEventListener('click', function(e) { calculator.doExp(3); });
  $btnMemStore.addEventListener('click', function(e) { calculator.memStore(); });
  $btnMemAdd.addEventListener('click', function(e) { calculator.memAdd(); });
  $btnMemSubtract.addEventListener('click', function(e) { calculator.memSubtract(); });
  $btnMemRecall.addEventListener('click', function(e) { calculator.memRecall(); });
  $btnMemClear.addEventListener('click', function(e) { calculator.memClear(); });
  $btnRandom.addEventListener('click', function(e) { calculator.doRandom(); });

})();
