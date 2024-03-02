from datetime import datetime

from dateutil.relativedelta import relativedelta


def date_diff_translated(start_date, end_date):
    if not isinstance(start_date, datetime) or not isinstance(end_date, datetime):
        raise ValueError("Args is not type datetime")

    date_diff = relativedelta(end_date, start_date)

    parts = []

    if date_diff.months > 0:
        parts.append(f"{date_diff.months}m")
    if date_diff.days > 0:
        parts.append(f"{date_diff.days}d")
    if date_diff.hours > 0:
        parts.append(f"{date_diff.hours}h")
    if date_diff.minutes > 0:
        parts.append(f"{date_diff.minutes}m")

    return ", ".join(parts)
