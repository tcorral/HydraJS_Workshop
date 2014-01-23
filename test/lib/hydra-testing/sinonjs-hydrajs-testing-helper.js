(function () {
  'use strict';
  function adapter(Hydra, sinon) {
    Hydra.testing.setMockLibrary(sinon, {
      getAllFunctionsStubbed: function (oObj) {
        var sKey,
        oMock = {},
        oWhatever;
        if (typeof oObj === 'function') {
          if (oObj.prototype) {
            oMock = sinon.stub();
            oMock.prototype = {};
            for(sKey in oObj.prototype){
              oWhatever = oObj.prototype[sKey];
              if (typeof oWhatever === 'function') {
                oMock.prototype[sKey] = sinon.stub();
              } else {
                oMock.prototype[sKey] = oWhatever;
              }
            }
          }else{
            return sinon.stub();
          }
          return oMock;
        }
        for (sKey in oObj) {
          oWhatever = oObj[sKey];
          if (typeof oWhatever === 'function') {
            oMock[sKey] = sinon.stub();
          } else {
            oMock[sKey] = oWhatever;
          }
        }
        return oMock;
      }
    });
    return Hydra;
  }

  if (typeof define !== 'undefined') {
    define('sinonjs-hydrajs-testing-helper', ['hydrajs-testing-helper', 'sinon'], adapter);
  } else {
    adapter(Hydra, sinon);
  }
}());