/**
 * TestCase replacement that will use Jasmine describe and it functions.
 * @param sTestName
 * @param oProto
 * @param oType
 * @constructor
 */
window.TestCase = function TestCase( sTestName, oProto, oType )
{
  var fpBeforeEach = oProto.setUp || function ()
    {
    },
    fpAfterEach = oProto.tearDown || function ()
    {
    },
    aTests = [],
    nTest,
    sTest,
    nLenTests,
    oTest;

  for ( sTest in oProto )
  {
    if ( oProto.hasOwnProperty( sTest ) )
    {
      if ( sTest.indexOf( 'test ' ) === 0 )
      {
        aTests.push( { sName: sTest, fpCallback: oProto[sTest]} );
      }
    }
  }
  nLenTests = aTests.length;

  describe( sTestName, function ()
  {
    beforeEach( function ()
    {
      fpBeforeEach.call( this );
    } );
    afterEach( function ()
    {
      fpAfterEach.call( this );
    } );

    for ( nTest = 0; nTest < nLenTests; nTest++ )
    {
      oTest = aTests[nTest];
      it( oTest.sName, oTest.fpCallback );
    }
  } );
}

/**
 * ConditionalTestCase replacement to create a special testcase.
 * @param sTestName
 * @param fpCondition
 * @param oProto
 * @param oType
 * @constructor
 */
function ConditionalTestCase( sTestName, fpCondition, oProto, oType )
{
  if ( fpCondition() )
  {
    TestCase( sTestName, oProto, oType );
  }
}
/**
 * A TestCase that will only be executed when browser is chrome.
 *
 * @param {string} The name of the TestCase.
 * @param {Object} opt_proto An optional prototype for the test case class.
 * @param {Object} opt_type Either DEFAULT_TYPE or ASYNC_TYPE.
 * @return {Function} Base function that represents the TestCase class.
 */
function ChromeTestCase( sTestName, oProto, oType )
{
  return ConditionalTestCase( sTestName, function ()
  {
    return /Chrome/.test( navigator.userAgent );
  }, oProto, oType );
}
/**
 * A TestCase that will only be executed when browser is chrome or firefox
 *
 * @param {string} The name of the TestCase.
 * @param {Object} opt_proto An optional prototype for the test case class.
 * @param {Object} opt_type Either DEFAULT_TYPE or ASYNC_TYPE.
 * @return {Function} Base function that represents the TestCase class.
 */
function ChromeFirefoxTestCase( sTestName, oProto, oType )
{
  return ConditionalTestCase( sTestName, function()
  {
    return /Chrome/.test(navigator.userAgent) || /Firefox/.test(navigator.userAgent);
  });
}
/**
 * A TestCase that will only be executed when browser is Internet Explorer.
 *
 * @param {string} The name of the TestCase.
 * @param {Object} opt_proto An optional prototype for the test case class.
 * @param {Object} opt_type Either DEFAULT_TYPE or ASYNC_TYPE.
 * @return {Function} Base function that represents the TestCase class.
 */
function InternetExplorerTestCase ( testCaseName, opt_proto, opt_type )
{
	return ConditionalTestCase ( testCaseName, function ()
	{
		return /MSIE/.test( navigator.userAgent );
	}, opt_proto, opt_type );
}
// Helper functions
/**
 * injectHTML is a function to add content to the body of the page.
 * @param sHTML
 */
function injectHTML( sHTML )
{
  var oDocFrag = document.createDocumentFragment(),
    oLayer = document.createElement( 'div' ),
    oNodeContent;

  oLayer.innerHTML = sHTML;
  while ( oLayer.firstChild )
  {
    oDocFrag.appendChild( oLayer.firstChild );
  }

  oNodeContent = oDocFrag.childNodes.length > 1 ? oDocFrag : oDocFrag.firstChild;

  document.body.appendChild( oNodeContent );
}
/**
 * _isUndefined check if the value passed as argument is undefined or not.
 * @param oValue
 * @returns {boolean}
 * @private
 */
function _isUndefined( oValue )
{
  var bResult = false;
  if ( typeof oValue === 'undefined' )
  {
    bResult = true;
  }
  return bResult;
}

// Assertions from JsTestDriver to use Jasmine expects.
// It's cool to learn how to work Jasmine

/**
 * Throws an error.
 * @param sMessage
 */
function fail( sMessage )
{
  throw new Error( sMessage );
}
/**
 * Check if oActual is true.
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assert( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( oActual ).toBeTruthy();
}
/**
 * Check if oActual is true.
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertTrue( sMessage, oActual )
{
  return assert( sMessage, oActual );
}
/**
 * Check if oActual is false.
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertFalse( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( oActual ).toBeFalsy();
}
/**
 * Check if oActual == oExpected
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertEquals( sMessage, oExpected, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oExpected;
    oExpected = sMessage;
  }
  return expect( oActual ).toEqual( oExpected );
}
/**
 * Check if oActual != oExpected
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNotEquals( sMessage, oExpected, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oExpected;
    oExpected = sMessage;
  }
  return expect( oActual ).not.toEqual( oExpected );
}
/**
 * Check if oActual is the same oExpected object
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertSame( sMessage, oExpected, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oExpected;
    oExpected = sMessage;
  }
  return expect( oActual ).toBe( oExpected );
}
/**
 * Check if oActual is not the same oExpected object
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNotSame( sMessage, oExpected, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oExpected;
    oExpected = sMessage;
  }
  return expect( oActual ).not.toBe( oExpected );
}
/**
 * Check if oActual is null
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNull( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( oActual ).toBeNull();
}
/**
 * Check if oActual is not null
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNotNull( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( oActual ).not.toBeNull();
}
/**
 * Check if oActual is undefined
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertUndefined( sMessage, oActual )
{
  if ( arguments.length === 1 )
  {
    oActual = sMessage;
  }
  return expect( oActual ).toBeUndefined();
}
/**
 * Check if oActual is not undefined
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNotUndefined( sMessage, oActual )
{
  if ( arguments.length === 1 )
  {
    oActual = sMessage;
  }
  return expect( oActual ).not.toBeUndefined();
}
/**
 * Check if oActual is NaN
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNaN( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( isNaN( oActual ) ).toBeTruthy();
}
/**
 * Check if oActual is not NaN
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNotNaN( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( isNaN( oActual ) ).toBeFalsy();
}
/**
 * Check that execute fpCallback throw an Exception
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertException( sMessage, fpCallback, oError )
{
  if ( typeof sMessage !== 'string' )
  {
    if ( _isUndefined( fpCallback ) )
    {
      return expect( sMessage ).toThrow();
    }
    else
    {
      fpCallback = typeof fpCallback === 'string' ? new Error( fpCallback ) : fpCallback;
      return expect( sMessage ).toThrow( fpCallback );
    }
  }
  else
  {
    oError = typeof oError === 'string' ? new Error( oError ) : oError;
    return expect( fpCallback ).toThrow( oError );
  }
}
/**
 * Check that execute fpCallback don't throw an Exception
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNoException( sMessage, fpCallback, oError )
{
  if ( typeof sMessage !== 'string' )
  {
    if ( _isUndefined( fpCallback ) )
    {
      return expect( sMessage ).not.toThrow();
    }
    else
    {
      fpCallback = typeof fpCallback === 'string' ? new Error( fpCallback ) : fpCallback;
      return expect( sMessage ).not.toThrow( fpCallback );
    }
  }
  else
  {
    oError = typeof oError === 'string' ? new Error( oError ) : oError;
    return expect( fpCallback ).not.toThrow( oError );
  }
}
/**
 * Check that oActual is an Array
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertArray( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return expect( typeof oActual === 'array' || oActual instanceof Array ).toBeTruthy();
}
/**
 * Check that oValue is a type of oExpected
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertTypeOf( sMessage, sExpected, oValue )
{
  if ( _isUndefined( oValue ) )
  {
    oValue = sExpected;
    sExpected = sMessage;
  }
  return expect( typeof oValue === sExpected ).toBeTruthy();
}
/**
 * Check that oActual is boolean type
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertBoolean( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return assertTypeOf( sMessage, 'boolean', oActual );
}
/**
 * Check that oActual is function type
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertFunction( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return assertTypeOf( sMessage, 'function', oActual );
}
/**
 * Check that oActual is object type
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertObject( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return assertTypeOf( sMessage, 'object', oActual );
}
/**
 * Check that oActual is number type
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNumber( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return assertTypeOf( sMessage, 'number', oActual );
}
/**
 * Check that oActual is string type
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertString( sMessage, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = sMessage;
  }
  return assertTypeOf( sMessage, 'string', oActual );
}
/**
 * Check that oActual matches oRegExp
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertMatch( sMessage, oRegExp, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oRegExp;
    oRegExp = sMessage;
  }
  return expect( oActual ).toMatch( oRegExp );
}
/**
 * Check that oActual don't matches oRegExp
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertNoMatch( sMessage, oRegExp, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oRegExp;
    oRegExp = sMessage;
  }
  return expect( oActual ).not.toMatch( oRegExp );
}
/**
 * Check that oElement is a node of sTagName
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertTagName( sMessage, sTagName, oElement )
{
  if ( _isUndefined( oElement ) )
  {
    oElement = sTagName;
    sTagName = sMessage;
  }
  return expect( oElement.nodeName.toLowerCase() === sTagName.toLowerCase() ).toBeTruthy();
}
/**
 * Check that oElement contains sClass in their className
 * @param sMessage
 * @param oActual
 * @returns {*}
 */
function assertClassName( sMessage, sClass, oElement )
{
  if ( _isUndefined( oElement ) )
  {
    oElement = sClass;
    sClass = sMessage;
  }
  return expect( oElement.className.split( " " ) ).toContain( sClass );
}
function assertElementId( sMessage, sId, oElement )
{
  if ( _isUndefined( oElement ) )
  {
    oElement = sId;
    sId = sMessage;
  }
  return expect( oElement.id ).toEqual( sId );
}
function assertInstanceOf( sMessage, oConstructor, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oConstructor;
    oConstructor = sMessage;
  }
  return expect( oActual instanceof oConstructor ).toBeTruthy();
}
function assertNotInstanceOf( sMessage, oConstructor, oActual )
{
  if ( _isUndefined( oActual ) )
  {
    oActual = oConstructor;
    oConstructor = sMessage;
  }
  return expect( oActual instanceof oConstructor ).toBeFalsy();
}