(function (){
  'use strict';
  Hydra.setTestFramework( true );

  describe('Calendar module startCalendar', function () {

    var oModule;

    beforeEach( function () {
      oModule = Hydra.module.test('calendar');
      oModule.mocks['App.Calendar'].prototype.setContainer.returns(oModule.mocks['App.Calendar'].prototype);
      oModule.mocks['App.Calendar'].prototype.setLocale.returns(oModule.mocks['App.Calendar'].prototype);
      oModule.mocks['App.Calendar'].prototype.setDate.returns(oModule.mocks['App.Calendar'].prototype);
    });

    it('should check that calendar stores the instance of Calendar to use it later', function () {
      expect( oModule.oCalendar ).not.toBeUndefined();
      oModule.startCalendar();
      expect( oModule.oCalendar ).not.toBeNull();
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setContainer', function () {
      oModule.startCalendar();
      expect( oModule.mocks['App.Calendar'].prototype.setContainer.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setLocale', function () {
      oModule.startCalendar();
      expect( oModule.mocks['App.Calendar'].prototype.setLocale.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call setDate', function () {
      oModule.startCalendar();
      expect( oModule.mocks['App.Calendar'].prototype.setDate.callCount ).toEqual( 1 );
    });

    it('should check that startCalendar setup the instance of Calendar properly: call insertIntoDOM', function () {
      oModule.startCalendar();
      expect( oModule.mocks['App.Calendar'].prototype.insertIntoDOM.callCount ).toEqual( 1 );
    });

    it('should check that setLocale gets a new instance of CalendarLocale_ES', function () {
      oModule.startCalendar();
      expect( oModule.mocks['App.Calendar'].prototype.setLocale.getCall(0).args[0] instanceof oModule.mocks['App.CalendarLocale_ES']).toBeTruthy();
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