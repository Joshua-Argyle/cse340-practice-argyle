import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    

    // Handle sorting if requested
    const sortBy = req.query.sort || 'name';
    const sortedFaculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Department Faculty',
        faculty: sortedFaculty,
        currentSort: sortBy,
    });
};

const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);


    // If faculty doesn't exist, create 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        name: `${facultyMember.name}`,
        title: `${facultyMember.title}`,
        faculty: { ...facultyMember },
        office: `${facultyMember.office}`,
        phone: `${facultyMember.phone}`,
        email: `${facultyMember.email}`,
        department: `${facultyMember.department}`,
        title: `${facultyMember.title}`
    });
};

 export { facultyListPage, facultyDetailPage };