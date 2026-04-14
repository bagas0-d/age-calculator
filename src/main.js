const form = document.getElementById("form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const displayDay = document.getElementById("display-day");
const displayMonth = document.getElementById("display-month");
const displayYear = document.getElementById("display-year");

const date = {
    currentDay: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear()
}

function check(dd,mm,yyyy) {
    dd = parseInt(dd);
    mm = parseInt(mm);
    yyyy = parseInt(yyyy);

    if (!dd || dd < 1) return false;
    if (!mm || mm < 1 || mm > 12) return false;
    if (!yyyy || yyyy < 1) return false;

    const daysInMonth = new Date(yyyy, mm, 0).getDate();
    if (dd > daysInMonth) return false;

    return true;
}

function getAge(dd, mm, yyyy) {
    dd = parseInt(dd);
    mm = parseInt(mm);
    yyyy = parseInt(yyyy);

    let d = date.currentDay;
    let m = date.currentMonth;
    let y = date.currentYear;

    // kalau hari sekarang < hari lahir → pinjam hari dari bulan sebelumnya
    if (d < dd) {
        m -= 1;

        // ambil jumlah hari di bulan sebelumnya
        const daysInPrevMonth = new Date(y, m, 0).getDate();
        d += daysInPrevMonth;
    }

    // kalau bulan sekarang < bulan lahir → pinjam tahun
    if (m < mm) {
        y -= 1;
        m += 12;
    }

    const dayD = d - dd;
    const monthD = m - mm;
    const yearD = y - yyyy;

    return { dayD, monthD, yearD };
}

function display(dd,mm,yyyy) {
    displayDay.textContent = `${dd}`;
    displayMonth.textContent = `${mm}`;
    displayYear.textContent = `${yyyy}`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    const resultCheck = check(day,month,year);
    
    let resultAge;
    if (resultCheck) {
        resultAge = getAge(day,month,year);
        const {dayD,monthD,yearD} = resultAge;

        dayInput.value = "";
        monthInput.value = "";
        yearInput.value = "";

        if(yearD < 1) return;

        display(dayD,monthD,yearD);
    }

    
})

