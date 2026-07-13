export default function calculateStreaks(dateList: Date[]): {
    currentStreak: number;
    longestStreak: number;
} {
    if (!dateList.length) return { currentStreak: 0, longestStreak: 0 };

    // 1. Normalize dates to local midnight and remove duplicates
    const uniqueDates = Array.from(
        new Set(
            dateList.map((date) =>
                new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                ).getTime(),
            ),
        ),
    ).map((ts) => new Date(ts));

    // 2. Sort chronologically (oldest to newest)
    uniqueDates.sort((a, b) => a.getTime() - b.getTime());

    let currentStreak = 0;
    let longestStreak = 0;

    if (uniqueDates.length > 0) {
        currentStreak = 1;
        longestStreak = 1;
    }

    // 3. Calculate streak lengths
    for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = uniqueDates[i - 1];
        const currDate = uniqueDates[i];

        // Difference in milliseconds divided by milliseconds in a day (86,400,000)
        const diffTime = currDate.getTime() - prevDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentStreak++;
        } else if (diffDays > 1) {
            currentStreak = 1; // Reset if the gap is more than one day
        }

        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }
    }

    // 4. Check if the current streak is still active today
    const today = new Date();
    const normalizedToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
    );
    const lastDate = uniqueDates[uniqueDates.length - 1];

    const diffFromToday = Math.round(
        (normalizedToday.getTime() - lastDate.getTime()) /
            (1000 * 60 * 60 * 24),
    );

    // If last activity wasn't today or yesterday, streak is dead
    if (diffFromToday > 1) {
        currentStreak = 0;
    }

    return { currentStreak, longestStreak };
}
