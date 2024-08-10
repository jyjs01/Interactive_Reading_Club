const DB = require('../database');

function ReadingScheduleAPI(UserID, Start, End, ClubID) {

    let ScheduleID = 0;

    // ScheduleID 갱신

    DB.query('SELECT COUNT(*) AS count FROM ReadingSchedule', (error, results) => {
        if (error) {
            console.log(error);
            return;
        }

        ScheduleID = results[0].count + 1;


        // ReadingSchedule 생성

        DB.query('INSERT INTO ReadingSchedule (ScheduleID, StartDate, EndDate, ClubID) VALUES (?, ?, ?, ?)'
            , [ScheduleID, Start, End, ClubID], (error, results_create)=>{
            if (error) {
                console.log(error);
                return;
            }
        })
    });
}

module.exports = ReadingScheduleAPI;