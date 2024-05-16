document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        grade: document.getElementById('grade').value,
        contactInfo: document.getElementById('contactInfo').value,
        classes: document.getElementById('classes').value
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));

    alert('Student data saved!');
    document.getElementById('studentForm').reset();
});

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    const results = students.filter(student => student.name.toLowerCase() === searchName);
    const resultsContainer = document.getElementById('results');
    
    resultsContainer.innerHTML = '';
    
    if (results.length > 0) {
        results.forEach(student => {
            resultsContainer.innerHTML += `
                <div class="student-result">
                    <p><strong>Name:</strong> ${student.name}</p>
                    <p><strong>Age:</strong> ${student.age}</p>
                    <p><strong>Grade:</strong> ${student.grade}</p>
                    <p><strong>Contact Info:</strong> ${student.contactInfo}</p>
                    <p><strong>Classes:</strong> ${student.classes}</p>
                </div>
                <hr>
            `;
        });
    } else {
        resultsContainer.innerHTML = '<p>No student found with that name.</p>';
    }
});
