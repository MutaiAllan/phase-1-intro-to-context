function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map((employeeData) =>
      createEmployeeRecord(employeeData)
    );
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(time),
      date: date,
    });
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(time),
      date: date,
    });
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvents = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvents = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
  
    const timeIn = timeInEvents.hour;
    const timeOut = timeOutEvents.hour;
  
    const hoursWorked = (timeOut - timeIn) / 100;
  
    return hoursWorked;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
      (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
      0
    );
  
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce(
      (total, employeeRecord) => total + allWagesFor(employeeRecord),
      0
    );
    return totalPayroll;
  }