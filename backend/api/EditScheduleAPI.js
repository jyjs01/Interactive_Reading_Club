const DB = require('../database');

function EditScheduleAPI(Start, End, ClubID) {

    // ReadingSchedule 수정

    DB.query('UPDATE ReadingSchedule SET StartDate = ?, EndDate = ? WHERE ClubID = ?'
        , [Start, End, ClubID], (error, results_create)=>{
        if (error) {
            console.log(error);
            return;
        }
    });
}

module.exports = EditScheduleAPI;