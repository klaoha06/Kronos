define(['react', 'jquery', 'moment', 'fullcalendar', 'stores/CalendarStore'], function(React, $, moment, fullCalendar, CalendarStore) {
  var Main = React.createClass({
    getInitialState: function () {
      return {};
    },
    componentDidMount: function() {
      CalendarStore.addChangeListener(this._onChange);
      // FullCalendar
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        droppable: true,
        drop: function() {
          // is the "remove after drop" checkbox checked?
           if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
           }
         },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
          var title = prompt('Event Title:');
          var eventData;
          if (title) {
            eventData = {
              title: title,
              start: start,
              end: end
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
          }
          $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: CalendarStore.getCurrentCal()
      });
    },
    _onChange: function() {
      // console.log(this.state);
      // $('#calendar').fullCalendar({events: this.state.events} );
      // $('#calendar').fullCalendar( 'rerenderEvents' );
      // $('#calendar').fullCalendar( 'refetchEvents' );
      $('#calendar').fullCalendar( 'destroy' );
      // FullCalendar
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        droppable: true,
        drop: function() {
          // is the "remove after drop" checkbox checked?
           if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
           }
         },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
          var title = prompt('Event Title:');
          var eventData;
          if (title) {
            eventData = {
              title: title,
              start: start,
              end: end
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
          }
          $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: CalendarStore.getCurrentCal()
      });
      this.setState(CalendarStore.getCurrentCal());
    },
    componentWillUnmount: function() {
      CalendarStore.removeChangeListener(this._onChange);
    },
    render: function() {
      return (
          <div id='main-calendar'>
            <h2 id='main-cal-title'>{typeof this.state.cal !== 'undefined' ? this.state.cal.name : ''}</h2>
            <div id='calendar'></div>
          </div>
        );  
      }
  });

  return Main;
});
