export default class TimeService {
    locales = {
        prefix: '',
        sufix: 'ago',

        seconds: 'less than a minute',
        minute: 'a minute',
        minutes: '%d minutes',
        hour: 'about an hour',
        hours: '%d hours',
        day: 'a day',
        days: '%d days',
        month: 'a month',
        months: '%d months',
        year: 'a year',
        years: '%d years'
    };

    getRelativeTime(timeAgo) {
        var seconds = Math.floor(Date.now() / 1000 - timeAgo),
            separator = this.locales.separator || ' ',
            words = this.locales.prefix + separator,
            interval = 0,
            intervals = {
                year: seconds / 31536000,
                month: seconds / 2592000,
                day: seconds / 86400,
                hour: seconds / 3600,
                minute: seconds / 60
            };

        var distance = this.locales.seconds;

        for (var key in intervals) {
            interval = Math.floor(intervals[key]);

            if (interval > 1) {
                distance = this.locales[key + 's'];
                break;
            } else if (interval === 1) {
                distance = this.locales[key];
                break;
            }
        }

        distance = distance.replace(/%d/i, interval);
        words += distance + separator + this.locales.sufix;

        return words.trim();
    };

    beforeCurrentTime(date) {
        return date < Date.now();
    };
}
