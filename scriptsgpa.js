const container = document.getElementById("semester");
const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");


addBtn.addEventListener("click", () => {
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
    container.appendChild(subject);
});

removeBtn.addEventListener("click", () => {
    if (container.children.length > 1) {
        container.lastElementChild.remove();
    }
});
function calculateSGPA() {
    const semester = document.getElementById('semester');
    const subjects = semester.querySelectorAll('.subject');
    const gpa=document.getElementById('sgpa');
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(function (subject) {
        const grade = parseFloat(subject.querySelector('.grade').value);
        const credits = parseFloat(subject.querySelector('.crhr').value);
        if (credits < 1) {
        alert("Credit hours must be at least 1");
        return; 
        }

        if (!isNaN(grade)) {
            totalCredits += credits;
            totalPoints += grade * credits;
        }
    });

    let sgpa = "0.00";
    if (totalCredits > 0) {
        sgpa = (totalPoints / totalCredits).toFixed(2);
    }
    gpa.innerHTML="<h2>SGPA:"+sgpa+"</h2>";
    const gpacolor=gpa.querySelector('h2');
    if(sgpa>=3.50)
    {
        gpacolor.style.color="rgb(2, 255, 2)";
    }
    else if(sgpa>=3)
    {
        gpacolor.style.color="darkgreen";
    }
    else if(sgpa>=2)
    {
        gpacolor.style.color="yellow";
    }
    else if(sgpa<2)
    {
        gpacolor.style.color="red";
    }
}
const submit=document.getElementById('submission');
submit.addEventListener('click',calculateSGPA)
