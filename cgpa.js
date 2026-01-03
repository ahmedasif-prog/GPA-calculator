const allSems = document.querySelector(".allsems");
const semAddBtn = document.getElementById("semadd");
const semRemoveBtn = document.getElementById("semremove");

/* ---------- SUBJECT ADD / REMOVE ---------- */
allSems.addEventListener("click", (e) => {
    const oneCompSem = e.target.closest(".onecompsem");
    if (!oneCompSem) return;

    const semester = oneCompSem.querySelector(".semester");

    // ADD SUBJECT
    if (e.target.classList.contains("subadd") && !e.target.id) {
        const subject = document.createElement("div");
        subject.className = "subject";
        subject.innerHTML = `
            <input class="sub-name" placeholder="Subject Name" type="text">
            <input class="crhr" placeholder="Credit Hours" type="number" min="1" value="1">
            <select class="grade">
                <option value="">Grade</option>
                <option value="4.00">A+</option>
                <option value="4.00">A</option>
                <option value="3.67">A-</option>
                <option value="3.33">B+</option>
                <option value="3.00">B</option>
                <option value="2.67">B-</option>
                <option value="2.33">C+</option>
                <option value="2.00">C</option>
                <option value="1.67">C-</option>
                <option value="1.33">D+</option>
                <option value="1.00">D</option>
                <option value="0.00">F</option>
            </select>
        `;
        semester.appendChild(subject);
    }

    // REMOVE SUBJECT
    if (e.target.classList.contains("subremove") && !e.target.id) {
        const subjects = semester.querySelectorAll(".subject");
        if (subjects.length > 1) {
            subjects[subjects.length - 1].remove();
        }
    }
});

/* ---------- ADD SEMESTER ---------- */
semAddBtn.addEventListener("click", () => {
    allSems.insertAdjacentHTML("beforeend", `
    <div class="onecompsem">
        <div class="whole">
            <div class="semester">
                <h2 class="heading">Semester</h2>
                <div class="subject">
                    <input class="sub-name" placeholder="Subject Name" type="text">
                    <input class="crhr" placeholder="credit hours" type="number" min="1" value="1">
                    <select class="grade">
                        <option value="">Grade</option>
                        <option value="4.00">A+</option>
                        <option value="4.00">A</option>
                        <option value="3.67">A-</option>
                        <option value="3.33">B+</option>
                        <option value="3.00">B</option>
                        <option value="2.67">B-</option>
                        <option value="2.33">C+</option>
                        <option value="2.00">C</option>
                        <option value="1.67">C-</option>
                        <option value="1.33">D+</option>
                        <option value="1.00">D</option>
                        <option value="0.00">F</option>
                    </select>
                </div>
            </div>
            <div class="buttons">
                <div class="subadd">+</div>
                <div class="subremove">x</div>
                <div class="sgpa">SGPA:0.00</div>
            </div>
        </div>
    </div>
    `);
});

/* ---------- REMOVE SEMESTER ---------- */
semRemoveBtn.addEventListener("click", () => {
    const semesters = allSems.querySelectorAll(".onecompsem");
    if (semesters.length > 1) {
        semesters[semesters.length - 1].remove();
    }
});
function calcsgpa(semester) {
    const subjects = semester.querySelectorAll('.subject');
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(function(subject) {
        const grade = parseFloat(subject.querySelector('.grade').value);
        const credits = parseFloat(subject.querySelector('.crhr').value);

        if (credits < 1) {
            alert("Credit hours must be at least 1");
            return;
        }

        if (!isNaN(grade)) {
            totalCredits = totalCredits + credits;
            totalPoints = totalPoints + (grade * credits);
        }
    });

    let sgpa = "0.00";
    if (totalCredits > 0) {
        sgpa = (totalPoints / totalCredits).toFixed(2);
    }

    const sgpaDiv = semester.querySelector('.sgpa');
    sgpaDiv.textContent = "SGPA: " + sgpa;

    return { points: totalPoints, credits: totalCredits };
}

function calccgpa() {
    const semesters = document.querySelectorAll('.onecompsem');
    let totalCredits = 0;
    let totalPoints = 0;

    semesters.forEach(function(semester) {
        const result = calcsgpa(semester);
        totalCredits = totalCredits + result.credits;
        totalPoints = totalPoints + result.points;
    });

    let cgpa = "0.00";
    if (totalCredits > 0) {
        cgpa = (totalPoints / totalCredits).toFixed(2);
    }

    const cgpaDiv = document.getElementById('cgpa');
    cgpaDiv.innerHTML = "<h2>CGPA: " + cgpa + "</h2>";

    const h2 = cgpaDiv.querySelector('h2');

    if (cgpa >= 3.5) {
        h2.style.color = "rgb(2, 255, 2)";
    }
    else if (cgpa >= 3) {
        h2.style.color = "darkgreen";
    }
    else if (cgpa >= 2) {
        h2.style.color = "yellow";
    }
    else if (cgpa < 2) {
        h2.style.color = "red";
    }
}

document.getElementById('submission').addEventListener('click', function() {
    calccgpa();
});
