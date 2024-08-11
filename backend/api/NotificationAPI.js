const DB = require('../database');
const qs = require('qs');
const sanitize = require('sanitize-html');

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('ko-KR', options);
}

function NotificationAPI(request, response) {

    let body = "";

    request.on("data", data => {
        body += data;
    });

    request.on("end", () => {

        let getInfo = qs.parse(body);

        let getUserID = sanitize(getInfo.user_id);

        const query = `
            SELECT b.ClubName, r.StartDate, r.EndDate
            FROM Bookclub b
            LEFT JOIN BookclubMembers m ON b.ClubID = m.ClubID
            LEFT JOIN ReadingSchedule r ON b.ClubID = r.ClubID
            WHERE m.UserID = ?
        `;

        DB.query(query, [getUserID], (error, results) => {

            if (error) {
                console.error('Database query error:', error);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ success: false, message: 'Database error' }));
                return;
            }

            const clubMap = new Map();

            results.forEach(row => {
                const clubName = row.ClubName;
                const startDate = row.StartDate ? formatDate(row.StartDate) : null;
                const endDate = row.EndDate ? formatDate(row.EndDate) : null;

                if (!clubMap.has(clubName)) {
                    clubMap.set(clubName, {
                        clubName: clubName,
                        schedules: []
                    });
                }

                if (startDate && endDate) {
                    clubMap.get(clubName).schedules.push({
                        startDate: startDate,
                        endDate: endDate
                    });
                }
            });

            const bookclubs = Array.from(clubMap.values());

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true, bookclubs }));
        });
    });
}

module.exports = NotificationAPI;
