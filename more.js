'use strict';
function issue110() {
  //<script id="jQuery">if (window.jQuery) alert("jQuery");</script>
}

function issue122() {
  // inner function declaration always overrides the named parameter.
  function foo(a) {
    a();
    var a = function() {
      console.log('newyay');
    };
    a();
    function a() {
      console.log('yay');
    }
    a();
  }

  foo(); // yay  newyay  newyay
  foo(undefined); // yay  newyay  newyay
  foo(function() {
    console.log('bam');
  }); // yay  newyay  newyay
}
// issue122();

function issue179(params) {
  // There is no ReferenceError here. The reason is in section 10.4.2 of ECMAScript 5.1 specification, which says how we "entering" on eval code:
  // The following steps are performed when control enters the execution context for eval code:
  // If there is no calling context or if the eval code is not being evaluated by a direct call (15.1.2.1.1) to the eval function then,
  // Initialise the execution context as if it was a global execution context using the eval code as C as described in 10.4.1.1.
  function foo(str) {
    'use strict';
    console.log(global.a); // undefined
    var e = eval;
    e(str);
    console.log(global.a); // will write 2
  }
  foo('var a = 2');
}
// issue179();

function issue223() {
  function a() {
    a = 2; //success   mutable
    console.log(a);
  }
  var b = function b() {
    b = 2; //error   immutable
    console.log(b);
  };
  a();
  b();
  (function a() {
    a = 2; //error   immutable
    console.log(a);
  })();
}
// issue223();

function issue208() {
  'use strict';
  //this values of primitives in strict mode are not boxed,

  function foo() {
    console.log(typeof this);
  }
  foo.call('hello'); // "string"

  (function() {
    console.log(
      [1, 2, 3].some(function(i) {
        return i === this; //true
      }, 2)
    );
  })();
  String.prototype.doThis = function() {
    console.log(typeof this);
  };
  'abc'.doThis(); // string
}
// issue208();
