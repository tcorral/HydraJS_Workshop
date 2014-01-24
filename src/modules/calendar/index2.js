(function () {
  'use strict';
  Hydra.module.register('calendar', ['App.Calendar', 'App.CalendarLocale_ES', '$doc', 'Date'], function ( Calendar, CalendarLocale_ES, doc, Date ) {
    return {
      oCalendar: null,
      startCalendar: function () {
        this.oCalendar = new Calendar();

        this.oCalendar.setContainer( doc.getElementById( "calendarContainer" ))
                      .setLocale( new CalendarLocale_ES() )
                      .setDate( new Date() )
                      .insertIntoDOM();
      },
      setBehaviour: function () {

      },
      init: function () {

      }
    };
  });
}());