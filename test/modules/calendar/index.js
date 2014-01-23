(function (){
  'use strict';
  Hydra.setTestFramework( true );

  describe('Calendar module', function (){

    it('should check that calendar module has been registered', function () {
      expect( function () {
        Hydra.module.test('calendar');
      }).not.toThrow();
    });

    it('should check that startCalendar is a method of calendar module', function () {
      var oModule = Hydra.module.test('calendar');
      expect( Object.prototype.toString.call( oModule.startCalendar ) === '[object Function]' ).toBeTruthy();
    });

    it('should check that setBehaviour is a method of calendar module', function () {
      var oModule = Hydra.module.test('calendar');
      expect( Object.prototype.toString.call( oModule.setBehaviour ) === '[object Function]' ).toBeTruthy();
    });

    it('should check that init is a method of calendar module', function () {
      var oModule = Hydra.module.test('calendar');
      expect( Object.prototype.toString.call( oModule.init ) === '[object Function]' ).toBeTruthy();
    });
  });

  describe('Calendar module startCalendar', function () {

    var Calendar = function (){},
      oStubSetContainer,
      oStubSetLocale,
      oStubSetDate,
      oStubInsertIntoDOM,
      oStubGetElementById,
      oModule;

    beforeEach( function () {
      oStubSetContainer = sinon.stub();
      oStubSetLocale = sinon.stub();
      oStubSetDate = sinon.stub();
      oStubInsertIntoDOM = sinon.stub();
      oStubGetElementById = sinon.stub();
      Calendar.prototype = {
        setContainer: function () {
          oStubSetContainer.apply(null, arguments);
          return this;
        },
        setLocale: function () {
          oStubSetLocale.apply(null, arguments);
          return this;
        },
        setDate: function () {
          oStubSetDate.apply(null, arguments);
          return this;
        },
        insertIntoDOM: function () {
          oStubInsertIntoDOM.apply(null, arguments);
          return this;
        }
      };
      oModule = Hydra.module.test('calendar', { 'Date': sinon.stub(), 'App.Calendar': Calendar, 'App.CalendarLocale_ES': function(){}, 'doc': {
        getElementById: oStubGetElementById
      }});
    });

    it('should check that calendar stores the instance of Calendar to use it later', function () {
      expect( oModule.oCalendar ).not.toBeUndefined();
      oModule.startCalendar();
      expect( oModule.oCalendar ).not.toBeNull();
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setContainer', function () {
      oModule.startCalendar();
      expect( oStubSetContainer.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setLocale', function () {
      oModule.startCalendar();
      expect( oStubSetLocale.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setDate', function () {
      oModule.startCalendar();
      expect( oStubSetDate.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call insertIntoDOM', function () {
      oModule.startCalendar();
      expect( oStubInsertIntoDOM.callCount ).toEqual( 1 );
    });

    it('should check that setLocale gets a new instance of CalendarLocale_ES', function () {
      oModule.startCalendar();
      expect( oStubSetLocale.getCall(0).args[0] instanceof oModule.mocks['App.CalendarLocale_ES']).toBeTruthy();
    });

    it('should check that setContainer gets an element from document.getElementById', function () {
      oModule.startCalendar();
      expect( oModule.mocks.doc.getElementById.getCall(0).args[0] ).toEqual( "calendarContainer" );
    });

    it('should check that setDate gets an instance of Date', function () {
      oModule.startCalendar();
      expect( oModule.mocks.Date.calledWithNew() ).toBeTruthy();
    });
  });
}());