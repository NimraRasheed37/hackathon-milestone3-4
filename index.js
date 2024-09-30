var _a, _b, _c, _d, _e, _f;
// Function to add a new education section
function addEducationSection() {
    // Get the area where all education sections are stored
    var educationSections = document.getElementById('education-sections');
    // Find the first education section and copy (clone) it
    var firstEducation = document.querySelector('.education');
    var newEducation = firstEducation.cloneNode(true);
    // Clear the input fields in the new education section
    var inputs = newEducation.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    });
    // Add the new section to the list of education sections
    educationSections === null || educationSections === void 0 ? void 0 : educationSections.appendChild(newEducation);
}
// Function to add a new experience section
function addExperienceSection() {
    // Get the area where all experience sections are stored
    var experienceSections = document.getElementById('experience-sections');
    // Find the first experience section and copy (clone) it
    var firstExperience = document.querySelector('.experience');
    var newExperience = firstExperience.cloneNode(true);
    // Clear the input fields in the new experience section
    var inputs = newExperience.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    });
    // Add the new section to the list of experience sections
    experienceSections === null || experienceSections === void 0 ? void 0 : experienceSections.appendChild(newExperience);
}
// Add click events to the buttons to trigger the functions when clicked
(_a = document.getElementById('add-more-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationSection);
(_b = document.getElementById('add-more-experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addExperienceSection);
// Function to add new skills in the skills section by clicking on + button
function addTextInput(event) {
    event.preventDefault(); // Prevent form submission or page refresh
    var container = document.getElementById('inputBox');
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'skills-input'; // Applying the same class as the existing inputs
    var lineBreak = document.createElement('br');
    container === null || container === void 0 ? void 0 : container.appendChild(input);
    container === null || container === void 0 ? void 0 : container.appendChild(lineBreak);
}
// Function to generate the resume when the form is submitted
function generateResume(event) {
    var _a;
    event.preventDefault(); // Prevent the default form submission
    var generatedResume = document.getElementById('generated-resume');
    // Get the values from the personal information section
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address-text').value;
    // Display the personal information in the generated resume
    document.getElementById('fullName').textContent = fullName;
    document.getElementById('email-address').textContent = email;
    document.getElementById('phone-no').textContent = phone;
    document.getElementById('address').textContent = address;
    // Get the education fields and populate the education section
    var educationSections = document.querySelectorAll('.education');
    var educationData = document.getElementById('education-data');
    educationData.innerHTML = '<h2>Education:</h2>'; // Clear the previous data and set the heading
    educationSections.forEach(function (section) {
        var degree = section.querySelector('.degree').value;
        var institute = section.querySelector('.institute').value;
        var year = section.querySelector('.year').value;
        var grade = section.querySelector('.grade').value;
        educationData.innerHTML += "\n      <p><strong>Degree:</strong> ".concat(degree, "</p>\n      <p><strong>Institute:</strong> ").concat(institute, "</p>\n      <p><strong>Year:</strong> ").concat(year, "</p>\n      <p><strong>Grade:</strong> ").concat(grade, "</p>\n      <hr />\n    ");
    });
    // Get the experience fields and populate the experience section
    var experienceSections = document.querySelectorAll('.experience');
    var experienceData = document.getElementById('experience-data');
    experienceData.innerHTML = '<h2>Work Experience:</h2>'; // Clear the previous data and set the heading
    experienceSections.forEach(function (section) {
        var company = section.querySelector('.company').value;
        var position = section.querySelector('.position').value;
        var duration = section.querySelector('.duration').value;
        var responsibilities = section.querySelector('.responsibilities').value;
        experienceData.innerHTML += "\n      <p><strong>Company:</strong> ".concat(company, "</p>\n      <p><strong>Position:</strong> ").concat(position, "</p>\n      <p><strong>Duration:</strong> ").concat(duration, "</p>\n      <p><strong>Responsibilities:</strong> ").concat(responsibilities, "</p>\n      <hr />\n    ");
    });
    // Get the skills fields and populate the skills section
    var skillInputs = document.querySelectorAll('.skills-input');
    var skillsData = document.getElementById('skills-list');
    skillsData.innerHTML = ''; // Clear the previous data
    skillInputs.forEach(function (input) {
        var skill = input.value;
        if (skill) {
            skillsData.innerHTML += "<span>".concat(skill, "</span>");
        }
    });
    // Show the generated resume section
    (_a = document.getElementById('generated-resume')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
}
// Add an event listener to the form's submit button to generate the resume
(_c = document.getElementById('submit')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', generateResume);
// Optional: Edit resume functionality to hide the resume and show the form again
(_d = document.getElementById('edit-resume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    var _a;
    (_a = document.getElementById('generated-resume')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    window.scrollTo(0, 0); // Scroll to the top of the page
});
// Function to load and display profile photo in the resume section
function handleProfilePhotoUpload(event) {
    var input = event.target;
    var resumePhoto = document.getElementById('profile-photo');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target) {
                resumePhoto.src = e.target.result; // Set the uploaded image source
            }
        };
        reader.readAsDataURL(input.files[0]); // Read the image file as Data URL
    }
}
// Add event listener to the image input field to handle photo upload
(_e = document.getElementById('image')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', handleProfilePhotoUpload);
//function to download the resume as PDF file
function downloadResumeAsPDF() {
    var resumeContent = document.getElementById('resume-content');
    if (resumeContent) {
        // Use html2pdf to generate the PDF
        html2pdf(resumeContent, {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
        });
    }
    else {
        console.error('Resume content not found!');
    }
}
//add event listener to download pdf button
(_f = document.getElementById('download-pdf')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function (event) {
    event.preventDefault();
    downloadResumeAsPDF();
});
