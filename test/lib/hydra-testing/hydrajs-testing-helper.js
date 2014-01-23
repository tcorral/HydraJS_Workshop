(function ()
{
  'use strict';
  var oMockLibrary = null,
  oAdapter = null,
  toString = Object.prototype.toString,
  isTypeOf = function ( oObj, sConstructor ) {
    return toString.call( oObj ) === '[object ' + sConstructor + ']';
  },
  convertArrayMappingToObject = function ( aKeys, aValues )
  {
    var nIndexMap,
    nLenMap = aKeys.length,
    sKey,
    oValue,
    oNew = {};
    for ( nIndexMap = 0; nIndexMap < nLenMap; nIndexMap++ )
    {
      sKey = aKeys[nIndexMap];
      oValue = aValues[nIndexMap];
      oNew[sKey] = oValue;
    }
    return oNew;
  },
  helper = function ( Hydra )
  {
    var oTestFramework = null,
    fpConvertObjectToDependenciesArray = function ( oDeps, aMapping )
    {
      var aCloneMapping, sMap, aDeps = [];

      if(!oDeps || !isTypeOf(aMapping, 'Array')){
        return aDeps;
      }

      aCloneMapping = aMapping.concat();

      while( !!( sMap = aCloneMapping.shift() ) ){
        aDeps.push( oDeps[sMap] );
      }
      return aDeps;
    },
    fpMockDependencies = function ( aDependencies )
    {
      var oDependency,
      nIndexDependency,
      nLenDependencies = aDependencies.length,
      aMocks = [];

      if ( oAdapter != null && oMockLibrary !== null )
      {
        for ( nIndexDependency = 0; nIndexDependency < nLenDependencies; nIndexDependency++ )
        {
          oDependency = aDependencies[nIndexDependency];
          aMocks.push( oAdapter.getAllFunctionsStubbed( oDependency ) );
        }
      }

      return aMocks;
    };

    /**
     * Sets the framework object that will be used to allow test and getModule methods in module
     * @static
     * @deprecated
     * @member Hydra
     * @param {Object} oTest
     */
    Hydra.setTestFramework = function ( oTest )
    {
      oTestFramework = oTest;
    };

    Hydra.extend( 'testing', {
      /**
       * Sets the framework object that will be used to allow test and getModule methods in module
       * @static
       * @member Hydra
       * @param {Object} oTest
       */
      setTestFramework: function ( oTestLibrary )
      {
        oTestFramework = oTestLibrary;
      },
      setMockLibrary: function ( oMockLib, oAdapt )
      {
        if ( !oMockLib )
        {
          throw new Error( 'The mock library is not valid!');
        }
        if ( typeof oAdapt.getAllFunctionsStubbed !== 'function' )
        {
          throw new Error( 'Adapter should implement a getAllFunctionsStubbed method.' );
        }
        oMockLibrary = oMockLib;
        oAdapter = oAdapt;
      }
    } );

    Hydra.extend( 'module', {
      /**
       * getModule returns the module with the id
       * It must work only when it's executed in oTestFramework environment
       * @member Hydra.module
       * @param {String} sModuleId
       * @param {String} sIdInstance
       * @return {Module}
       */
      getModule: function ( sModuleId, sIdInstance )
      {
        var oInstance;
        if ( oTestFramework )
        {
          oInstance = Hydra.module.getInstance( sModuleId );
          return this.setInstance( sModuleId, sIdInstance, oInstance );
        }
        return null;
      },
      /**
       * test is a method that will return the module without wrapping their methods.
       * It's called test because it was created to be able to test the modules with unit testing.
       * It must work only when it's executed in oTestFramework environment
       * You can mock your dependencies overwriting them.
       * @member Hydra.module
       * @param {String} sModuleId
       * @param {*} oDeps - Could be a function that gets the module as single argument or an array of dependencies to mock
       */
      test: function ( sModuleId, oDeps )
      {
        var oModule, oDependencies, aMocked, aMapping;
        if ( oTestFramework )
        {
          try
          {
            Hydra.setDebug( true );

            oDependencies = Hydra.resolveDependencies( sModuleId );
            aMapping = oDependencies.mapping;

            if(isTypeOf(oDeps, 'Object')){
              aMocked = fpConvertObjectToDependenciesArray( oDeps, aMapping );
            }else if(isTypeOf(oDeps, 'Array')){
              aMocked = oDeps;
            }else{
              aMocked = fpMockDependencies( oDependencies.dependencies );
            }

            oModule = Hydra.module.getInstance( sModuleId, aMocked );
            oModule.mocks = convertArrayMappingToObject( aMapping, aMocked );

            if ( typeof oDeps === 'function' )
            {
              oDeps( oModule );
            }
            else
            {
              return oModule;
            }
          }
          finally
          {
            oModule = null;
            Hydra.setDebug( false );
          }
        }
        return null;
      }
    } );
    return Hydra;
  };

  if ( typeof define !== 'undefined' )
  {
    define( 'hydrajs-testing-helper', ['hydra'], helper );
  }
  else
  {
    helper( Hydra );
  }

}());