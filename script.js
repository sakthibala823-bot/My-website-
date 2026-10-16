
// CAREERGLOW JOB PORTAL

const filterButtons = document.querySelectorAll(".filter-btn");
const jobCards = document.querySelectorAll(".job-card");

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const jobGrid = document.getElementById("jobGrid");

let selectedCategory = "all";


// FILTER AND SEARCH JOBS

function filterJobs() {
    const keyword = searchInput.value.trim().toLowerCase();
    const location = locationInput.value.trim().toLowerCase();

    let visibleCount = 0;

    jobCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.dataset.title;
        const company = card.dataset.company;
        const jobLocation = card.dataset.location;
        const cardText = card.innerText.toLowerCase();

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        const keywordMatch =
            !keyword ||
            title.includes(keyword) ||
            company.includes(keyword) ||
            cardText.includes(keyword);

        const locationMatch =
            !location ||
            jobLocation.includes(location) ||
            cardText.includes(location);

        const show =
            categoryMatch && keywordMatch && locationMatch;

        card.style.display = show ? "" : "none";

        if (show) visibleCount++;
    });

    resultsCount.textContent =
        visibleCount + (visibleCount === 1
            ? " opportunity"
            : " opportunities");

    emptyState.hidden = visibleCount !== 0;
    jobGrid.hidden = visibleCount === 0;
}


// CATEGORY FILTERS

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        selectedCategory = button.dataset.filter;

        filterJobs();
    });
});


// SEARCH BUTTON AND ENTER KEY

searchBtn.addEventListener("click", () => {
    filterJobs();
    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
});

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        filterJobs();
    }
});

locationInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        filterJobs();
    }
});


// TOP FIND JOB BUTTON

document.getElementById("topSearch").addEventListener("click", () => {
    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });

    searchInput.focus();
});


// RESET SEARCH

document.getElementById("resetSearch").addEventListener("click", () => {
    searchInput.value = "";
    locationInput.value = "";
    selectedCategory = "all";

    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === "all"
        );
    });

    filterJobs();
});


// APPLICATION MODAL

const modal = document.getElementById("applyModal");
const applicationForm = document.getElementById("applicationForm");

let selectedJob = "";
let selectedCompany = "";

function openApplication(job, company) {
    selectedJob = job;
    selectedCompany = company;

    document.getElementById("modalTitle").textContent =
        "Apply for " + selectedJob;

    document.getElementById("selectedJob").textContent =
        "Company: " + selectedCompany +
        ". Fill in your details to submit your application.";

    applicationForm.reset();

    document.getElementById("formSection").hidden = false;
    document.getElementById("successMessage").hidden = true;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    document.getElementById("fullName").focus();
}


// OPEN FORM

document.querySelectorAll(".apply-btn").forEach(button => {
    button.addEventListener("click", () => {
        openApplication(
            button.dataset.job,
            button.dataset.company
        );
    });
});


// CLOSE MODAL

function closeApplication() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("closeModal").addEventListener(
    "click",
    closeApplication
);

document.getElementById("doneBtn").addEventListener(
    "click",
    closeApplication
);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeApplication();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeApplication();
    }
});


// SUBMIT APPLICATION

applicationForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(applicationForm);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const experience = formData.get("experience");
    const resume = document.getElementById("resume").files[0];

    if (!name || !email || !phone || !experience) {
        alert("Please complete all required fields.");
        return;
    }

    if (resume && resume.type !== "application/pdf") {
        alert("Please upload a PDF resume.");
        return;
    }

    document.getElementById("formSection").hidden = true;

    document.getElementById("confirmationDetails").textContent =
        "Thank you, " + name +
        "! Your demo application for " + selectedJob +
        " at " + selectedCompany +
        " has been submitted on this page. " +
        "Email: " + email +
        ". Experience: " + experience +
        ". No application was sent to the actual company.";

    document.getElementById("successMessage").hidden = false;
});


// INITIAL DISPLAY

filterJobs();
