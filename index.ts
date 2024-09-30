// Function to add a new education section
function addEducationSection() {
    // Get the area where all education sections are stored
    const educationSections = document.getElementById('education-sections');
    const firstEducation = document.querySelector('.education') as HTMLElement;
    const newEducation = firstEducation.cloneNode(true) as HTMLElement;
  
    // Clear the input fields in the new education section
    const inputs = newEducation.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  
    // Add the new section to the list of education sections
    educationSections?.appendChild(newEducation);
  }
  
  // Function to add a new experience section
  function addExperienceSection() {
    // Get the area where all experience sections are stored
    const experienceSections = document.getElementById('experience-sections');
  
    // Find the first experience section and copy (clone) it
    const firstExperience = document.querySelector('.experience') as HTMLElement;
    const newExperience = firstExperience.cloneNode(true) as HTMLElement;
  
    // Clear the input fields in the new experience section
    const inputs = newExperience.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  
    // Add the new section to the list of experience sections
    experienceSections?.appendChild(newExperience);
  }
  
  // Add click events to the buttons to trigger the functions when clicked
  document.getElementById('add-more-education')?.addEventListener('click', addEducationSection);
  document.getElementById('add-more-experience')?.addEventListener('click', addExperienceSection);
  

// Function to add new skills in the skills section by clicking on + button
function addTextInput(event: Event) {
  event.preventDefault(); // Prevent form submission or page refresh
  
  const container = document.getElementById('inputBox');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'skills-input'; // Applying the same class as the existing inputs
  
  const lineBreak = document.createElement('br');
  container?.appendChild(input);
  container?.appendChild(lineBreak);
}
// Function to generate the resume when the form is submitted
function generateResume(event:any) {
  event.preventDefault(); // Prevent the default form submission

const generatedResume = document.getElementById('generated-resume') as HTMLFormElement;
  // Get the values from the personal information section
  const fullName = (document.getElementById('full-name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const address = (document.getElementById('address-text') as HTMLInputElement).value;
  // Display the personal information in the generated resume
  (document.getElementById('fullName') as HTMLElement).textContent = fullName;
  (document.getElementById('email-address') as HTMLElement).textContent = email;
  (document.getElementById('phone-no') as HTMLElement).textContent = phone;
  (document.getElementById('address') as HTMLElement).textContent = address;
  

  // Get the education fields and populate the education section
  const educationSections = document.querySelectorAll('.education');
  const educationData = document.getElementById('education-data') as HTMLElement;
  educationData.innerHTML = '<h2>Education:</h2>'; // Clear the previous data and set the heading

  educationSections.forEach(section => {
    const degree = (section.querySelector('.degree') as HTMLInputElement).value;
    const institute = (section.querySelector('.institute') as HTMLInputElement).value;
    const year = (section.querySelector('.year') as HTMLInputElement).value;
    const grade = (section.querySelector('.grade') as HTMLInputElement).value;

    educationData.innerHTML += `
      <p><strong>Degree:</strong> ${degree}</p>
      <p><strong>Institute:</strong> ${institute}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Grade:</strong> ${grade}</p>
      <hr />
    `;
    
  });

  // Get the experience fields and populate the experience section
  const experienceSections = document.querySelectorAll('.experience');
  const experienceData = document.getElementById('experience-data') as HTMLElement;
  experienceData.innerHTML = '<h2>Work Experience:</h2>'; // Clear the previous data and set the heading

  experienceSections.forEach(section => {
    const company = (section.querySelector('.company') as HTMLInputElement).value;
    const position = (section.querySelector('.position') as HTMLInputElement).value;
    const duration = (section.querySelector('.duration') as HTMLInputElement).value;
    const responsibilities = (section.querySelector('.responsibilities') as HTMLInputElement).value;

    experienceData.innerHTML += `
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Position:</strong> ${position}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Responsibilities:</strong> ${responsibilities}</p>
      <hr />
    `;
  });

  // Get the skills fields and populate the skills section
  const skillInputs = document.querySelectorAll('.skills-input');
  const skillsData = document.getElementById('skills-list') as HTMLElement;
  skillsData.innerHTML = ''; // Clear the previous data

  skillInputs.forEach(input => {
    const skill = (input as HTMLInputElement).value;
    if (skill) {
      skillsData.innerHTML += `<span>${skill}</span>`;
    }
  });

  // Show the generated resume section
  document.getElementById('generated-resume')?.classList.remove('hidden');
}

// Add an event listener to the form's submit button to generate the resume
document.getElementById('submit')?.addEventListener('click', generateResume);

// Optional: Edit resume functionality to hide the resume and show the form again
document.getElementById('edit-resume')?.addEventListener('click', function () {
  document.getElementById('generated-resume')?.classList.add('hidden');
  window.scrollTo(0, 0); // Scroll to the top of the page
});

// Function to load and display profile photo in the resume section
function handleProfilePhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const resumePhoto = document.getElementById('profile-photo') as HTMLImageElement;

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      if (e.target) {
        resumePhoto.src = e.target.result as string; // Set the uploaded image source
      }
    };

    reader.readAsDataURL(input.files[0]); // Read the image file as Data URL
  }
}

// Add event listener to the image input field to handle photo upload
document.getElementById('image')?.addEventListener('change', handleProfilePhotoUpload);



// Declare html2pdf to avoid type errors in TypeScript
declare const html2pdf: any;
//function to download the resume as PDF file
function downloadResumeAsPDF(){
  const resumeContent = document.getElementById('resume-content');

  if (resumeContent) {
    // Use html2pdf to generate the PDF
    html2pdf(resumeContent, {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
    });
  } else {
    console.error('Resume content not found!');
  }
}

//add event listener to download pdf button
document.getElementById('download-pdf')?.addEventListener('click',(event) => {
  event.preventDefault();
  downloadResumeAsPDF();
} );