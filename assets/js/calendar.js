function Get_Calendar() {
  // Schedule Calendar
  $("#calendar-static").datepicker({
    changeMonth: false,
    changeYear: false,
    inline: false,
    firstDay: 0,
    showOtherMonths: false,
    dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  });

  // Calendar Page
  function calendarInit() {
    $("#calendar2, #calendar3").datepicker({
      changeMonth: false,
      changeYear: false,
      inline: false,
      firstDay: 0,
      showOtherMonths: false,
      dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });
  }

  var my_calendar = $(".calendar .my-card");
  var team_calendar = $(".calendar .team-card");
  var my_calendar_body = $(".card-body", my_calendar);
  var team_calendar_body = $(".card-body", team_calendar);
  var my_calendar_wrapper = $('<div id="calendar2"></div>');
  var team_calendar_wrapper = $('<div id="calendar3"></div>');

  // Initiate Calendars
  $(my_calendar_body).append(my_calendar_wrapper);
  $(team_calendar_body).append(team_calendar_wrapper);
  calendarInit();

  // My Calendar Switcher
  $("#myCalendar").on("click", function () {
    if($(my_calendar).hasClass("week-view")) {
      $(my_calendar).removeClass("week-view").addClass("month-view");
      var month_Title = $(".ui-datepicker-month", my_calendar).html();
      $(".card-header .card-title", my_calendar).html(month_Title);
    }
    else {
      $(my_calendar).removeClass("month-view").addClass("week-view");
      $(".card-header .card-title", my_calendar).html("This Week");
    }
  });
  // Team Calendar Switcher
  $("#teamCalendar").on("click", function () {
    if($(team_calendar).hasClass("week-view")) {
      $(team_calendar).removeClass("week-view").addClass("month-view");
      var month_Title = $(".ui-datepicker-month", team_calendar).html();
      $(".card-header .card-title", team_calendar).html(month_Title);
    }
    else {
      $(team_calendar).removeClass("month-view").addClass("week-view");
      $(".card-header .card-title", team_calendar).html("This Week");
    }
  });

  // My Calendar Months Changer
  $(".card-header .next", my_calendar).on("click", function () {
    if ($(my_calendar).hasClass("month-view")) {
      $(".ui-datepicker-next", my_calendar).trigger("click");
      $(".card-header .card-title", my_calendar).html($(".ui-datepicker-month", my_calendar).html());
    }
  });
  $(".card-header .prev", my_calendar).on("click", function () {
    if ($(my_calendar).hasClass("month-view")) {
      $(".ui-datepicker-prev", my_calendar).trigger("click");
      $(".card-header .card-title", my_calendar).html($(".ui-datepicker-month", my_calendar).html());
    }
  });

  // Team Calendar Months Changer
  $(".card-header .next", team_calendar).on("click", function () {
    if ($(team_calendar).hasClass("month-view")) {
      $(".ui-datepicker-next", team_calendar).trigger("click");
      $(".card-header .card-title", team_calendar).html($(".ui-datepicker-month", team_calendar).html());
    }
  });
  $(".card-header .prev", team_calendar).on("click", function () {
    if ($(team_calendar).hasClass("month-view")) {
      $(".ui-datepicker-prev", team_calendar).trigger("click");
      $(".card-header .card-title", team_calendar).html($(".ui-datepicker-month", team_calendar).html());
    }
  });
}